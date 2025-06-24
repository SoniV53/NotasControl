import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Carpeta } from '../../model/CategoriaCarpetasModel';

@Component({
  selector: 'app-carpetas',
  templateUrl: './carpetas.component.html',
  styleUrl: './carpetas.component.scss'
})
export class CarpetasComponent {
  @Input() carpetasListado: Carpeta[] = [];
  @Output() onClickAction = new EventEmitter<any>()

  clickAction(event:any){
    this.onClickAction.emit(event);
  }
}

