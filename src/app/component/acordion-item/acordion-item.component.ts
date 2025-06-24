import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { Carpeta } from '../../model/CategoriaCarpetasModel';
import { ConfiguracionPageComponent } from '../../ui/main/configuracion-page/configuracion-page.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'acordion-item',
  templateUrl: './acordion-item.component.html',
  styleUrl: './acordion-item.component.scss'
})
export class AcordionItemComponent extends ConfiguracionPageComponent implements OnInit {

  @Input() title = '';
  @Input() id = '';
  @Input() listadoCarpetas: Carpeta[] = []
  @Output() onClickAction = new EventEmitter<Carpeta>()
  @Output() onClickCreate = new EventEmitter<any>()
  @Output() onClickEliminate = new EventEmitter<any>()

  idAccordion = '';
  idCollap = '';

  ngOnInit(): void {
    this.idAccordion = 'accordion_' + this.id;
    this.idCollap = 'collap_' + this.id;
  }

  clickAction(event: Carpeta) {
    if (this.onClickAction && event) {
      this.onClickAction.emit(event);
    }
  }
  clickCreate(event: any) {
    if (this.onClickCreate && event) {
      this.onClickCreate.emit(event);
    }
  }
  clickDelete(event: any) {
    if (this.onClickEliminate && event) {
      this.onClickEliminate.emit(event);
    }
  }

  async eliminarCarpeta(item: any,event: MouseEvent) {
     event.stopPropagation();
    this.messageEliminar(async () => {
      try {
        await this.electron.eliminarCarpeta(item.id).then(() => {
          this.listadoCarpetas = this.listadoCarpetas.filter(c => c.id !== item.id);
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
