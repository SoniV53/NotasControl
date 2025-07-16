import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Articulo } from '../articulos/articulos.component';
import { ConfiguracionPageComponent } from '../../ui/main/configuracion-page/configuracion-page.component';

@Component({
  selector: 'app-titulo-editor',
  templateUrl: './titulo-editor.component.html',
  styleUrl: './titulo-editor.component.scss'
})
export class TituloEditorComponent extends ConfiguracionPageComponent implements AfterViewInit, OnChanges {

  @Input() texto: string = '';
  @Input() idEditor: string = '';
  @Input() numPage: number = 0;
  @Output() onChangeTextEmitter = new EventEmitter<string>();
  @Input() editandoTitulo: boolean = false;
  enterPressed = false;

  @ViewChild('tituloRef') tituloRef!: ElementRef<HTMLHeadingElement>;

  ngAfterViewInit() {
    this.pegarContenido();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pegarContenido();
  }

  activarEdicionTitulo() {
    if (this.tituloRef) {
      console.log("FOCUS EDITAR");
      const el = this.tituloRef.nativeElement;
      el.focus();

      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(el);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }

  activarEdicion(tituloEl: HTMLElement) {
    this.editandoTitulo = true;
    if (!tituloEl.innerText.trim()) {
      tituloEl.innerText = this.texto;
    }
  }
  activarEdicionR(tituloEl: HTMLElement, event: MouseEvent) {
    event.preventDefault();
    if (window.electron && window.electron.ipcRenderer) {
      this.editandoTitulo = true;
      if (!tituloEl.innerText.trim()) {
        tituloEl.innerText = this.texto;
      }
    }
  }



  pegarContenido() {
    if (!this.texto) {
      this.texto = '\u200B';
    }
    if (this.tituloRef?.nativeElement) {
      this.tituloRef.nativeElement.innerText = this.texto;
    }
  }

  guardarTitulo(tituloEl: HTMLElement) {
    console.log("Exit Focus");
    if (this.enterPressed) {
      this.enterPressed = false;
      return;
    }
    this.texto = tituloEl.innerText.trim();
    this.onChangeTextEmitter.emit(this.texto);
    this.editandoTitulo = false;
    if (!this.texto) {
      this.texto = '\u200B';
    }
  }

  onEnterKey(tituloEl: HTMLElement) {
    this.guardarTitulo(tituloEl);
    this.enterPressed = true;
  }

  onChangeEditor(tituloEl: HTMLElement) {
    this.texto = tituloEl.innerText.trim();
    //this.onChangeTextEmitter.emit(this.texto);
  }


}
