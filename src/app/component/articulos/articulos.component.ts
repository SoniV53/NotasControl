import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ElectronService } from '../../../../electron/services/electron.service';
import { ConfiguracionPageComponent } from '../../ui/main/configuracion-page/configuracion-page.component';
import { Dropdown } from 'bootstrap';
import { DataDrownItem } from '../drowmenu/drowmenu.component';

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
  articuloDrow: Articulo | null = null;
  numList = 0;


  ngOnInit(): void {
    this.numList = this.articulos.length;
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

      if (this.numList != 0 && this.articulos.length > this.numList) {
        this.seleccionarArticulo(this.articulos[(this.articulos.length - 1)]);
        this.numList = this.articulos.length;
      }
    }else{
      this.articulo = null
    }
  }

  onEliminarArticulo(event: any) {
    if (event) {
      this.messageEliminar(() => {
        this.electron.eliminarArticulo(event).then(() => {
          this.articulos = this.articulos.filter(a => a.id !== event);
          if (this.articulos.length) {
            if (event == this.articulo?.id) {
              this.seleccionarArticulo(this.articulos[0]);
            }
          } else {
            this.articulo = null;
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


  activarEdicionR(event: MouseEvent, articulo: any) {
    this.articuloDrow = articulo;
    event.preventDefault();
    if (window.electron && window.electron.ipcRenderer && articulo) {
      const id = `drowItemArtId${articulo.id}`
      const toggleButton = document.getElementById(id)!;
      const dropdown = new Dropdown(toggleButton);
      dropdown.toggle();
    }
  }

  async clickActionDrow(item: DataDrownItem,articulo:Articulo) {
    this.eliminarArticulo(articulo);
  }

  eliminarArticulo(articulo: Articulo | null) {
    this.messageEliminar(() => {
      if (articulo && articulo?.id) {
        this.electron.eliminarArticulo(articulo.id).then(() => {
          this.articulos = this.articulos.filter(a => a.id.toString() !== articulo.id.toString());
          if (this.articulos.length) {
            if (articulo.id.toString() === this.articulo?.id.toString()) {
              this.seleccionarArticulo(this.articulos[0]);
            }
          } else {
            this.articulo = null;
          }

        });
      }

    })
  }
}
