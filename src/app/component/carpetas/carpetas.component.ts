import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Carpeta } from '../../model/CategoriaCarpetasModel';
import { ConfiguracionPageComponent } from '../../ui/main/configuracion-page/configuracion-page.component';
import Swal from 'sweetalert2';
import { Dropdown } from 'bootstrap';

@Component({
  selector: 'app-carpetas',
  templateUrl: './carpetas.component.html',
  styleUrl: './carpetas.component.scss'
})
export class CarpetasComponent extends ConfiguracionPageComponent {
  @Input() carpetasListado: Carpeta[] = [];
  @Input() isCategoria: boolean = false;
  @Input() categoriaId: number = 0;
  @Output() onClickAction = new EventEmitter<any>()
  @Output() onDbClickAction = new EventEmitter<any>()

  carpetaId = '';  
  carpetaSelec: any;
  editandoTitulo = false;

  clickAction(event: any) {
    if (this.isCategoria) {
      this.carpetaId = event.id
    }
    this.onClickAction.emit(event);
  }
  dbClickAction(event: any) {
    this.onDbClickAction.emit(event);
  }

  isValidateId(id:any){
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
  }

  activarEdicionR(event: MouseEvent, carpeta: any) {
    this.carpetaSelec = carpeta;
    event.preventDefault();
    if (window.electron && window.electron.ipcRenderer && carpeta) {
      const id = `listCarpetaId${carpeta.id}`
      const toggleButton = document.getElementById(id)!;
      const dropdown = new Dropdown(toggleButton);
      dropdown.toggle();
    }
  }

  async clickActionDrow(tipo: string) {
    switch (tipo) {
      case 'editar':
        this.editandoTitulo = true;
        break;
      case 'eliminar':
        if (this.isCategoria) {
          await this.myApp.eliminarCarpeta(this.carpetaSelec,this.categoriaId);
        } else {
          this.eliminarCarpeta(this.carpetaSelec);
        }
        break;

      default:
        break;
    }

  }
}

