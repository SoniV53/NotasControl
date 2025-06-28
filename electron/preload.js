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

window.eliminarBaseDatos = () =>
  ipcRenderer.invoke('eliminar-base-datos');

window.exportarBaseDatos = (destinoPath) => ipcRenderer.invoke('exportar-base-datos', destinoPath);
window.importarBaseDatos = (rutaArchivoDb) => ipcRenderer.invoke('importar-base-datos', rutaArchivoDb);
window.imprimirContenido = (contenido) => ipcRenderer.invoke('imprimir-contenido', contenido);


// === CATEGORÍA ===
window.crearCategoria = (nombre, ocultar) =>
  ipcRenderer.invoke('crear-categoria', nombre, ocultar);

window.obtenerCategorias = () =>
  ipcRenderer.invoke('obtener-categorias');

window.actualizarCategoria = (id, name, ocultar) =>
  ipcRenderer.invoke('actualizar-categoria', id, name, ocultar);

window.eliminarCategoria = (id) =>
  ipcRenderer.invoke('eliminar-categoria', id);
// === CARPETA ===
window.crearCarpeta = (nombre, parentId = null, categoryId = null) =>
  ipcRenderer.invoke('crear-carpeta', nombre, parentId, categoryId);

window.obtenerCarpetas = (parentId = null) =>
  ipcRenderer.invoke('obtener-carpetas', parentId);

window.obtenerCarpetasCategoria = (categoriaId = null) =>
  ipcRenderer.invoke('obtener-carpetas-categoria', categoriaId);

window.actualizarCarpeta = (id, name) =>
  ipcRenderer.invoke('actualizar-carpeta', id, name);

window.eliminarCarpeta = (id) =>
  ipcRenderer.invoke('eliminar-carpeta', id);

// === ARTÍCULO ===
window.crearArticulo = (folderId, title, content, ocultar) =>
  ipcRenderer.invoke('crear-articulo', folderId, title, content, ocultar);

window.obtenerArticulosPorCarpeta = (folderId) =>
  ipcRenderer.invoke('obtener-articulos-carpeta', folderId);

window.obtenerArticulos = () =>
  ipcRenderer.invoke('obtener-articulos');

window.actualizarArticulo = (id, title, content, ocultar) =>
  ipcRenderer.invoke('actualizar-articulo', id, title, content, ocultar);

window.actualizarArticuloOcultar = (id, ocultar) =>
  ipcRenderer.invoke('actualizar-articulo-ocultar', id, ocultar);

window.actualizarTituloArticulo = (id, titulo) =>
  ipcRenderer.invoke('actualizar-articulo-titulo', id, titulo);

window.eliminarArticulo = (id) =>
  ipcRenderer.invoke('eliminar-articulo', id);

// === HISTORIAL DE CARPETAS ===
window.agregarHistorialCarpeta = (folderId) =>
  ipcRenderer.invoke('agregar-historial-carpeta', folderId);

window.obtenerHistorialCarpetas = () =>
  ipcRenderer.invoke('obtener-historial-carpetas');

window.eliminarHistorialCarpeta = (folderId) =>
  ipcRenderer.invoke('eliminar-historial-carpeta', folderId);

window.limpiarHistorialCarpetas = () =>
  ipcRenderer.invoke('limpiar-historial-carpetas');

