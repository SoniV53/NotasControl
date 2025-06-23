import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Carpeta, CategoriaCarpetas } from '../../model/CategoriaCarpetasModel';

@Component({
  selector: 'menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss'
})
export class MenuLateralComponent {

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

  formatId(texto: string): string {
    return texto.replace(/[\s^*@:.,'\\/-]/g, '');
  }
}
