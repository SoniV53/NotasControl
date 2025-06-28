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

  imprimirPorId(id: string): void {
    const elemento = document.getElementById(id);
    if (!elemento) {
      console.error(`Elemento con id "${id}" no encontrado.`);
      return;
    }

    const contenidoHTML = elemento.innerHTML;

    console.log('Contenido actual:', contenidoHTML);

    return this.ipcRenderer.eliminarBaseDatos
      ? this.ipcRenderer.imprimirContenido(contenidoHTML)
      : this.ipcRenderer.invoke('imprimir-contenido',contenidoHTML);
  }



  eliminarBaseDatos() {
    return this.ipcRenderer.eliminarBaseDatos
      ? this.ipcRenderer.eliminarBaseDatos()
      : this.ipcRenderer.invoke('eliminar-base-datos');
  }


  // Exportar base de datos (copiar a destino)
  exportarBaseDatos(destinoPath: string): Promise<any> {
    return this.ipcRenderer.exportarBaseDatos
      ? this.ipcRenderer.exportarBaseDatos(destinoPath)
      : this.ipcRenderer.invoke('exportar-base-datos', destinoPath);
  }

  // Importar base de datos (sobrescribir con archivo externo)
  importarBaseDatos(rutaArchivoDb: string) {
    return this.ipcRenderer.importarBaseDatos
      ? this.ipcRenderer.importarBaseDatos(rutaArchivoDb)
      : this.ipcRenderer.invoke('importar-base-datos', rutaArchivoDb);
  }

  // Categorías
  crearCategoria(nombre: string, ocultar: boolean) {
    return this.ipcRenderer.crearCategoria
      ? this.ipcRenderer.crearCategoria(nombre, ocultar.toString())
      : this.ipcRenderer.invoke('crear-categoria', nombre, ocultar.toString());
  }

  obtenerCategorias() {
    return this.ipcRenderer.obtenerCategorias
      ? this.ipcRenderer.obtenerCategorias()
      : this.ipcRenderer.invoke('obtener-categorias');
  }

  actualizarCategoria(id: number, name: string, ocultar: boolean) {
    return this.ipcRenderer.actualizarCategoria
      ? this.ipcRenderer.actualizarCategoria(id, name, ocultar.toString())
      : this.ipcRenderer.invoke('actualizar-categoria', id, name, ocultar.toString());
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
  crearArticulo(folderId: number | null, title: string, content: string, ocultar: boolean) {
    return this.ipcRenderer.crearArticulo
      ? this.ipcRenderer.crearArticulo(folderId, title, content, ocultar.toString())
      : this.ipcRenderer.invoke('crear-articulo', folderId, title, content, ocultar.toString());
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

  actualizarArticulo(id: number, title: string, content: string, ocultar: boolean) {
    return this.ipcRenderer.actualizarArticulo
      ? this.ipcRenderer.actualizarArticulo(id, title, content, ocultar.toString())
      : this.ipcRenderer.invoke('actualizar-articulo', id, title, content, ocultar.toString());
  }

  actualizarTituloArticulo(id: number, title: string) {
    return this.ipcRenderer.actualizarArticulo
      ? this.ipcRenderer.actualizarTituloArticulo(id, title)
      : this.ipcRenderer.invoke('actualizar-articulo-titulo', id, title);
  }

  actualizarArticuloOcultar(id: number, ocultar: boolean) {
    return this.ipcRenderer.actualizarArticulo
      ? this.ipcRenderer.actualizarArticuloOcultar(id, ocultar.toString())
      : this.ipcRenderer.invoke('actualizar-articulo-ocultar', id, ocultar.toString());
  }

  eliminarArticulo(id: number) {
    return this.ipcRenderer.eliminarArticulo
      ? this.ipcRenderer.eliminarArticulo(id)
      : this.ipcRenderer.invoke('eliminar-articulo', id);
  }

  // Historial de Carpetas

  agregarHistorialCarpeta(folderId: number) {
    return this.ipcRenderer.agregarHistorialCarpeta
      ? this.ipcRenderer.agregarHistorialCarpeta(folderId)
      : this.ipcRenderer.invoke('agregar-historial-carpeta', folderId);
  }

  obtenerHistorialCarpetas() {
    return this.ipcRenderer.obtenerHistorialCarpetas
      ? this.ipcRenderer.obtenerHistorialCarpetas()
      : this.ipcRenderer.invoke('obtener-historial-carpetas');
  }

  eliminarHistorialCarpeta(folderId: number) {
    return this.ipcRenderer.eliminarHistorialCarpeta
      ? this.ipcRenderer.eliminarHistorialCarpeta(folderId)
      : this.ipcRenderer.invoke('eliminar-historial-carpeta', folderId);
  }

  limpiarHistorialCarpetas() {
    return this.ipcRenderer.limpiarHistorialCarpetas
      ? this.ipcRenderer.limpiarHistorialCarpetas()
      : this.ipcRenderer.invoke('limpiar-historial-carpetas');
  }

}
