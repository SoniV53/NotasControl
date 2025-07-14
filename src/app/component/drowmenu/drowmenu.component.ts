import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dropdown } from 'bootstrap';

export interface DataDrownItem {
  id: string;
  value: string;
}

@Component({
  selector: 'app-drowmenu',
  templateUrl: './drowmenu.component.html',
  styleUrl: './drowmenu.component.scss'
})
export class DrowmenuComponent {
  @Input() idDrow: string = '';
  @Input() listaDrow: DataDrownItem[] = [];
  @Output() onActinClick = new EventEmitter<any>();

  actionClick(item: DataDrownItem) {
    this.onActinClick.emit(item);
  }


  // activarEdicionR(event: MouseEvent) {
  //   event.preventDefault();
  //   if (window.electron && window.electron.ipcRenderer) {
  //     const id = `drowItem${this.idDrow}`
  //     const toggleButton = document.getElementById(id)!;
  //     const dropdown = new Dropdown(toggleButton);
  //     dropdown.toggle();
  //   }
  // }
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
