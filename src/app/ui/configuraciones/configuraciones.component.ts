import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionPageComponent } from '../main/configuracion-page/configuracion-page.component';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrl: './configuraciones.component.scss'
})
export class ConfiguracionesComponent extends ConfiguracionPageComponent implements OnInit {
  nombreCate = '';
  listadoCate: any[] = []

  selectedFilePath: string = '';

  ngOnInit(): void {
    this.selectedFilePath = this.selectorSer.selectedFilePath;
  }

  onChange(event: any) {
    console.log(event);
    this.selectorSer.selectedFilePath = event.data;
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
      this.mensajeToast('Se limpio correctamente');
    } catch (error) {
      console.log(error);
    }
  }

  async imporExporAtion(isImportar: boolean) {
    if (!this.selectedFilePath) return;
    if (!isImportar) {
      this.electron.exportarBaseDatos(this.selectedFilePath).then(res => {
        this.mensajeToast(res?.message);
      })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      this.messageImportar(() => {
        this.electron.importarBaseDatos(this.selectedFilePath);
      })
    }
  }



}
