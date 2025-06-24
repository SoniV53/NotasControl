import { Injectable } from '@angular/core';

declare global {
  interface Window {
    require: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  ipcRenderer = window.require?.('electron')?.ipcRenderer;

  // Categorías
  crearCategoria(nombre: string) {
    return this.ipcRenderer.crearCategoria
      ? this.ipcRenderer.crearCategoria(nombre)
      : this.ipcRenderer.invoke('crear-categoria', nombre);
  }

  obtenerCategorias() {
    return this.ipcRenderer.obtenerCategorias
      ? this.ipcRenderer.obtenerCategorias()
      : this.ipcRenderer.invoke('obtener-categorias');
  }

  actualizarCategoria(id: number, name: string) {
    return this.ipcRenderer.actualizarCategoria
      ? this.ipcRenderer.actualizarCategoria(id, name)
      : this.ipcRenderer.invoke('actualizar-categoria', id, name);
  }

  eliminarCategoria(id: number) {
    return this.ipcRenderer.eliminarCategoria
      ? this.ipcRenderer.eliminarCategoria(id)
      : this.ipcRenderer.invoke('eliminar-categoria', id);
  }

  // Carpetas
  crearCarpeta(nombre: string, parentId: number | null = null, categoryId: number | null = null) {
    return this.ipcRenderer.crearCarpeta
      ? this.ipcRenderer.crearCarpeta(nombre, parentId, categoryId)
      : this.ipcRenderer.invoke('crear-carpeta', nombre, parentId, categoryId);
  }

  obtenerCarpetas(parentId: number | null = null) {
    return this.ipcRenderer.obtenerCarpetas
      ? this.ipcRenderer.obtenerCarpetas(parentId)
      : this.ipcRenderer.invoke('obtener-carpetas', parentId);
  }
  obtenerCarpetaCategoria(categoriaId: number | null = null) {
    return this.ipcRenderer.obtenerCarpetas
      ? this.ipcRenderer.obtenerCarpetasCategoria(categoriaId)
      : this.ipcRenderer.invoke('obtener-carpetas-categoria', categoriaId);
  }

  actualizarCarpeta(id: number, name: string) {
    return this.ipcRenderer.actualizarCarpeta
      ? this.ipcRenderer.actualizarCarpeta(id, name)
      : this.ipcRenderer.invoke('actualizar-carpeta', id, name);
  }

  eliminarCarpeta(id: number) {
    return this.ipcRenderer.eliminarCarpeta
      ? this.ipcRenderer.eliminarCarpeta(id)
      : this.ipcRenderer.invoke('eliminar-carpeta', id);
  }

  // Artículos
  crearArticulo(folderId: number | null, title: string, content: string) {
    console.log({ titulo: title, contenido: content, folderId: folderId })

    return this.ipcRenderer.crearArticulo
      ? this.ipcRenderer.crearArticulo(folderId, title, content)
      : this.ipcRenderer.invoke('crear-articulo', folderId, title, content);
  }

  obtenerArticulosPorCarpeta(folderId: number | undefined) {
    return this.ipcRenderer.obtenerArticulosPorCarpeta
      ? this.ipcRenderer.obtenerArticulosPorCarpeta(folderId)
      : this.ipcRenderer.invoke('obtener-articulos-carpeta', folderId);
  }

  obtenerArticulos() {
    return this.ipcRenderer.obtenerArticulos
      ? this.ipcRenderer.obtenerArticulos()
      : this.ipcRenderer.invoke('obtener-articulos');
  }

  actualizarArticulo(id: number, title: string, content: string) {
    return this.ipcRenderer.actualizarArticulo
      ? this.ipcRenderer.actualizarArticulo(id, title, content)
      : this.ipcRenderer.invoke('actualizar-articulo', id, title, content);
  }

  eliminarArticulo(id: number) {
    return this.ipcRenderer.eliminarArticulo
      ? this.ipcRenderer.eliminarArticulo(id)
      : this.ipcRenderer.invoke('eliminar-articulo', id);
  }
}
