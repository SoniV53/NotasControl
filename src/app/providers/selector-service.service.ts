import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carpeta, CategoriaCarpetas } from '../model/CategoriaCarpetasModel';

@Injectable({
  providedIn: 'root'
})
export class SelectorServiceService {
  public selectedFilePath = '';
  private historialCarpetas = new BehaviorSubject<Carpeta[]>([]);
  private listadoCategoria = new BehaviorSubject<CategoriaCarpetas[]>([]);

  public historialCarpetas$: Observable<Carpeta[]> = this.historialCarpetas.asObservable();
  public listadoCategoria$: Observable<CategoriaCarpetas[]> = this.listadoCategoria.asObservable();

  constructor() { }

  // Agrega una carpeta al historial
  addCarpeta(carpeta: Carpeta): void {
    const actuales = this.historialCarpetas.getValue();
    this.historialCarpetas.next([...actuales, carpeta]);
  }

  // Obtiene el valor actual del historial (snapshot)
  getHistorialActual(): Carpeta[] {
    return this.historialCarpetas?.getValue();
  }

  // Limpia todo el historial
  clearHistorial(): void {
    this.historialCarpetas.next([]);
  }

  // Elimina una carpeta por id (suponiendo que Carpeta tiene id)
  removeCarpetaById(id: any): void {
    const actuales = this.historialCarpetas.getValue();
    const filtrados = actuales.filter(c => c.id !== id);
    this.historialCarpetas.next(filtrados);
  }

  // Reemplaza todo el historial
  setHistorial(nuevoHistorial: Carpeta[]): void {
    this.historialCarpetas.next(nuevoHistorial);
  }


  getListadoCategoria(): CategoriaCarpetas[] {
    return this.listadoCategoria.getValue();
  }

  setListadoCategoria(lista: CategoriaCarpetas[]): void {
    this.listadoCategoria.next(lista);
  }

  agregarCategoria(nueva: CategoriaCarpetas): void {
    const actual = this.listadoCategoria.getValue();
    this.listadoCategoria.next([...actual, nueva]);
  }

  actualizarNombreCategoria(id: number, nuevaCategoria: string): void {
    const actual = this.listadoCategoria.getValue();
    const actualizado = actual.map(c =>
      c.id === id ? { ...c, categoria: nuevaCategoria } : c
    );
    this.listadoCategoria.next(actualizado);
  }

  eliminarCategoria(id: number): void {
    const actual = this.listadoCategoria.getValue();
    const filtrado = actual.filter(c => c.id !== id);
    this.listadoCategoria.next(filtrado);
  }

  limpiarCategorias(): void {
    this.listadoCategoria.next([]);
  }

}
