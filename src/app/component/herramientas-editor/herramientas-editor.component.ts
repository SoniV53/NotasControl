import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-herramientas-editor',
  templateUrl: './herramientas-editor.component.html',
  styleUrl: './herramientas-editor.component.scss'
})
export class HerramientasEditorComponent {
  @ViewChild('editor') editor!: ElementRef;
  fontSize: number = 11;

  constructor() {
  }

  exec(cmd: string) {
    document.execCommand(cmd, false, '');
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

  onFocus() {
    console.log('El editor tiene foco');
  }

  onBlur() {
    console.log('El editor perdió el foco');
    const contenido = this.editor.nativeElement.innerHTML;
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
}
