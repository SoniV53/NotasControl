import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { Carpeta } from '../../model/CategoriaCarpetasModel';

@Component({
  selector: 'acordion-item',
  templateUrl: './acordion-item.component.html',
  styleUrl: './acordion-item.component.scss'
})
export class AcordionItemComponent implements OnInit {

  @Input() title = '';
  @Input() id = '';
  @Input() listadoCarpetas: Carpeta[] = [] 
  @Output() onClickAction = new EventEmitter<Carpeta>()
  @Output() onClickCreate = new EventEmitter<any>()
  @Output() onClickEliminate = new EventEmitter<any>()

  idAccordion = '';
  idCollap = '';

  ngOnInit(): void {
    this.idAccordion = 'accordion_'+this.id;
    this.idCollap = 'collap_'+this.id;
  }

  clickAction(event:Carpeta){
    if (this.onClickAction && event) {
      this.onClickAction.emit(event);
    }
  }
  clickCreate(event:any){
    if (this.onClickCreate && event) {
      this.onClickCreate.emit(event);
    }
  }
  clickDelete(event:any){
    if (this.onClickEliminate && event) {
      this.onClickEliminate.emit(event);
    }
  }
}
