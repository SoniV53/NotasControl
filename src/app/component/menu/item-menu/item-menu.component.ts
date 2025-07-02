import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrl: './item-menu.component.scss'
})
export class ItemMenuComponent {

  @Input() itemSelect: boolean = false;
  @Input() tipo: number = 0;
  @Input() ocultar: boolean = true;
  @Input() texto: string = '';
  @Output() onChangeTextEmitter = new EventEmitter<any>();
  @Output() onClickItem = new EventEmitter<any>();
  @Output() onClickItemCarpeta = new EventEmitter<number>();
  @Output() onClickMore = new EventEmitter<any>();



  clickMore() {
    this.ocultar = !this.ocultar
    this.onClickMore.emit(this.ocultar);
  }

  clickItem() {
    this.onClickItem.emit();
  }
  clickItemCarpeta() {
    this.onClickItemCarpeta.emit(this.tipo);
  }
  changeTextEmitter(event:any) {
    this.texto = event;
    this.onChangeTextEmitter.emit({text:this.texto,tipo:this.tipo});
  }

  dbclickItem() {
    
  }
}
