import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Carpeta } from '../../model/CategoriaCarpetasModel';
import { ConfiguracionPageComponent } from '../../ui/main/configuracion-page/configuracion-page.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carpetas',
  templateUrl: './carpetas.component.html',
  styleUrl: './carpetas.component.scss'
})
export class CarpetasComponent extends ConfiguracionPageComponent {
  @Input() carpetasListado: Carpeta[] = [];
  @Output() onClickAction = new EventEmitter<any>()

  clickAction(event: any) {
    this.onClickAction.emit(event);
  }

  async eliminarCarpeta(item: any,event: MouseEvent) {
     event.stopPropagation();
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
}

