const express = require('express');
const Database = require('better-sqlite3');

const app = express();
const db = new Database('biblioteca.db');
db.pragma('foreign_keys = ON');

// 1. Crear las tablas si no existen
db.exec(`
CREATE TABLE IF NOT EXISTS usuario (
id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
nombre TEXT NOT NULL,
curso  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS prestamo (
id_prestamo INTEGER PRIMARY KEY AUTOINCREMENT,
id_usuario  INTEGER NOT NULL,
fecha_hora  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE IF NOT EXISTS detalle_prestamo (
id_detalle       INTEGER PRIMARY KEY AUTOINCREMENT,
id_prestamo      INTEGER NOT NULL,
material         TEXT NOT NULL,
cantidad         INTEGER NOT NULL DEFAULT 1 CHECK (cantidad >= 1),
devuelto         INTEGER NOT NULL DEFAULT 0,
fecha_devolucion TEXT,
FOREIGN KEY (id_prestamo) REFERENCES prestamo(id_prestamo)
);
`);

app.use(express.json());
app.use(express.static('public')); // sirve tus pantallas HTML

// Si algo inesperado falla, el servidor sigue en pie en lugar de apagarse solo
process.on('uncaughtException', (e) => {
    console.error('Error inesperado (el servidor sigue activo):', e);
});
process.on('unhandledRejection', (e) => {
    console.error('Promesa rechazada (el servidor sigue activo):', e);
});

// 2. RF-01 y RF-02: registrar un préstamo con varios materiales
app.post('/api/prestamos', (req, res) => {
const nombre = (req.body.nombre || '').trim();
const curso = (req.body.curso || '').trim();
const materiales = (req.body.materiales || [])
.map(m => ({
    material: String(m.material || '').trim(),
    cantidad: Number(m.cantidad) || 1
}))
.filter(m => m.material !== '');

if (!nombre || !curso || materiales.length === 0) {
    return res.status(400).json({ error: 'Faltan nombre, curso o materiales' });
}


if (!/^\d°\d{1,2}$/.test(curso)) {
    return res.status(400).json({ error: 'El curso debe tener el formato 7°2' });
}

const guardar = db.transaction(() => {
// Reutiliza al usuario si ya existe con el mismo nombre y curso
let u = db.prepare('SELECT id_usuario FROM usuario WHERE nombre = ? AND curso = ?')
            .get(nombre, curso);
    const idUsuario = u
    ? u.id_usuario
    : db.prepare('INSERT INTO usuario (nombre, curso) VALUES (?, ?)')
        .run(nombre, curso).lastInsertRowid;

const idPrestamo = db.prepare('INSERT INTO prestamo (id_usuario) VALUES (?)')
                    .run(idUsuario).lastInsertRowid;

const insertar = db.prepare(
    'INSERT INTO detalle_prestamo (id_prestamo, material, cantidad) VALUES (?, ?, ?)'
);
for (const m of materiales) insertar.run(idPrestamo, m.material, m.cantidad);

    return idPrestamo;
});

const id = guardar();
res.status(201).json({ ok: true, id_prestamo: Number(id) });
});

// Estado automático según los días fuera
function estado(dias) {
    if (dias < 1) return 'En préstamo';
    if (dias < 8) return 'Pendiente';
    return 'Atrasado';
}

// Préstamos activos agrupados por préstamo, con búsqueda
app.get('/api/activos', (req, res) => {
const q = '%' + (req.query.q || '').trim() + '%';
const filas = db.prepare(`
SELECT d.id_detalle, d.material, d.cantidad, p.id_prestamo, p.fecha_hora,
        u.nombre, u.curso,
        julianday('now') - julianday(p.fecha_hora) AS dias
FROM detalle_prestamo d
JOIN prestamo p ON p.id_prestamo = d.id_prestamo
JOIN usuario  u ON u.id_usuario  = p.id_usuario
WHERE d.devuelto = 0
    AND (u.nombre LIKE ? OR u.curso LIKE ? OR d.material LIKE ?)
ORDER BY p.fecha_hora DESC, d.id_detalle
`).all(q, q, q);

const grupos = new Map();
for (const f of filas) {
if (!grupos.has(f.id_prestamo)) {
    grupos.set(f.id_prestamo, {
        id_prestamo: f.id_prestamo, nombre: f.nombre, curso: f.curso,
        fecha_hora: f.fecha_hora, materiales: []
    });
    }
    grupos.get(f.id_prestamo).materiales.push({
    id_detalle: f.id_detalle, material: f.material,
    cantidad: f.cantidad, estado: estado(f.dias)
});
}
res.json([...grupos.values()]);
});

// Devolución individual de un material
app.post('/api/devolver/:id', (req, res) => {
const r = db.prepare(`
UPDATE detalle_prestamo
SET devuelto = 1, fecha_devolucion = CURRENT_TIMESTAMP
WHERE id_detalle = ? AND devuelto = 0
`).run(req.params.id);
if (r.changes === 0) {
    return res.status(404).json({ error: 'Ese material ya estaba devuelto o no existe' });
}
res.json({ ok: true });
});

// Historial: materiales ya devueltos, con búsqueda
app.get('/api/historial', (req, res) => {
const q = '%' + (req.query.q || '').trim() + '%';
const filas = db.prepare(`
SELECT d.id_detalle, d.material, d.cantidad,
        p.fecha_hora AS salio, d.fecha_devolucion AS regreso,
        u.nombre, u.curso
    FROM detalle_prestamo d
    JOIN prestamo p ON p.id_prestamo = d.id_prestamo
    JOIN usuario  u ON u.id_usuario  = p.id_usuario
    WHERE d.devuelto = 1
    AND (u.nombre LIKE ? OR u.curso LIKE ? OR d.material LIKE ?)
    ORDER BY d.fecha_devolucion DESC, d.id_detalle DESC
`).all(q, q, q);
res.json(filas);
});

// Resumen: cantidad de materiales por estado
app.get('/api/resumen', (req, res) => {
const filas = db.prepare(`
    SELECT julianday('now') - julianday(p.fecha_hora) AS dias
    FROM detalle_prestamo d
    JOIN prestamo p ON p.id_prestamo = d.id_prestamo
    WHERE d.devuelto = 0
`).all();

const r = { enPrestamo: 0, pendiente: 0, atrasado: 0, devuelto: 0 };
for (const f of filas) {
    const e = estado(f.dias);
    if (e === 'En préstamo') r.enPrestamo++;
    else if (e === 'Pendiente') r.pendiente++;
    else r.atrasado++;
}
r.devuelto = db.prepare(
    'SELECT COUNT(*) AS n FROM detalle_prestamo WHERE devuelto = 1'
).get().n;
res.json(r);
});

//Última red de seguridad: responde con JSON y no apaga el servidor
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

const servidor = app.listen(3000, () => {
    console.log('Servidor listo en http://localhost:3000');
});

servidor.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.error('');
        console.error('El puerto 3000 ya esta en uso: otro servidor de la biblioteca sigue abierto.');
        console.error('Cierra esas ventanas negras y vuelve a abrir iniciar.bat.');
        process.exit(1);
    }
    throw e;
});