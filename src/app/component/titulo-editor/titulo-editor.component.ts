import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Articulo } from '../articulos/articulos.component';
import { ConfiguracionPageComponent } from '../../ui/main/configuracion-page/configuracion-page.component';

@Component({
  selector: 'app-titulo-editor',
  templateUrl: './titulo-editor.component.html',
  styleUrl: './titulo-editor.component.scss'
})
export class TituloEditorComponent extends ConfiguracionPageComponent implements AfterViewInit {
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
    this.updateTitle();
    if (!this.texto) {
      this.texto = '\u200B';
    }
  }

  onChangeEditor(tituloEl: HTMLElement) {
    this.texto = tituloEl.innerText.trim();
    this.onChangeTextEmitter.emit(this.texto);
  }

  async updateTitle() {
    if (!this.articulo) return;
    try {
      await this.electron.actualizarTituloArticulo(this.articulo?.id, this.texto)
    } catch (error) {
      console.log(error);
    }
  }
}
