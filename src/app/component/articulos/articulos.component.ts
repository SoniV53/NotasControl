import { Component, Input, OnInit } from '@angular/core';
import { ElectronService } from '../../../../electron/services/electron.service';
import { ConfiguracionPageComponent } from '../../ui/main/configuracion-page/configuracion-page.component';

export interface Articulo {
  id: number;
  title: string;
  content: string;
  created_at: string;
}


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.scss'
})
export class ArticulosComponent extends ConfiguracionPageComponent {
  @Input() articulos: Articulo[] = [];


  ngOnInit(): void { }

  eliminarArticulo(id: number) {
    this.messageEliminar(() => {
      this.electron.eliminarArticulo(id).then(() => {
        this.articulos = this.articulos.filter(a => a.id !== id);
      });
    })
  }

}
