import { AfterViewInit, Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Carpeta } from '../../model/CategoriaCarpetasModel';
import { ConfiguracionPageComponent } from '../../ui/main/configuracion-page/configuracion-page.component';
import Swal from 'sweetalert2';
import { Dropdown } from 'bootstrap';
import { TituloEditorComponent } from '../titulo-editor/titulo-editor.component';

@Component({
  selector: 'app-carpetas',
  templateUrl: './carpetas.component.html',
  styleUrl: './carpetas.component.scss'
})
export class CarpetasComponent extends ConfiguracionPageComponent implements AfterViewInit {
  @Input() carpetasListado: Carpeta[] = [];
  @Input() isCategoria: boolean = false;
  @Input() categoriaId: number = 0;
  @Output() onClickAction = new EventEmitter<any>()
  @Output() onDbClickAction = new EventEmitter<any>()
  @ViewChildren(TituloEditorComponent) titulosEditor!: QueryList<TituloEditorComponent>;

  carpetaId = '';
  carpetaSelec: any;

  ngAfterViewInit(): void {
    this.carpetasListado = this.carpetasListado.map(res => ({
      ...res,
      editandoTitulo: false
    }));
    console.log(this.carpetasListado)
  }

  clickAction(event: any) {
    if (this.isCategoria) {
      this.carpetaId = event.id
    }
    this.onClickAction.emit(event);
  }
  dbClickAction(event: any) {
    this.onDbClickAction.emit(event);
  }

  isValidateId(id: any) {
    return this.carpetaId.toString() === id.toString();
  }

  async eliminarCarpeta(item: any) {
    this.messageEliminar(async () => {
      try {
        await this.electron.eliminarCarpeta(item.id).then(() => {
          this.carpetasListado = this.carpetasListado.filter(c => c.id !== item.id);
        });
        Swal.fire({
          title: "Se elimino Correctamente!",
          icon: "success",
          draggable: true
        });

      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Elimine Articulos Antes y Carpetas",
          icon: "error",
          draggable: true
        });
      }
    })
  }

  changeTextEmitter(event: any, carpeta: any) {
    if (carpeta.nombre === event) {
      return;
    }
    carpeta.nombre = event;
    if (this.isCategoria) {
      this.selectorSer.actualizarNombreCarpeta(this.categoriaId, carpeta.id, carpeta.nombre);
    }
    this.electron.actualizarCarpeta(carpeta.id, carpeta.nombre);
    carpeta.editandoTitulo = false;
  }

  async clickActionDrow(tipo: any, carpeta: any) {
    switch (tipo.id) {
      case '2':
        carpeta.editandoTitulo = true;
        this.editarTitulo('editorCarpetaId' + carpeta.id,this.titulosEditor)
        break;
      case '1':
        if (this.isCategoria) {
          await this.myApp.eliminarCarpeta(this.carpetaSelec, this.categoriaId);
        } else {
          this.eliminarCarpeta(this.carpetaSelec);
        }
        break;
      default:
        break;
    }
  }
}

