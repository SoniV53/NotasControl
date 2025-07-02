import { Component, Input, OnInit } from '@angular/core';
import { ElectronService } from '../../../../electron/services/electron.service';
import { ConfiguracionPageComponent } from '../../ui/main/configuracion-page/configuracion-page.component';

export interface Articulo {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
  ocultar: boolean;
  isChange?: boolean;
}


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.scss'
})
export class ArticulosComponent extends ConfiguracionPageComponent implements OnInit {
  @Input() articulos: Articulo[] = [];

  ngOnInit(): void {
  }


  onEliminarArticulo(event: any) {
    if (event) {
      this.messageEliminar(() => {
        this.electron.eliminarArticulo(event).then(() => {
          this.articulos = this.articulos.filter(a => a.id !== event);
        });
      })
    }
  }
}
