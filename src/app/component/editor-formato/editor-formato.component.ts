import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Articulo } from '../articulos/articulos.component';
import { ConfiguracionPageComponent } from '../../ui/main/configuracion-page/configuracion-page.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editor-formato',
  templateUrl: './editor-formato.component.html',
  styleUrl: './editor-formato.component.scss'
})
export class EditorFormatoComponent extends ConfiguracionPageComponent implements AfterViewInit, OnChanges {

  @ViewChild('editor') editor!: ElementRef;
  @ViewChild('contenedor') contenedorRef!: ElementRef;
  mostrar = false;

  @Input() articulo: Articulo | null = null;
  @Input() isCreate: boolean = false;
  @Input() texto: string = '';
  @Output() onChangeTextEmitter = new EventEmitter<string>();


  ngAfterViewInit(): void {
    this.pegarContenido();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isCreate && this.texto) {
      this.editor.nativeElement.innerHTML = this.texto;
    }
  }

  async guardarContenido() {
    if (!this.articulo) return;
    try {
      const htmlContent = this.editor.nativeElement.innerHTML;
      await this.electron.actualizarArticulo(this.articulo.id, this.articulo.title, htmlContent, this.articulo.ocultar);
      this.articulo.isChange = false;
      this.articulo.content = htmlContent;
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Lo sentimos surgio algo inesperado",
        icon: "error",
        draggable: true
      });
    }
  }



  pegarContenido() {
    if (this.articulo) {
      this.editor.nativeElement.innerHTML = this.articulo.content;
    } else if (this.isCreate && this.texto) {
      this.editor.nativeElement.innerHTML = this.texto;
    }
  }

  onChangeEditor() {
    const htmlContent = this.editor.nativeElement.innerHTML;
    if (this.articulo) {
      this.articulo.isChange = htmlContent != this.articulo?.content;
    }
    this.texto = htmlContent;
    if (this.onChangeTextEmitter) {
      this.onChangeTextEmitter.emit(this.texto);
    }
  }

  onFocus() {
    this.mostrar = true;
    console.log('El editor tiene foco');
  }

  onBlur() {
    console.log('El editor perdió el foco');
    const contenido = this.editor.nativeElement.innerHTML;
    console.log('Contenido actual:', contenido);
    this.guardarContenido();
  }

  @HostListener('document:click', ['$event'])
  clickFuera(event: MouseEvent) {
    const clickedInside = this.contenedorRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.mostrar = false;
    }
  }

  copiarTexto() {
    const texto = this.editor.nativeElement.innerText;
    navigator.clipboard.writeText(texto).then(() => {
      this.mensajeCopiar();
    });
  }

  onClickTools(event: any) {
    switch (event) {
      case 'copy':
        this.copiarHTML();
        break;
      case 'save':
        this.guardarContenido();
        break;
      case 'print':
        this.imprimirPorId(this.formatId('printArticuloId' + this.articulo?.id));
        break;

      default:
        break;
    }
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

    this.mensajeCopiar();
  }


  mensajeCopiar() {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Texto Copiado!"
    });
  }


  imprimirPorId(id: string): void {
    const contenido = document.getElementById(id)?.innerHTML || '';
    try {
      // const printContent = document.getElementById(id);
      // const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
      // WindowPrt?.document.write(printContent?.innerHTML || '');
      // WindowPrt?.document.close();
      // WindowPrt?.focus();
      // WindowPrt?.print();
      // WindowPrt?.close();

      let originalContents = document.body.innerHTML;

      document.body.innerHTML = contenido;

      window.print();

      document.body.innerHTML = originalContents;
    } catch (error) {
      console.log(error);
    }

  }
}
