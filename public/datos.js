// Guarda y lee todos los datos de la biblioteca directamente en este navegador
// (localStorage). No necesita servidor, ni internet, ni ventanas abiertas.
// Los datos quedan en esta computadora y solo este navegador los ve.
(function () {
  'use strict';

  const CLAVE = 'biblioteca_datos_v1';
  const SEMILLA = {
 "usuarios": [
  {
   "id_usuario": 1,
   "nombre": "Luana",
   "curso": "7°2"
  },
  {
   "id_usuario": 2,
   "nombre": "Lucia",
   "curso": "7°2"
  },
  {
   "id_usuario": 3,
   "nombre": "luci",
   "curso": "8°2"
  },
  {
   "id_usuario": 4,
   "nombre": "Ns",
   "curso": "3°4"
  },
  {
   "id_usuario": 5,
   "nombre": "Hola",
   "curso": "4°6"
  },
  {
   "id_usuario": 6,
   "nombre": "Martinez",
   "curso": "5°6"
  },
  {
   "id_usuario": 7,
   "nombre": "Adriana",
   "curso": "2°5"
  }
 ],
 "prestamos": [
  {
   "id_prestamo": 1,
   "id_usuario": 1,
   "fecha_hora": "2026-10-06 01:34:31"
  },
  {
   "id_prestamo": 2,
   "id_usuario": 2,
   "fecha_hora": "2026-10-06 02:29:05"
  },
  {
   "id_prestamo": 3,
   "id_usuario": 2,
   "fecha_hora": "2026-10-06 02:41:07"
  },
  {
   "id_prestamo": 4,
   "id_usuario": 3,
   "fecha_hora": "2026-10-06 02:44:02"
  },
  {
   "id_prestamo": 5,
   "id_usuario": 4,
   "fecha_hora": "2026-10-06 21:26:55"
  },
  {
   "id_prestamo": 6,
   "id_usuario": 5,
   "fecha_hora": "2026-10-06 21:42:42"
  },
  {
   "id_prestamo": 7,
   "id_usuario": 2,
   "fecha_hora": "2026-10-06 21:54:15"
  },
  {
   "id_prestamo": 8,
   "id_usuario": 6,
   "fecha_hora": "2026-10-06 21:54:43"
  },
  {
   "id_prestamo": 9,
   "id_usuario": 7,
   "fecha_hora": "2026-10-06 21:54:59"
  }
 ],
 "detalles": [
  {
   "id_detalle": 1,
   "id_prestamo": 1,
   "material": "Principito",
   "cantidad": 1,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-06 02:24:12"
  },
  {
   "id_detalle": 2,
   "id_prestamo": 2,
   "material": "Principe",
   "cantidad": 2,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-06 02:37:16"
  },
  {
   "id_detalle": 3,
   "id_prestamo": 3,
   "material": "Principito",
   "cantidad": 2,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-06 02:43:31"
  },
  {
   "id_detalle": 4,
   "id_prestamo": 3,
   "material": "Libro2",
   "cantidad": 1,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-06 02:41:21"
  },
  {
   "id_detalle": 5,
   "id_prestamo": 4,
   "material": "Libro 1",
   "cantidad": 1,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-06 02:44:06"
  },
  {
   "id_detalle": 6,
   "id_prestamo": 4,
   "material": "libro 2",
   "cantidad": 1,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-06 02:56:23"
  },
  {
   "id_detalle": 7,
   "id_prestamo": 4,
   "material": "libro3",
   "cantidad": 1,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-06 02:44:05"
  },
  {
   "id_detalle": 8,
   "id_prestamo": 5,
   "material": "Ns",
   "cantidad": 2,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-06 21:27:05"
  },
  {
   "id_detalle": 9,
   "id_prestamo": 5,
   "material": "sds",
   "cantidad": 1,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-06 21:27:06"
  },
  {
   "id_detalle": 10,
   "id_prestamo": 5,
   "material": "sdsds",
   "cantidad": 4,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-06 21:45:23"
  },
  {
   "id_detalle": 11,
   "id_prestamo": 6,
   "material": "Principito",
   "cantidad": 1,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-06 21:45:24"
  },
  {
   "id_detalle": 12,
   "id_prestamo": 6,
   "material": "Principito2",
   "cantidad": 1,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-06 21:45:24"
  },
  {
   "id_detalle": 13,
   "id_prestamo": 7,
   "material": "Matematicas",
   "cantidad": 1,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-19 02:15:54"
  },
  {
   "id_detalle": 14,
   "id_prestamo": 7,
   "material": "Sociales",
   "cantidad": 1,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-19 02:15:55"
  },
  {
   "id_detalle": 15,
   "id_prestamo": 7,
   "material": "Politica",
   "cantidad": 1,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-19 02:15:56"
  },
  {
   "id_detalle": 16,
   "id_prestamo": 8,
   "material": "Principito",
   "cantidad": 3,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-19 02:15:53"
  },
  {
   "id_detalle": 17,
   "id_prestamo": 8,
   "material": "Matematicas",
   "cantidad": 1,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-07 12:09:41"
  },
  {
   "id_detalle": 18,
   "id_prestamo": 9,
   "material": "Principito",
   "cantidad": 1,
   "devuelto": 1,
   "fecha_devolucion": "2026-10-07 12:02:05"
  }
 ]
};

  let db = null;

  function cargar() {
    if (db) return db;
    let guardado = null;
    try { guardado = JSON.parse(localStorage.getItem(CLAVE)); } catch (e) {}
    if (guardado && Array.isArray(guardado.usuarios) &&
        Array.isArray(guardado.prestamos) && Array.isArray(guardado.detalles)) {
      db = guardado;
      if (!db.secuencias) db.secuencias = calcularSecuencias(db);
    } else {
      db = {
        usuarios: SEMILLA.usuarios.slice(),
        prestamos: SEMILLA.prestamos.slice(),
        detalles: SEMILLA.detalles.slice(),
        secuencias: calcularSecuencias(SEMILLA)
      };
      guardar();
    }
    return db;
  }

  function calcularSecuencias(d) {
    return {
      usuario: d.usuarios.reduce((m, u) => Math.max(m, u.id_usuario), 0),
      prestamo: d.prestamos.reduce((m, p) => Math.max(m, p.id_prestamo), 0),
      detalle: d.detalles.reduce((m, x) => Math.max(m, x.id_detalle), 0)
    };
  }

  function guardar() {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(db));
    } catch (e) {
      throw new Error('No se pudo guardar en el navegador, ¿habrá espacio lleno?');
    }
  }

  // Misma marca de tiempo que usaba el servidor: fecha y hora en UTC
  function ahoraUTC() {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  function diasDesde(fecha) {
    return (Date.now() - Date.parse(String(fecha).replace(' ', 'T') + 'Z')) / 86400000;
  }

  function estado(dias) {
    if (dias < 1) return 'En préstamo';
    if (dias < 8) return 'Pendiente';
    return 'Atrasado';
  }

  function bajo(s) {
    return String(s === null || s === undefined ? '' : s).toLowerCase();
  }

  function compararDesc(a, b) {
    a = String(a === null || a === undefined ? '' : a);
    b = String(b === null || b === undefined ? '' : b);
    return a < b ? 1 : a > b ? -1 : 0;
  }

  function usuarioDe(d, prestamo) {
    return d.usuarios.find(u => u.id_usuario === prestamo.id_usuario) || { nombre: '', curso: '' };
  }

  function coincide(d, det, prestamo, q) {
    const u = usuarioDe(d, prestamo);
    return bajo(det.material).includes(q) || bajo(u.nombre).includes(q) || bajo(u.curso).includes(q);
  }

  const Datos = {
    // Lo que muestra la pantalla de Resumen
    resumen() {
      const d = cargar();
      const r = { enPrestamo: 0, pendiente: 0, atrasado: 0, devuelto: 0 };
      for (const det of d.detalles) {
        if (det.devuelto) { r.devuelto++; continue; }
        const p = d.prestamos.find(x => x.id_prestamo === det.id_prestamo);
        if (!p) continue;
        const e = estado(diasDesde(p.fecha_hora));
        if (e === 'En préstamo') r.enPrestamo++;
        else if (e === 'Pendiente') r.pendiente++;
        else r.atrasado++;
      }
      return r;
    },

    // Préstamos agrupados con búsqueda por alumno, curso o material
    activos(busqueda) {
      const d = cargar();
      const q = bajo(busqueda).trim();

      const filas = d.detalles.filter(det => {
        if (det.devuelto) return false;
        if (!q) return true;
        const p = d.prestamos.find(x => x.id_prestamo === det.id_prestamo);
        return p ? coincide(d, det, p, q) : false;
      });

      const grupos = new Map();
      for (const det of filas) {
        const p = d.prestamos.find(x => x.id_prestamo === det.id_prestamo);
        if (!p) continue;
        if (!grupos.has(det.id_prestamo)) {
          const u = usuarioDe(d, p);
          grupos.set(det.id_prestamo, {
            id_prestamo: det.id_prestamo, nombre: u.nombre, curso: u.curso,
            fecha_hora: p.fecha_hora, materiales: []
          });
        }
        grupos.get(det.id_prestamo).materiales.push({
          id_detalle: det.id_detalle, material: det.material,
          cantidad: det.cantidad, estado: estado(diasDesde(p.fecha_hora))
        });
      }

      return [...grupos.values()].sort((a, b) =>
        compararDesc(a.fecha_hora, b.fecha_hora) || a.id_prestamo - b.id_prestamo);
    },

    // Materiales ya devueltos, con búsqueda
    historial(busqueda) {
      const d = cargar();
      const q = bajo(busqueda).trim();
      return d.detalles
        .filter(det => {
          if (!det.devuelto) return false;
          if (!q) return true;
          const p = d.prestamos.find(x => x.id_prestamo === det.id_prestamo);
          return p ? coincide(d, det, p, q) : false;
        })
        .map(det => {
          const p = d.prestamos.find(x => x.id_prestamo === det.id_prestamo) || { fecha_hora: '' };
          const u = usuarioDe(d, p);
          return {
            id_detalle: det.id_detalle, material: det.material, cantidad: det.cantidad,
            salio: p.fecha_hora, regreso: det.fecha_devolucion,
            nombre: u.nombre, curso: u.curso
          };
        })
        .sort((a, b) => compararDesc(a.regreso, b.regreso) || b.id_detalle - a.id_detalle);
    },

    // Registra un préstamo con uno o varios materiales (RF-01 y RF-02)
    registrar(pedido) {
      const nombre = String((pedido && pedido.nombre) || '').trim();
      const curso = String((pedido && pedido.curso) || '').trim();
      const materiales = ((pedido && pedido.materiales) || [])
        .map(m => ({
          material: String(m.material || '').trim(),
          cantidad: Number(m.cantidad) || 1
        }))
        .filter(m => m.material !== '');

      if (!nombre || !curso || materiales.length === 0) {
        throw new Error('Faltan nombre, curso o materiales');
      }
      if (!/^\d°\d{1,2}$/.test(curso)) {
        throw new Error('El curso debe tener el formato 7°2');
      }

      const d = cargar();
      // Reutiliza al usuario si ya existe con el mismo nombre y curso
      let u = d.usuarios.find(x => x.nombre === nombre && x.curso === curso);
      if (!u) {
        u = { id_usuario: ++d.secuencias.usuario, nombre: nombre, curso: curso };
        d.usuarios.push(u);
      }

      const p = {
        id_prestamo: ++d.secuencias.prestamo,
        id_usuario: u.id_usuario,
        fecha_hora: ahoraUTC()
      };
      d.prestamos.push(p);

      for (const m of materiales) {
        d.detalles.push({
          id_detalle: ++d.secuencias.detalle,
          id_prestamo: p.id_prestamo,
          material: m.material,
          cantidad: m.cantidad,
          devuelto: 0,
          fecha_devolucion: null
        });
      }

      guardar();
      return { ok: true, id_prestamo: p.id_prestamo };
    },

    // Devolución individual de un material
    devolver(idDetalle) {
      const d = cargar();
      const det = d.detalles.find(x => x.id_detalle === Number(idDetalle));
      if (!det || det.devuelto) {
        throw new Error('Ese material ya estaba devuelto o no existe');
      }
      det.devuelto = 1;
      det.fecha_devolucion = ahoraUTC();
      guardar();
      return { ok: true };
    },

    // Copia de seguridad: descarga todos los datos como archivo .json
    exportar() {
      const d = cargar();
      const contenido = JSON.stringify({ version: 1, fecha: ahoraUTC(), datos: d }, null, 1);
      const blob = new Blob([contenido], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'biblioteca-copia-' + ahoraUTC().slice(0, 10) + '.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    },

    // Restaura una copia descargada antes
    restaurar(contenido) {
      const bruto = typeof contenido === 'string' ? JSON.parse(contenido) : contenido;
      const d = bruto && bruto.datos ? bruto.datos : bruto;
      if (!d || !Array.isArray(d.usuarios) || !Array.isArray(d.prestamos) ||
          !Array.isArray(d.detalles)) {
        throw new Error('El archivo no parece una copia de la biblioteca');
      }
      db = {
        usuarios: d.usuarios,
        prestamos: d.prestamos,
        detalles: d.detalles,
        secuencias: d.secuencias || calcularSecuencias(d)
      };
      guardar();
      return true;
    }
  };

  cargar(); // si es la primera vez, crea los datos con la copia inicial
  window.Datos = Datos;
})();
