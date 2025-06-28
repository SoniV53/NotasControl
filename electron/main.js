const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./db');
const { exportarBaseDatos, importarBaseDatos } = require('./db');
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    menuBarVisible: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.setAutoHideMenuBar(true);
  mainWindow.setMenuBarVisibility(false);

  const isDev = !app.isPackaged;

  const indexPath = isDev
    ? path.join(__dirname, '../dist/control-notas/browser/index.html')
    : path.join(__dirname, '..', 'dist', 'control-notas', 'browser', 'browser', 'index.html');

  console.log('Cargando desde:', indexPath);
  mainWindow.loadFile(indexPath).catch((err) => {
    console.error(' Error al cargar index.html:', err);
  });

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    window = null;
  });

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('exportar-base-datos', (event, destinoPath) => {
  return exportarBaseDatos(destinoPath);
});

ipcMain.handle('importar-base-datos', (event, rutaArchivoDb) => {
  return importarBaseDatos(rutaArchivoDb, mainWindow);
});


ipcMain.handle('imprimir-contenido', async (event, contenidoHTML) => {
  const printWindow = new BrowserWindow({
    show: true,  
    webPreferences: {
      nodeIntegration: true
    }
  });

  const htmlContent = `
    <html>
      <head>
        <title>Imprimir</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
        </style>
      </head>
      <body>${contenidoHTML}</body>
    </html>
  `;

  await printWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));

  printWindow.webContents.on('did-finish-load', () => {
    printWindow.webContents.print(
      { silent: false, printBackground: true },
      (success, failureReason) => {
        if (!success) console.error('Error al imprimir:', failureReason);
        printWindow.close();
      }
    );
  });

  return true;
});



// === CATEGORÍA ===
ipcMain.handle('crear-categoria', (event, nombre, ocultar) => {
  return db.crearCategoria(nombre, ocultar);
});

ipcMain.handle('obtener-categorias', () => {
  return db.obtenerCategorias();
});

ipcMain.handle('actualizar-categoria', (event, id, name, ocultar) => {
  return db.actualizarCategoria(id, name, ocultar);
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
ipcMain.handle('crear-articulo', (event, folderId, title, content, ocultar) => {
  return db.crearArticulo(folderId, title, content, ocultar);
});

ipcMain.handle('obtener-articulos-carpeta', (event, folderId) => {
  return db.obtenerArticulosPorCarpeta(folderId);
});
ipcMain.handle('obtener-articulos', (event) => {
  return db.obtenerArticulos();
});

ipcMain.handle('actualizar-articulo', (event, id, title, content, ocultar) => {
  return db.actualizarArticulo(id, title, content, ocultar);
});

ipcMain.handle('actualizar-articulo-titulo', (event, id, title) => {
  return db.actualizarTituloArticulo(id, title);
});

ipcMain.handle('actualizar-articulo-ocultar', (event, id, ocultar) => {
  return db.actualizarArticuloOcultar(id, ocultar);
});

ipcMain.handle('eliminar-articulo', (event, id) => {
  return db.eliminarArticulo(id);
});

// === HISTORIAL DE CARPETAS ===

ipcMain.handle('agregar-historial-carpeta', (event, folderId) => {
  return db.agregarHistorialCarpeta(folderId);
});

ipcMain.handle('obtener-historial-carpetas', () => {
  return db.obtenerHistorialCarpetas();
});

ipcMain.handle('eliminar-historial-carpeta', (event, folderId) => {
  return db.eliminarHistorialCarpeta(folderId);
});

ipcMain.handle('limpiar-historial-carpetas', () => {
  return db.limpiarHistorialCarpetas();
});
