import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carpeta } from '../model/CategoriaCarpetasModel';

@Injectable({
  providedIn: 'root'
})
export class SelectorServiceService {
  private carpetaSubject = new BehaviorSubject<Carpeta | null>(null);

  public carpeta$: Observable<Carpeta | null> = this.carpetaSubject.asObservable();

  constructor() { }

  setCarpeta(carpeta: Carpeta) {
    this.carpetaSubject.next(carpeta);
  }

  // Obtener la carpeta actual sincrónicamente
  getCarpetaActual(): Carpeta | null {
    return this.carpetaSubject.getValue();
  }

  // Limpiar la carpeta (por ejemplo, al salir de vista)
  limpiarCarpeta() {
    this.carpetaSubject.next(null);
  }
}
