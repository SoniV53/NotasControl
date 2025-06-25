import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carpeta } from '../model/CategoriaCarpetasModel';

@Injectable({
  providedIn: 'root'
})
export class SelectorServiceService {
  private historialCarpetas = new BehaviorSubject<Carpeta[]>([]);

  public historialCarpetas$: Observable<Carpeta[]> = this.historialCarpetas.asObservable();

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
  removeCarpetaById(id:any): void {
    const actuales = this.historialCarpetas.getValue();
    const filtrados = actuales.filter(c => c.id !== id);
    this.historialCarpetas.next(filtrados);
  }

  // Reemplaza todo el historial
  setHistorial(nuevoHistorial: Carpeta[]): void {
    this.historialCarpetas.next(nuevoHistorial);
  }
}
