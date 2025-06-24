const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./db');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    menuBarVisible: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
    }
  });

  win.setAutoHideMenuBar(true);
  win.setMenuBarVisibility(false);

  const isDev = !app.isPackaged;

  const indexPath = isDev
    ? path.join(__dirname, '../dist/control-notas/browser/index.html')
    : path.join(__dirname, '..', 'dist', 'control-notas', 'browser', 'browser', 'index.html');

  console.log('Cargando desde:', indexPath);

  win.loadFile(indexPath).catch((err) => {
    console.error(' Error al cargar index.html:', err);
  });

  win.webContents.openDevTools();

  win.on("closed", () => {
    window = null;
  });

}


app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// === CATEGORÍA ===
ipcMain.handle('crear-categoria', (event, nombre) => {
  return db.crearCategoria(nombre);
});

ipcMain.handle('obtener-categorias', () => {
  return db.obtenerCategorias();
});

ipcMain.handle('actualizar-categoria', (event, id, name) => {
  return db.actualizarCategoria(id, name);
});

ipcMain.handle('eliminar-categoria', (event, id) => {
  return db.eliminarCategoria(id);
});

// === CARPETA ===
ipcMain.handle('crear-carpeta', (event, nombre, parentId = null, categoryId = null) => {
  return db.crearCarpeta(nombre, parentId, categoryId);
});

ipcMain.handle('obtener-carpetas', (event, parentId = null) => {
  return db.obtenerCarpetas(parentId);
});
ipcMain.handle('obtener-carpetas-categoria', (event, categoriaId = null) => {
  return db.obtenerCarpetasCategoria(categoriaId);
});

ipcMain.handle('actualizar-carpeta', (event, id, name) => {
  return db.actualizarCarpeta(id, name);
});

ipcMain.handle('eliminar-carpeta', (event, id) => {
  return db.eliminarCarpeta(id);
});


// === ARTÍCULO ===
ipcMain.handle('crear-articulo', (event, folderId, title, content) => {
  return db.crearArticulo(folderId, title, content);
});

ipcMain.handle('obtener-articulos-carpeta', (event, folderId) => {
  return db.obtenerArticulosPorCarpeta(folderId);
});
ipcMain.handle('obtener-articulos', (event) => {
  return db.obtenerArticulos();
});

ipcMain.handle('actualizar-articulo', (event, id, title, content) => {
  return db.actualizarArticulo(id, title, content);
});

ipcMain.handle('eliminar-articulo', (event, id) => {
  return db.eliminarArticulo(id);
});