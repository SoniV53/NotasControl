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

// === CATEGORÍA ===
window.crearCategoria = (nombre) =>
  ipcRenderer.invoke('crear-categoria', nombre);

window.obtenerCategorias = () =>
  ipcRenderer.invoke('obtener-categorias');

window.actualizarCategoria = (id, name) =>
  ipcRenderer.invoke('actualizar-categoria', id, name);

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
window.crearArticulo = (folderId, title, content) =>
  ipcRenderer.invoke('crear-articulo', folderId, title, content);

window.obtenerArticulosPorCarpeta = (folderId) =>
  ipcRenderer.invoke('obtener-articulos-carpeta', folderId);

window.obtenerArticulos = () =>
  ipcRenderer.invoke('obtener-articulos');

window.actualizarArticulo = (id, title, content) =>
  ipcRenderer.invoke('actualizar-articulo', id, title, content);

window.eliminarArticulo = (id) =>
  ipcRenderer.invoke('eliminar-articulo', id);

