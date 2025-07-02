import { Component } from '@angular/core';
import { ElectronService } from '../../../../../electron/services/electron.service';
import { AppComponent } from '../../../app.component';
import { SelectorServiceService } from '../../../providers/selector-service.service';
import { Location, ViewportScroller } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaCarpetas } from '../../../model/CategoriaCarpetasModel';

declare var bootstrap: any;

@Component({
  selector: 'app-configuracion-page',
  templateUrl: './configuracion-page.component.html',
  styleUrl: './configuracion-page.component.scss'
})
export class ConfiguracionPageComponent {

  //this.router.navigate(['/carpeta', id]);

  constructor(
    public electron: ElectronService,
    public myApp: AppComponent,
    public selectorSer: SelectorServiceService,
    public viewportScroller: ViewportScroller,
    public router: Router,
    public location: Location,
    public route: ActivatedRoute
  ) {

  }

  formatId(texto: string): string {
    return texto.replace(/[\s^*@:.,'\\/-]/g, '');
  }

  messageEliminar(callback: () => void) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  }

  messageImportar(callback: () => void) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, importar',
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  }

  textoABoolean(valor: string): boolean {
    return valor?.toLowerCase() === 'true';
  }

  mensajeToast(title: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: title
    });
  }

  async scrollToTopById(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  selectorMenuPint(listado:CategoriaCarpetas[], id:number,tipo:number) {
    this.selectorSer.setItemSeleccionId({ id: id.toString(), tipo: tipo })
    const carpeta = listado.find(res => res.id == id)?.carpetas;
    this.selectorSer.clearListadoCarpetas();
    this.selectorSer.setListadoCarpetas(carpeta || [])
  }

  pintItemMenu(id:number,tipo:number){
    this.selectorSer.setItemSeleccionId({ id: id.toString(), tipo: tipo })
  }
}
