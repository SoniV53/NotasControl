import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Opcion } from '../../model/Opcion';

@Component({
  selector: 'input-selector',
  templateUrl: './input-selector.component.html',
  styleUrl: './input-selector.component.scss'
})
export class InputSelectorComponent {
  @Input() listado: Opcion[] = [];
  @Input() seleccionado = '';
  @Input() placeholder = '';
  @Output() onChangeValue = new EventEmitter<any>();

  changeValue() {
    if (this.listado && this.onChangeValue) {
      const data = this.listado.find((val) => val.code == this.seleccionado);
      if (data) {
        this.onChangeValue.emit(data);
      } else {
        this.onChangeValue.emit({ code: '', text: '' });
      }

    }
  }
}
