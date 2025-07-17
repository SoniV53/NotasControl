import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carpeta, CategoriaCarpetas } from '../model/CategoriaCarpetasModel';
import { AtributosTitulo } from './atribuitos/EnumAtributos';

export interface ItemSeleccionado {
  id: string;
  tipo: number;
}

export interface CarpetaArticuloSelect {
  carpetaId: number;
  articuloId: number;
}

@Injectable({
  providedIn: 'root'
})
export class SelectorServiceService {
  public selectedFilePath = '';
  private scrollPosY: number = 0;
  private historialCarpetas = new BehaviorSubject<Carpeta[]>([]);
  private listadoCategoria = new BehaviorSubject<CategoriaCarpetas[]>([]);
  private listadoCarpetas = new BehaviorSubject<Carpeta[]>([]);
  private itemSeleccionId = new BehaviorSubject<ItemSeleccionado | null>(null);

  public historialCarpetas$: Observable<Carpeta[]> = this.historialCarpetas.asObservable();
  public listadoCategoria$: Observable<CategoriaCarpetas[]> = this.listadoCategoria.asObservable();
  public itemSeleccionId$: Observable<ItemSeleccionado | null> = this.itemSeleccionId.asObservable();
  public listadoCarpetas$: Observable<Carpeta[]> = this.listadoCarpetas.asObservable();

  public historialSelectorArti: CarpetaArticuloSelect[] = [];

  obtenerArticuloCarpeta(carpetaId: number) {
    if (this.historialSelectorArti) {
      return this.historialSelectorArti.find(res => res.carpetaId == carpetaId)?.articuloId;
    }
    return -1;
  }

  setArticuloCarpeta(item: CarpetaArticuloSelect) {
    if (this.historialCarpetas) {
      const exisSele = this.historialSelectorArti.find(res => res.carpetaId == item.carpetaId);
      if (exisSele) {
        exisSele.articuloId = item.articuloId;
        return;
      }
      this.historialSelectorArti.push(item)
    }
  }

  public setItemSeleccionId(item: ItemSeleccionado): void {
    this.itemSeleccionId.next(item);
  }

  public clearItemSeleccionId(): void {
    this.itemSeleccionId.next(null);
  }

  public setListadoCarpetas(items: Carpeta[]): void {
    this.listadoCarpetas.next(items);
  }

  public clearListadoCarpetas(): void {
    this.listadoCarpetas.next([]);
  }



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

  actualizarAtributoCategoria(
    categoriaId: number,
    titulo: AtributosTitulo,
    nuevoValor: string | boolean
  ): void {
    const actual = this.listadoCategoria.getValue();
    const actualizado = actual.map(categoria => {
      if (categoria.id === categoriaId && categoria.attr) {
        const nuevosAttr = categoria.attr.map(attr =>
          attr.titulo === titulo
            ? { ...attr, value: nuevoValor }
            : attr
        );
        return { ...categoria, attr: nuevosAttr };
      }
      return categoria;
    });

    this.listadoCategoria.next(actualizado);
  }

  actualizarNombreCarpeta(idCategoria: number, idCarpeta: number, nuevoNombre: string): void {
    const actual = this.listadoCategoria.getValue();

    const actualizado = actual.map(categoria => {
      if (categoria.id === idCategoria) {
        const carpetasActualizadas = categoria.carpetas.map(carpeta =>
          carpeta.id === idCarpeta
            ? { ...carpeta, nombre: nuevoNombre }
            : carpeta
        );
        return { ...categoria, carpetas: carpetasActualizadas };
      } else {
        return categoria;
      }
    });

    this.listadoCategoria.next(actualizado);
  }

  agregarCarpetaCategoria(idCategoria: number, carpeta: Carpeta): void {

    if (carpeta && carpeta.id) {
      const actualList = this.listadoCategoria.getValue();

      const categoria = actualList.find(res => res.id.toString() === idCategoria.toString());

      if (categoria) {
        if (!categoria.carpetas) {
          categoria.carpetas = [];
        }

        categoria.carpetas.push(carpeta);
      }
      console.log(actualList)
      this.listadoCategoria.next(actualList);
    }
  }


  eliminarCarpetaCategoria(idCategoria: number, idCarpeta: number): void {
    const actualList = this.listadoCategoria.getValue();
    const categoria = actualList.find(res => res.id.toString() === idCategoria.toString());

    if (categoria && categoria.carpetas) {
      categoria.carpetas = categoria.carpetas.filter(carpeta => carpeta.id.toString() !== idCarpeta.toString());
    }

    this.listadoCategoria.next(actualList);
  }

  eliminarCategoria(id: number): void {
    const actual = this.listadoCategoria.getValue();
    const filtrado = actual.filter(c => c.id !== id);
    this.listadoCategoria.next(filtrado);
  }

  limpiarCategorias(): void {
    this.listadoCategoria.next([]);
  }

  obtenerIdMaximoCategoria(): number {
    const listado = this.listadoCategoria.getValue();

    if (listado.length === 0) {
      return 0; // Si no hay categorías, devuelves 0 o lo que prefieras como base
    }

    // Encuentra el ID máximo
    const ids = listado.map(categoria => categoria.id);
    const idMaximo = Math.max(...ids);

    return idMaximo;
  }
  // async guardarScrollVentana(id: string) {
  //   const el = document.getElementById(id);
  //   if (el) {
  //     this.scrollPosY = el.scrollTop;
  //   }
  // }

  // async restaurarScrollVentana(id: string) {
  //   const el = document.getElementById(id);
  //   if (el) {
  //     el.scrollTo({
  //       top: this.scrollPosY,
  //       behavior: 'smooth'
  //     });
  //   }
  // }
}
