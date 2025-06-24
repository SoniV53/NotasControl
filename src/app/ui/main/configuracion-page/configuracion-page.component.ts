import { Component } from '@angular/core';
import { ElectronService } from '../../../../../electron/services/electron.service';
import { AppComponent } from '../../../app.component';
import { SelectorServiceService } from '../../../providers/selector-service.service';
import { ViewportScroller } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    public router: Router
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
}
