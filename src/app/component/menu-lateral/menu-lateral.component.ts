import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Carpeta, CategoriaCarpetas } from '../../model/CategoriaCarpetasModel';
import { ConfiguracionPageComponent } from '../../ui/main/configuracion-page/configuracion-page.component';

@Component({
  selector: 'menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss'
})
export class MenuLateralComponent extends ConfiguracionPageComponent {

  @Input() listadoCategoria: CategoriaCarpetas[] = []
  @Output() onClickActionCarpeta = new EventEmitter<Carpeta>()
  @Output() onClickCreate = new EventEmitter<any>()
  @Output() onClickEliminate = new EventEmitter<any>()

  isActive = true;

  toggleSidebar() {
    this.isActive = !this.isActive;
  }

  clickActionCarpeta(event: Carpeta) {
    if (this.onClickActionCarpeta && event) {
      this.onClickActionCarpeta.emit(event);
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

  goHome() {
    //this.router.navigate(['/home'], { replaceUrl: true });
    // this.router.navigate(['/home']);
  }

  changeTextEmitter(event: any) {
    if (event.value && event.id) {
      this.selectorSer.actualizarNombreCategoria(event.id, event.value);
    }
  }
}
