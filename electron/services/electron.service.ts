import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  private electron = window.electron;

  eliminarBaseDatos() {
    return this.electron.eliminarBaseDatos();
  }

  exportarBaseDatos(destinoPath: string) {
    return this.electron.exportarBaseDatos(destinoPath);
  }

  importarBaseDatos(rutaArchivoDb: string) {
    return this.electron.importarBaseDatos(rutaArchivoDb);
  }

  // Parámetros
  crearParametro(clave: string, valor: string) {
    return this.electron.crearParametro(clave, valor);
  }

  obtenerParametros() {
    return this.electron.obtenerParametros();
  }

  obtenerParametro(clave: string) {
    return this.electron.obtenerParametro(clave);
  }

  actualizarParametro(clave: string, valor: string) {
    return this.electron.actualizarParametro(clave, valor);
  }

  eliminarParametro(clave: string) {
    return this.electron.eliminarParametro(clave);
  }

  // Categorías
  crearCategoria(nombre: string, ocultar: boolean) {
    return this.electron.crearCategoria(nombre, ocultar.toString());
  }

  obtenerCategorias() {
    return this.electron.obtenerCategorias();
  }

  actualizarCategoria(id: number, name: string, ocultar: boolean) {
    return this.electron.actualizarCategoria(id, name, ocultar.toString());
  }

  eliminarCategoria(id: number) {
    return this.electron.eliminarCategoria(id);
  }

  // Carpetas
  crearCarpeta(nombre: string, parentId: number | null = null, categoryId: number | null = null) {
    return this.electron.crearCarpeta(nombre, parentId, categoryId);
  }

  obtenerCarpetas(parentId: number | null = null) {
    return this.electron.obtenerCarpetas(parentId);
  }

  obtenerCarpetaCategoria(categoriaId: number | null = null) {
    return this.electron.obtenerCarpetasCategoria(categoriaId);
  }

  actualizarCarpeta(id: number, name: string) {
    return this.electron.actualizarCarpeta(id, name);
  }

  eliminarCarpeta(id: number) {
    return this.electron.eliminarCarpeta(id);
  }

  // Artículos
  crearArticulo(folderId: number | null, title: string, content: string, ocultar: boolean) {
    return this.electron.crearArticulo(folderId, title, content, ocultar.toString());
  }

  obtenerArticulosPorCarpeta(folderId?: number) {
    return this.electron.obtenerArticulosPorCarpeta(folderId);
  }

  obtenerArticulos() {
    return this.electron.obtenerArticulos();
  }

  actualizarArticulo(id: number, title: string, content: string, ocultar: boolean) {
    return this.electron.actualizarArticulo(id, title, content, ocultar.toString());
  }

  actualizarTituloArticulo(id: number, title: string) {
    return this.electron.actualizarTituloArticulo(id, title);
  }

  actualizarArticuloOcultar(id: number, ocultar: boolean) {
    return this.electron.actualizarArticuloOcultar(id, ocultar.toString());
  }

  eliminarArticulo(id: number) {
    return this.electron.eliminarArticulo(id);
  }

  // Historial de Carpetas
  agregarHistorial(key: number,tipo:string) {
    return this.electron.agregarHistorial(key,tipo);
  }

  obtenerHistorialCarpetas() {
    return this.electron.obtenerHistorialCarpetas();
  }
  obtenerHistorial() {
    return this.electron.obtenerHistorial();
  }

  eliminarHistorial(key: number) {
    return this.electron.eliminarHistorial(key);
  }

  limpiarHistorial() {
    return this.electron.limpiarHistorial();
  }

}
