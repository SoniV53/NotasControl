import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataDrownItem } from '../drowmenu.component';
import { Dropdown } from 'bootstrap';

@Component({
  selector: 'app-drow-icon-menu',
  templateUrl: './drow-icon-menu.component.html',
  styleUrl: './drow-icon-menu.component.scss'
})
export class DrowIconMenuComponent {
  @Input() idDrow: string = '';
  @Input() itemDrow: DataDrownItem | null = null;
  @Input() isColor: boolean = false;
  @Input() color: string = '';
  @Output() onActinClick = new EventEmitter<any>();
  @Output() onActinClickButton = new EventEmitter<any>();

  actionClick() {
    this.onActinClick.emit(this.itemDrow);
  }
  actionClickButton() {
    this.onActinClickButton.emit(this.color);
  }

  activarEdicionR(event: MouseEvent) {
    const id = `drowItem${this.idDrow}`;
    const toggleButton = document.getElementById(id)!;

    const allMenus = document.querySelectorAll('.dropdown-menu.show');
    allMenus.forEach((menu) => {
      if (!toggleButton.parentElement?.contains(menu)) {
        menu.classList.remove('show');
      }
    });

    const dropdown = new Dropdown(toggleButton);
    dropdown.toggle();
  }
}
