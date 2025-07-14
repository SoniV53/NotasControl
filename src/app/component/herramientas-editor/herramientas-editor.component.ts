import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Articulo } from '../articulos/articulos.component';
import { Modal } from 'bootstrap';
import { Dropdown } from 'bootstrap';

export interface HerramientasData {
  id: string
}

@Component({
  selector: 'app-herramientas-editor',
  templateUrl: './herramientas-editor.component.html',
  styleUrl: './herramientas-editor.component.scss'
})
export class HerramientasEditorComponent {
  @Input() articulo: Articulo | null = null;
  @Input() printSectionId: string = '';
  @ViewChild('editor') editor!: ElementRef;
  @Output() onClickTools = new EventEmitter<string>();
  fontSize: number = 7;

  mostrarModalTabla = false;
  filas = 2;
  columnas = 2;


  constructor() {
  }

  exec(cmd: string) {
    document.execCommand(cmd, false, '');
  }
  exec2(cmd: string) {
    let fragmentoHtml = '';
    switch (cmd) {
      case 'check':
        fragmentoHtml = `<input class="form-check-input" type="checkbox" value="" >`
        break;
      case 'table':
        //fragmentoHtml = this.generateTable();
        fragmentoHtml = this.generateTable2(this.filas, this.columnas);
        break;

      default:
        break;
    }

    document.execCommand('insertHTML', false, fragmentoHtml);
  }

  generateTable() {
    return `<table class="table">
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">colum 1</th>
          <th scope="col">colum 2</th>
          <th scope="col">colum 3</th>
          <th scope="col">colum 4</th>
          <th scope="col">colum 5</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">\u200B</th>
          <td>\u200B</td>
          <td>\u200B</td>
          <td>\u200B</td>
          <td>\u200B</td>
          <td>\u200B</td>
        </tr>
      </tbody>
    </table>`

  }

  execFormat(command: string, value: string) {
    document.execCommand(command, false, value);
  }

  guardarContenido() {
    const htmlContent = this.editor.nativeElement.innerHTML;
    console.log(htmlContent);
  }

  pegarContenido() {
    //this.editor.nativeElement.innerHTML = this.textoParaPegar;
  }

  cambiarSize(paso: number) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement('span');

    const parent = selection.focusNode?.parentElement;
    const currentSize = parent?.style.fontSize
      ? parseInt(parent.style.fontSize.replace('px', ''), 10)
      : 14;

    const newSize = Math.max(8, currentSize + paso);
    span.style.fontSize = `${newSize}px`;
    span.appendChild(range.extractContents());
    range.insertNode(span);

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    selection.addRange(newRange);
  }


  copiarTexto() {
    const texto = this.editor.nativeElement.innerText;
    navigator.clipboard.writeText(texto).then(() => {
    });
  }

  copiarHTML() {
    const html = this.editor.nativeElement.innerHTML;

    const listener = (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/html', html);
      e.clipboardData?.setData('text/plain', this.editor.nativeElement.innerText);
      e.preventDefault();
    };

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  }

  increaseFont() {
    this.fontSize += 1;
    document.execCommand('fontSize', false, this.getExecFontSize());
  }

  decreaseFont() {
    if (this.fontSize > 1) {
      this.fontSize -= 1;
      document.execCommand('fontSize', false, this.getExecFontSize());
    }
  }

  getExecFontSize(): any {
    return Math.min(7, Math.max(1, Math.round(this.fontSize / 2)));
  }

  alignText(alignment: 'left' | 'center' | 'right') {
    document.execCommand('justify' + alignment.charAt(0).toUpperCase() + alignment.slice(1), false);
  }

  clickTools(id: string) {
    this.onClickTools.emit(id);
  }


  abrirModalTabla() {
    const modalElement = document.getElementById('modalTableid');
    if (modalElement) {
      const myModal = new Modal(modalElement);
      myModal.show();
    }
  }

  cerrarModalTabla() {
    this.mostrarModalTabla = false;
  }

  insertarTabla() {
    // const htmlTabla = this.generateTable(this.filas, this.columnas);
    // document.execCommand('insertHTML', false, htmlTabla);
    // this.cerrarModalTabla();
  }

  generateTable2(rows: number, cols: number): string {
    let thead = '<thead class="table-dark"><tr>';
    for (let c = 0; c < cols; c++) {
      thead += `<th>Col ${c + 1}</th>`;
    }
    thead += '</tr></thead>';

    let tbody = '<tbody>';
    for (let r = 0; r < rows; r++) {
      tbody += '<tr>';
      for (let c = 0; c < cols; c++) {
        tbody += `<td>\u200B</td>`;
      }
      tbody += '</tr>';
    }
    tbody += '</tbody>';

    return `<table class="table">${thead}${tbody}</table>`;
  }


  activarEdicionR(event: MouseEvent) {

    event.preventDefault();
    if (window.electron && window.electron.ipcRenderer) {
      console.log("CLICK")
      const toggleButton = document.getElementById('tableIdView')!;
      const dropdown = new Dropdown(toggleButton);
      dropdown.toggle();
    }
  }
}
