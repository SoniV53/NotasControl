const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

contextBridge.exposeInMainWorld('electron', {
  eliminarBaseDatos: () => ipcRenderer.invoke('eliminar-base-datos'),
  exportarBaseDatos: (destinoPath) => ipcRenderer.invoke('exportar-base-datos', destinoPath),
  importarBaseDatos: (rutaArchivoDb) => ipcRenderer.invoke('importar-base-datos', rutaArchivoDb),

  ipcRenderer: {
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  },

  // === PARÁMETROS ===
  crearParametro: (clave, valor) =>
    ipcRenderer.invoke('crear-parametro', clave, valor),

  obtenerParametros: () =>
    ipcRenderer.invoke('obtener-parametros'),

  obtenerParametro: (clave) =>
    ipcRenderer.invoke('obtener-parametro', clave),

  actualizarParametro: (clave, valor) =>
    ipcRenderer.invoke('actualizar-parametro', clave, valor),

  eliminarParametro: (clave) =>
    ipcRenderer.invoke('eliminar-parametro', clave),

  // === CATEGORÍA ===
  crearCategoria: (nombre, ocultar) =>
    ipcRenderer.invoke('crear-categoria', nombre, ocultar),

  obtenerCategorias: () =>
    ipcRenderer.invoke('obtener-categorias'),

  actualizarCategoria: (id, name, ocultar) =>
    ipcRenderer.invoke('actualizar-categoria', id, name, ocultar),

  eliminarCategoria: (id) =>
    ipcRenderer.invoke('eliminar-categoria', id),

  // === CARPETA ===
  crearCarpeta: (nombre, parentId = null, categoryId = null) =>
    ipcRenderer.invoke('crear-carpeta', nombre, parentId, categoryId),

  obtenerCarpetas: (parentId = null) =>
    ipcRenderer.invoke('obtener-carpetas', parentId),

  obtenerCarpetasCategoria: (categoriaId = null) =>
    ipcRenderer.invoke('obtener-carpetas-categoria', categoriaId),

  actualizarCarpeta: (id, name) =>
    ipcRenderer.invoke('actualizar-carpeta', id, name),

  eliminarCarpeta: (id) =>
    ipcRenderer.invoke('eliminar-carpeta', id),

  // === ARTÍCULO ===
  crearArticulo: (folderId, title, content, ocultar) =>
    ipcRenderer.invoke('crear-articulo', folderId, title, content, ocultar),

  obtenerArticulosPorCarpeta: (folderId) =>
    ipcRenderer.invoke('obtener-articulos-carpeta', folderId),

  obtenerArticulos: () =>
    ipcRenderer.invoke('obtener-articulos'),

  actualizarArticulo: (id, title, content, ocultar) =>
    ipcRenderer.invoke('actualizar-articulo', id, title, content, ocultar),

  actualizarArticuloOcultar: (id, ocultar) =>
    ipcRenderer.invoke('actualizar-articulo-ocultar', id, ocultar),

  actualizarTituloArticulo: (id, titulo) =>
    ipcRenderer.invoke('actualizar-articulo-titulo', id, titulo),

  eliminarArticulo: (id) =>
    ipcRenderer.invoke('eliminar-articulo', id),

  // === HISTORIAL DE CARPETAS ===
  agregarHistorial: (key,tipo) =>
    ipcRenderer.invoke('agregar-historial', key,tipo),

  obtenerHistorialCarpetas: () =>
    ipcRenderer.invoke('obtener-historial-carpetas'),

  obtenerHistorial: () =>
    ipcRenderer.invoke('obtener-historial'),

  eliminarHistorial: (key) =>
    ipcRenderer.invoke('eliminar-historial', key),

  limpiarHistorial: () =>
    ipcRenderer.invoke('limpiar-historial'),
});

