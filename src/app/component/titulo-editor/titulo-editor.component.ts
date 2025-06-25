import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Articulo } from '../articulos/articulos.component';

@Component({
  selector: 'app-titulo-editor',
  templateUrl: './titulo-editor.component.html',
  styleUrl: './titulo-editor.component.scss'
})
export class TituloEditorComponent implements AfterViewInit {
  @Input() texto: string = '';
  @Input() articulo: Articulo | null = null;
  @Output() onChangeTextEmitter = new EventEmitter<string>();
  editandoTitulo = false;

  @ViewChild('tituloRef') tituloRef!: ElementRef;

  ngAfterViewInit() {
    if (!this.texto) {
      this.texto = '\u200B';
    }
    if (this.tituloRef?.nativeElement) {
      this.tituloRef.nativeElement.innerText = this.texto;
    }
  }

  activarEdicion(tituloEl: HTMLElement) {
    this.editandoTitulo = true;
    if (!tituloEl.innerText.trim()) {
      tituloEl.innerText = this.texto;
    }
  }

  guardarTitulo(tituloEl: HTMLElement) {
    this.texto = tituloEl.innerText.trim();
    this.onChangeTextEmitter.emit(this.texto);
    this.editandoTitulo = false;
    if (!this.texto) {
      this.texto = '\u200B';
    }
  }

  onChangeEditor(tituloEl: HTMLElement) {
    this.texto = tituloEl.innerText.trim();
    if (this.articulo) {
      this.articulo.isChange = this.texto != this.articulo?.title;
    }
    this.onChangeTextEmitter.emit(this.texto);
  }
}
