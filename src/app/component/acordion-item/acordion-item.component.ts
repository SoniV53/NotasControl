import { AfterViewInit, Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { Carpeta, CategoriaCarpetas } from '../../model/CategoriaCarpetasModel';
import { ConfiguracionPageComponent } from '../../ui/main/configuracion-page/configuracion-page.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'acordion-item',
  templateUrl: './acordion-item.component.html',
  styleUrl: './acordion-item.component.scss'
})
export class AcordionItemComponent extends ConfiguracionPageComponent implements OnInit, AfterViewInit {


  @Input() categoria: CategoriaCarpetas | null = null;
  @Output() onClickAction = new EventEmitter<Carpeta>()
  @Output() onClickCreate = new EventEmitter<any>()
  @Output() onClickEliminate = new EventEmitter<any>()

  idAccordion = '';
  idCollap = '';
  listadoCarpetas: Carpeta[] = [];

  ngOnInit(): void {
    if (this.categoria) {
      this.idAccordion = 'accordion_' + this.categoria?.id;
      this.idCollap = 'collap_' + this.categoria?.id;
      this.listadoCarpetas = this.categoria?.carpetas;
    }
  }

  ngAfterViewInit(): void {
    if (this.categoria) {
      this.idAccordion = 'accordion_' + this.categoria?.id;
      this.idCollap = 'collap_' + this.categoria?.id;
      this.listadoCarpetas = this.categoria?.carpetas;
    }
  }

  clickAction(event: Carpeta) {
    if (this.onClickAction && event) {
      this.onClickAction.emit(event);
    }
  }
  clickCreate(event: any) {
    if (this.categoria) {
      this.categoria.ocultar = true;
    }
    if (this.onClickCreate && event) {
      this.onClickCreate.emit(event);
    }
  }
  clickDelete(event: any) {
    if (this.categoria) {
      this.categoria.ocultar = true;
    }
    if (this.onClickEliminate && event) {
      this.onClickEliminate.emit(event);
    }
  }

  async eliminarCarpeta(item: any, event: MouseEvent) {
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

  actionClick() {
    console.log("ACTUALIZACION PASO 0")
    if (this.categoria) {

      this.categoria.ocultar = !this.categoria?.ocultar;
      console.log("ACTUALIZACION PASO 1 " + this.categoria.ocultar)
      this.actualizarEstado(this.categoria.ocultar);
    }
  }

  async actualizarEstado(ocultar: boolean) {
    if (!this.categoria) return;
    try {
      await this.electron.actualizarCategoria(this.categoria?.id, this.categoria?.categoria, ocultar);
      console.log("ACTUALIZACION PASO 2")
    } catch (error) {
      console.error(error);
    }
  }
}
