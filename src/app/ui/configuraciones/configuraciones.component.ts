import { Component, OnInit } from '@angular/core';
import { ConfiguracionPageComponent } from '../main/configuracion-page/configuracion-page.component';

@Component({
  selector: 'configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrl: './configuraciones.component.scss'
})
export class ConfiguracionesComponent extends ConfiguracionPageComponent implements OnInit {
  nombreCate = '';
  listadoCate: any[] = []

  ngOnInit(): void {

  }

  async crearNuevaCategoria() {
    try {
      await this.electron.crearCategoria(this.nombreCate);
      this.nombreCate = '';
      this.myApp.obtenerCategoria();
    } catch (error) {
      console.error(error);
    }
  }

}
