import { Component, OnInit } from '@angular/core';
import { ConfiguracionPageComponent } from '../main/configuracion-page/configuracion-page.component';
import { Articulo } from '../../component/articulos/articulos.component';

@Component({
  selector: 'detalle-articulo-page',
  templateUrl: './detalle-articulo-page.component.html',
  styleUrl: './detalle-articulo-page.component.scss'
})
export class DetalleArticuloPageComponent extends ConfiguracionPageComponent implements OnInit {

  articulo: Articulo = {
    id: 0,
    title: '',
    ocultar: false,
    content: '',
    created_at: ''
  }


  ngOnInit(): void {
    const articulo = history.state.articulo;
    this.articulo = articulo;
    console.log(articulo);
  }

  onEliminarArticulo(event: any) {
    if (event) {
      this.messageEliminar(() => {
        this.electron.eliminarArticulo(event).then(() => {
          this.location.back();
        });
      })
    }
  }
}
