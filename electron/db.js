const fs = require('fs');
const path = require('path');
const { app, BrowserWindow } = require('electron');
const Database = require('better-sqlite3');

const dbPath = path.join(app.getPath('userData'), 'app.db');
let db = new Database(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    ocultar TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS folders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    parent_id INTEGER,
    category_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES folders(id),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS folder_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    folder_id INTEGER NOT NULL,
    accessed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    folder_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    ocultar TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE
  )
`).run();

function exportarBaseDatos(destinoPath) {
  const origen = dbPath; // corregido
  try {
    fs.copyFileSync(origen, destinoPath);
    return { success: true, message: 'Base de datos exportada correctamente.' };
  } catch (error) {
    return { success: false, message: 'Error exportando la base de datos.', error: error.message };
  }
}

function importarBaseDatos(rutaArchivoDb, mainWindow) {
  try {
    if (!fs.existsSync(rutaArchivoDb)) {
      return { success: false, message: 'Archivo no encontrado.', error: 'Ruta inválida' };
    }
    if (db) db.close();
    fs.copyFileSync(rutaArchivoDb, dbPath);
    db = new Database(dbPath);

    const isDev = !app.isPackaged;
    const indexPath = isDev
      ? path.join(__dirname, '../dist/control-notas/browser/index.html')
      : path.join(__dirname, '..', 'dist', 'control-notas', 'browser', 'browser', 'index.html');

    if (mainWindow && mainWindow.loadFile) {
      mainWindow.loadFile(indexPath).catch(console.error);
    }

    return { success: true, message: 'Base de datos importada y recargada correctamente.' };
  } catch (error) {
    return { success: false, message: 'Error importando la base de datos.', error: error.message };
  }
}

//db.prepare(`ALTER TABLE articles ADD COLUMN ocultar TEXT`).run();

module.exports = {
  db,
  dbPath,
  exportarBaseDatos,
  importarBaseDatos,
  // === CATEGORÍAS ===
  crearCategoria(nombre, ocultar) {
    return db.prepare('INSERT INTO categories (name,ocultar) VALUES (?,?)').run(nombre, ocultar);
  },

  obtenerCategorias() {
    return db.prepare('SELECT * FROM categories').all();
  },
  actualizarCategoria(id, nombre, ocultar) {
    return db.prepare('UPDATE categories SET name = ?, ocultar = ? WHERE id = ?').run(nombre, ocultar, id);
  },

  eliminarCategoria(id) {
    return db.prepare('DELETE FROM categories WHERE id = ?').run(id);
  },

  // === CARPETAS ===
  crearCarpeta(nombre, parentId = null, categoryId = null) {
    return db.prepare('INSERT INTO folders (name, parent_id, category_id) VALUES (?, ?, ?)').run(nombre, parentId, categoryId);
  },

  obtenerCarpetas(parentId = null) {
    return db.prepare('SELECT * FROM folders WHERE parent_id IS ?').all(parentId);
  },
  obtenerCarpetasCategoria(categoriaId = null) {
    return db.prepare('SELECT * FROM folders WHERE category_id IS ?').all(categoriaId);
  },
  actualizarCarpeta(id, nombre) {
    return db.prepare('UPDATE folders SET name = ? WHERE id = ?').run(name, id);
  },

  eliminarCarpeta(id) {
    return db.prepare('DELETE FROM folders WHERE id = ?').run(id);
  },


  // === ARTÍCULOS ===
  crearArticulo(folderId, title, content = '', ocultar) {
    console.log(folderId)
    return db.prepare('INSERT INTO articles (folder_id, title, content,ocultar) VALUES (?, ?, ?, ?)').run(folderId, title, content, ocultar);
  },

  obtenerArticulosPorCarpeta(folderId) {
    return db.prepare('SELECT * FROM articles WHERE folder_id = ? ORDER BY created_at DESC').all(folderId);
  },

  obtenerArticulos() {
    return db.prepare('SELECT * FROM articles ORDER BY created_at DESC').all();
  },

  actualizarArticulo(id, title, content, ocultar) {
    return db.prepare(`
    UPDATE articles
    SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP, ocultar = ?
    WHERE id = ?
  `).run(title, content, ocultar, id);
  },
  actualizarArticuloOcultar(id, ocultar) {
    return db.prepare(`
    UPDATE articles
    SET updated_at = CURRENT_TIMESTAMP, ocultar = ?
    WHERE id = ?
  `).run(ocultar, id);
  },

  eliminarArticulo(id) {
    return db.prepare('DELETE FROM articles WHERE id = ?').run(id);
  },
  // === HISTORIAL DE CARPETAS ===

  agregarHistorialCarpeta(folderId) {
    return db.prepare(`
      INSERT INTO folder_history (folder_id) VALUES (?)
    `).run(folderId);
  },

  obtenerHistorialCarpetas() {
    return db.prepare(`
      SELECT fh.id, fh.folder_id, fh.accessed_at, f.name, f.category_id, f.created_at
      FROM folder_history fh
      JOIN folders f ON f.id = fh.folder_id
      ORDER BY fh.accessed_at ASC
    `).all();
  },

  eliminarHistorialCarpeta(folderId) {
    return db.prepare(`
      DELETE FROM folder_history WHERE folder_id = ?
    `).run(folderId);
  },

  limpiarHistorialCarpetas() {
    return db.prepare(`DELETE FROM folder_history`).run();
  },
  dbPath,
  db
};
