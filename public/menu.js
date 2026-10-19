// Menú lateral compartido por todas las pantallas.
// Para cambiar un texto del menú o del cartel de estados, se edita solo este archivo.
// En celular agrega además la barra superior con el botón hamburguesa y el fondo para cerrar.
(function () {
  const paginas = [
    ['index.html', 'Resumen'],
    ['registrar.html', 'Registrar préstamo'],
    ['activos.html', 'Préstamos activos'],
    ['historial.html', 'Historial']
  ];
  const seccionBase = [
    ['profesores.html', 'Profesores'],
    ['inventario.html', 'Inventario']
  ];
  const actual = location.pathname.split('/').pop() || 'index.html';

  const enlaces = paginas.map(function (p) {
    return '<a href="' + p[0] + '"' + (p[0] === actual ? ' class="activo"' : '') + '>' + p[1] + '</a>';
  }).join('');

  // Botón "Base de datos": al abrirlo muestra Profesores e Inventario debajo
  const dentroBase = seccionBase.some(function (p) { return p[0] === actual; });
  const enlacesBase = seccionBase.map(function (p) {
    return '<a href="' + p[0] + '"' + (p[0] === actual ? ' class="activo"' : '') + '>' + p[1] + '</a>';
  }).join('');
  const grupoBase =
    '<div class="grupo-base">' +
      '<button type="button" class="btn-base" aria-expanded="' + (dentroBase ? 'true' : 'false') +
        '" aria-controls="submenu-base">' +
        '<span>Base de datos</span>' +
        '<svg class="flecha" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
          'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          '<path d="M9 6l6 6-6 6"/></svg>' +
      '</button>' +
      '<div class="submenu' + (dentroBase ? ' visible' : '') + '" id="submenu-base">' + enlacesBase + '</div>' +
    '</div>';

  const menu = document.getElementById('menu');
  menu.innerHTML =
    '<button type="button" class="cerrar-menu" aria-label="Cerrar menú">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>' +
    '</button>' +
    '<div class="marca">Biblioteca escolar<small>Control de préstamos</small></div>' +
    '<nav>' + enlaces + grupoBase + '</nav>' +
    '<div class="plazos">' +
      '<strong>Estados automáticos</strong>' +
      'En préstamo: hace menos de 1 día.<br>' +
      'Pendiente: entre 1 y 7 días fuera.<br>' +
      'Atrasado: más de 8 días fuera.' +
      '<strong class="copia">Copia de seguridad</strong>' +
      '<button type="button" class="btn-copia" data-accion="guardar">Guardar copia</button>' +
      '<button type="button" class="btn-copia" data-accion="cargar">Cargar copia</button>' +
    '</div>';

  // Barra superior (solo visible en celular) con el botón hamburguesa
  const topbar = document.createElement('div');
  topbar.className = 'topbar';
  topbar.innerHTML =
    '<button type="button" class="btn-hamburguesa" aria-label="Abrir menú" ' +
      'aria-expanded="false" aria-controls="menu">' +
      '<span></span><span></span><span></span>' +
    '</button>' +
    '<span class="marca-top">Biblioteca escolar</span>';

  // Fondo semitransparente detrás del menú abierto
  const fondo = document.createElement('div');
  fondo.className = 'fondo-menu';
  fondo.setAttribute('aria-hidden', 'true');

  document.body.appendChild(topbar);
  document.body.appendChild(fondo);

  const hamburguesa = topbar.querySelector('.btn-hamburguesa');

  function abrirMenu() {
    menu.classList.add('abierto');
    fondo.classList.add('visible');
    document.body.classList.add('menu-abierto');
    hamburguesa.setAttribute('aria-expanded', 'true');
  }

  function cerrarMenu() {
    menu.classList.remove('abierto');
    fondo.classList.remove('visible');
    document.body.classList.remove('menu-abierto');
    hamburguesa.setAttribute('aria-expanded', 'false');
  }

  hamburguesa.addEventListener('click', function () {
    if (menu.classList.contains('abierto')) cerrarMenu(); else abrirMenu();
  });
  // Cerrar tocando el fondo, el botón × o una tecla
  fondo.addEventListener('click', cerrarMenu);
  menu.querySelector('.cerrar-menu').addEventListener('click', cerrarMenu);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarMenu();
  });

  // El botón "Base de datos" abre y cierra sus dos opciones
  const btnBase = menu.querySelector('.btn-base');
  const submenuBase = menu.querySelector('#submenu-base');
  btnBase.addEventListener('click', function () {
    const abierto = btnBase.getAttribute('aria-expanded') === 'true';
    btnBase.setAttribute('aria-expanded', String(!abierto));
    submenuBase.classList.toggle('visible', !abierto);
  });
  // Cerrar también después de elegir una opción
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') cerrarMenu();
  });

  // Copia de seguridad: los datos se guardan solo en este navegador,
  // así que conviene poder descargarlos y restaurarlos desde un archivo.
  menu.addEventListener('click', function (e) {
    const b = e.target.closest ? e.target.closest('.btn-copia') : null;
    if (!b || !window.Datos) return;
    if (b.dataset.accion === 'guardar') { Datos.exportar(); return; }
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = function () {
      const archivo = input.files && input.files[0];
      if (!archivo) return;
      const lector = new FileReader();
      lector.onload = function () {
        try {
          Datos.restaurar(lector.result);
          alert('Copia restaurada correctamente.');
          location.reload();
        } catch (err) {
          alert('No se pudo cargar la copia: ' + err.message);
        }
      };
      lector.readAsText(archivo);
    };
    input.click();
  });

  // Si la pantalla vuelve a tamaño escritorio, el menú recupera su estado normal
  const escritorio = window.matchMedia('(min-width: 768px)');
  const revisar = function () { if (escritorio.matches) cerrarMenu(); };
  if (escritorio.addEventListener) escritorio.addEventListener('change', revisar);
  else if (escritorio.addListener) escritorio.addListener(revisar);
})();
