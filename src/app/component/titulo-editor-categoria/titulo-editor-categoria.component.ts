import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CategoriaCarpetas } from '../../model/CategoriaCarpetasModel';
import { ConfiguracionPageComponent } from '../../ui/main/configuracion-page/configuracion-page.component';

@Component({
  selector: 'app-titulo-editor-categoria',
  templateUrl: './titulo-editor-categoria.component.html',
  styleUrl: './titulo-editor-categoria.component.scss'
})
export class TituloEditorCategoriaComponent  extends ConfiguracionPageComponent{
  @Input() texto: string = '';
  @Input() categoria: CategoriaCarpetas | null = null;
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

  async guardarTitulo(tituloEl: HTMLElement) {
    if (this.categoria) {
      this.texto = tituloEl.innerText.trim();
      this.editandoTitulo = false;
      if (!this.texto) {
        this.texto = '\u200B';
      }

      this.categoria.categoria = this.texto;
      try {
        await this.electron.actualizarCategoria(this.categoria.id,this.texto,this.categoria.ocultar);
      } catch (error) {
        console.log(error)
      }
    }
    this.onChangeTextEmitter.emit(this.texto);
  }

  onChangeEditor(tituloEl: HTMLElement) {
    this.texto = tituloEl.innerText.trim();
    if (this.categoria) {
      this.categoria.categoria = this.texto;
    }
    //this.onChangeTextEmitter.emit(this.texto);
  }
}
