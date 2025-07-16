import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Articulo } from '../articulos/articulos.component';
import { ConfiguracionPageComponent } from '../../ui/main/configuracion-page/configuracion-page.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-articulo',
  templateUrl: './item-articulo.component.html',
  styleUrl: './item-articulo.component.scss'
})
export class ItemArticuloComponent extends ConfiguracionPageComponent implements OnInit, OnChanges {
  //@ViewChild('editor') editor!: ElementRef;


  @Input() articulo: Articulo = {
    id: 0,
    title: '',
    content: '',
    ocultar: false,
    created_at: ''
  }

  @Input() isMin = false;
  @Input() isPage = false;

  @Output() onEliminarArticulo = new EventEmitter<number>();

  htmlContent:string = ''

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    //this.articulo = changes.articulo;
  }

  eliminarArticulo(id: number) {
    this.onEliminarArticulo.emit(id);
  }


  ocultarContent(item: Articulo) {
    if (this.isPage) {
      this.location.back();
      return;
    }
    item.ocultar = !item.ocultar;
    this.actualizarArticulo(item.ocultar);
  }

  maxiContent(item: Articulo) {
    item.ocultar = false;
    this.actualizarArticulo(item.ocultar);
    const par = JSON.stringify(item);
    this.router.navigate(['/detalle-articulo-page'], {
      state: { articulo: item }
    });
  }

  changeTextEmitter(event: any, item: Articulo) {
    item.title = event;
    this.electron.actualizarTituloArticulo(item.id, item.title)
  }

  datePrint(articulo: Articulo): Date {
    return new Date(articulo.updated_at ?? articulo.created_at);
  }

  async actualizarArticulo(ocultar: boolean) {
    if (!this.articulo) return;
    try {
      await this.electron.actualizarArticuloOcultar(this.articulo.id, ocultar);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Lo sentimos surgio algo inesperado",
        icon: "error",
        draggable: true
      });
    }
  }

  onAfterViewInit(event:any){
    this.htmlContent = event;
  }

  onClickTools(event: any) {
    switch (event) {
      case 'copy':
        this.copiarHTML();
        break;
      case 'copy2':
        this.copiarHTMLV2();
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
    const textoLimpio = this.htmlContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textoLimpio).then(() => {
        this.mensajeCopiar();
      }).catch(err => {
        console.error('Error copiando: ', err);
      });
    } else {
      const listener = (e: ClipboardEvent) => {
        e.clipboardData?.setData('text/plain', textoLimpio);
        e.preventDefault();
      };

      document.addEventListener('copy', listener);
      document.execCommand('copy');
      document.removeEventListener('copy', listener);

      this.mensajeCopiar();
    }
  }

  copiarHTMLV2() {
    const texto = this.htmlContent;
    const textoLimpio = texto.replace(/\u200B/g, '').replace(/\s+/g, ' ').trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textoLimpio).then(() => {
        this.mensajeCopiar();
      }).catch(err => {
        console.error('Error copiando: ', err);
      });
    } else {
      const listener = (e: ClipboardEvent) => {
        e.clipboardData?.setData('text/plain', textoLimpio);
        e.preventDefault();
      };

      document.addEventListener('copy', listener);
      document.execCommand('copy');
      document.removeEventListener('copy', listener);

      this.mensajeCopiar();
    }
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

  async guardarContenido() {
    if (!this.articulo) return;
    try {
      const htmlContent = this.htmlContent;
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

}
