import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Articulo } from '../articulos/articulos.component';
import { ConfiguracionPageComponent } from '../../ui/main/configuracion-page/configuracion-page.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-articulo',
  templateUrl: './item-articulo.component.html',
  styleUrl: './item-articulo.component.scss'
})
export class ItemArticuloComponent extends ConfiguracionPageComponent implements OnInit {

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

  ngOnInit(): void {
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
    const par = JSON.stringify(item);
    this.router.navigate(['/detalle-articulo-page'], {
      state: { articulo: item }
    });
  }

  onChangeTextEmitter(event: any, item: Articulo) {
    item.title = event;
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
}
