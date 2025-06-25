import { Component, OnInit } from '@angular/core';
import { ConfiguracionPageComponent } from '../main/configuracion-page/configuracion-page.component';
import Swal from 'sweetalert2';

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
      await this.electron.crearCategoria(this.nombreCate, false);
      this.nombreCate = '';
      this.myApp.obtenerCategoria();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Nombre ya existente",
        icon: "error",
        draggable: true
      });
    }
  }

  async limpiarHistorial() {
    try {
      await this.electron.limpiarHistorialCarpetas();
    } catch (error) {
      console.log(error);
    }
  }

}
