import { AfterViewInit, Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Dropdown } from 'bootstrap';
import { ConfiguracionPageComponent } from '../../../ui/main/configuracion-page/configuracion-page.component';
import { DataDrownItem } from '../../drowmenu/drowmenu.component';
import { TituloEditorComponent } from '../../titulo-editor/titulo-editor.component';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrl: './item-menu.component.scss'
})
export class ItemMenuComponent extends ConfiguracionPageComponent implements AfterViewInit {
  @ViewChildren(TituloEditorComponent) titulosEditor!: QueryList<TituloEditorComponent>;
  @Input() itemSelect: boolean = false;
  @Input() itemId: string = '';
  @Input() tipo: number = 0;
  @Input() ocultar: boolean = true;
  @Input() texto: string = '';
  @Input() editandoTitulo: boolean = false;
  @Output() onChangeTextEmitter = new EventEmitter<any>();
  @Output() onClickItem = new EventEmitter<any>();
  @Output() onClickItemCarpeta = new EventEmitter<number>();
  @Output() onClickMore = new EventEmitter<any>();
  @Output() onClickActionDrow = new EventEmitter<any>();

  ngAfterViewInit(): void {
    if (this.tipo == 0) {
      this.listaDrowDefault.push({ id: '3', value: 'Ocultar' })
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


  clickActionDrow(tipo: DataDrownItem) {
    if (tipo.id === '2') {
      this.editarTitulo(this.itemId + 'editor', this.titulosEditor);
    } 
    this.onClickActionDrow.emit(tipo);
  }
}
