import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ElectronService } from '../../../../electron/services/electron.service';
import { ConfiguracionPageComponent } from '../../ui/main/configuracion-page/configuracion-page.component';

export interface Articulo {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
  ocultar: boolean;
  isChange?: boolean;
}


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.scss'
})
export class ArticulosComponent extends ConfiguracionPageComponent implements OnInit, OnChanges {

  @Input() articulos: Articulo[] = [];
  @Input() carpetaId: number = 0;
  articulo: Articulo | null = null;

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.articulos.length > 0 && this.carpetaId) {
      const articuloId = this.selectorSer.obtenerArticuloCarpeta(this.carpetaId);
      const itemArticulo = this.articulos.find(res => res.id == articuloId);
      if (itemArticulo) {
        this.seleccionarArticulo(itemArticulo);
      } else {
        this.seleccionarArticulo(this.articulos[0]);
      }

    }
  }

  onEliminarArticulo(event: any) {
    if (event) {
      this.messageEliminar(() => {
        this.electron.eliminarArticulo(event).then(() => {
          this.articulos = this.articulos.filter(a => a.id !== event);
          if (event == this.articulo?.id) {
            this.seleccionarArticulo(this.articulos[0]);
          }
        });
      })
    }
  }

  articuloId(currentId: number) {
    return currentId == this.articulo?.id;
  }

  seleccionarArticulo(articulo: any) {
    if (articulo) {
      this.articulo = articulo;
      if (this.carpetaId) {
        this.selectorSer.setArticuloCarpeta({ carpetaId: this.carpetaId, articuloId: articulo.id });
      }
    }
  }
}
