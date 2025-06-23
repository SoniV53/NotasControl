const path = require('path');
const { app } = require('electron');
const Database = require('better-sqlite3');

const dbPath = path.join(app.getPath('userData'), 'app.db');
const db = new Database(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
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
    FOREIGN KEY (category_id) REFERENCES categories(id)
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    folder_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (folder_id) REFERENCES folders(id)
  )
`).run();

module.exports = {

  // === CATEGORÍAS ===
  crearCategoria(nombre) {
    return db.prepare('INSERT INTO categories (name) VALUES (?)').run(nombre);
  },

  obtenerCategorias() {
    return db.prepare('SELECT * FROM categories').all();
  },
  actualizarCategoria(id, nombre) {
    return db.prepare('UPDATE categories SET name = ? WHERE id = ?').run(nombre, id);
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
  actualizarCarpeta(id, nombre) {
    return db.prepare('UPDATE folders SET name = ? WHERE id = ?').run(name, id);
  },

  eliminarCarpeta(id) {
    return db.prepare('DELETE FROM folders WHERE id = ?').run(id);
  },


  // === ARTÍCULOS ===
  crearArticulo(folderId, title, content = '') {
    return db.prepare('INSERT INTO articles (folder_id, title, content) VALUES (?, ?, ?)').run(folderId, title, content);
  },

  obtenerArticulosPorCarpeta(folderId) {
    return db.prepare('SELECT * FROM articles WHERE folder_id = ? ORDER BY created_at DESC').all(folderId);
  },
  actualizarArticulo(id, title, content) {
    return db.prepare(`
    UPDATE articles
    SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(title, content, id);
  },
  eliminarArticulo(id) {
    return db.prepare('DELETE FROM articles WHERE id = ?').run(id);
  }
};
