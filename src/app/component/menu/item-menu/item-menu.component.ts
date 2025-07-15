import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Dropdown } from 'bootstrap';
import { ConfiguracionPageComponent } from '../../../ui/main/configuracion-page/configuracion-page.component';
import { DataDrownItem } from '../../drowmenu/drowmenu.component';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrl: './item-menu.component.scss'
})
export class ItemMenuComponent extends ConfiguracionPageComponent implements AfterViewInit {
  @Input() itemSelect: boolean = false;
  @Input() itemId: string = '';
  @Input() tipo: number = 0;
  @Input() ocultar: boolean = true;
  @Input() texto: string = '';
  @Output() onChangeTextEmitter = new EventEmitter<any>();
  @Output() onClickItem = new EventEmitter<any>();
  @Output() onClickItemCarpeta = new EventEmitter<number>();
  @Output() onClickMore = new EventEmitter<any>();
  @Output() onClickActionDrow = new EventEmitter<any>();

  editandoTitulo = false;


  ngAfterViewInit(): void {
    if (this.tipo == 0) {
      this.listaDrowDefault.push({id:'3',value:'Ocultar'})
    }

  }

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
  changeTextEmitter(event: any) {
    this.texto = event;
    this.onChangeTextEmitter.emit({ text: this.texto, tipo: this.tipo });
  }

  activarEdicionR(event: MouseEvent) {
    event.preventDefault();
    if (window.electron && window.electron.ipcRenderer) {
      const toggleButton = document.getElementById(this.itemId)!;
      if (toggleButton) {
        const dropdown = new Dropdown(toggleButton);
        dropdown.show();
      }
    }
  }

  clickActionDrow(tipo: DataDrownItem) {
    switch (tipo.id) {
      case '2':
        this.editandoTitulo = true;
        break;

      default:
        this.onClickActionDrow.emit(tipo)
        break;
    }

  }
}
