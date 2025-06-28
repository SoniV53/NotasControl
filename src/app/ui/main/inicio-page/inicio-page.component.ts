import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionPageComponent } from '../configuracion-page/configuracion-page.component';
import { ElectronService } from '../../../../../electron/services/electron.service';
import { Carpeta } from '../../../model/CategoriaCarpetasModel';
import { Articulo } from '../../../component/articulos/articulos.component';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.scss'
})
export class InicioPageComponent extends ConfiguracionPageComponent implements OnInit {
  carpeta: Carpeta | null = null;
  loading: boolean = true;

  rastroCarpeta: Carpeta[] = [];
  articulos: Articulo[] = [];
  carpetas: Carpeta[] = [];

  requestData: any = {};
  isOpen = false;


  async ngOnInit() {
    this.selectorSer.historialCarpetas$.subscribe(async data => {
      this.loading = true;
      this.rastroCarpeta = data;
      const lastItem = this.rastroCarpeta[(this.rastroCarpeta.length - 1)]
      await this.entrarEnCarpeta(lastItem);
      this.carpeta = lastItem;
      this.viewportScroller.scrollToPosition([0, 0]);
      await this.obtenerArticulos();
      await this.obtenerFolderID();

      this.loading = false;

      this.agregarHistorial(data);
    })
  }

  irACarpeta(id: number, nivel: number) {
    this.rastroCarpeta = this.rastroCarpeta.slice(0, nivel + 1);
    this.selectorSer.setHistorial(this.rastroCarpeta);
    this.electron.obtenerCarpetas(id);
    this.carpeta = this.rastroCarpeta[nivel];
    this.obtenerArticulos();
    this.obtenerFolderID();
  }

  entrarEnCarpeta(carpeta: Carpeta) {
    if (carpeta) {
      this.electron.obtenerCarpetas(carpeta.id);
    }
  }

  async obtenerArticulos() {
    try {
      const articulos: any[] = await this.electron.obtenerArticulosPorCarpeta(this.carpeta?.id);
      this.articulos = articulos.map(res => ({
        id: res.id,
        title: res.title,
        content: res.content,
        ocultar: this.textoABoolean(res?.ocultar),
        created_at: res.created_at,
        updated_at: res.updated_at
      }));
      console.log(articulos);
    } catch (error) {
      console.log(error);
    }
  }

  async obtenerFolderID() {
    try {
      const carpetas: any[] = await this.electron.obtenerCarpetas(this.carpeta?.id);
      console.log(carpetas)

      this.carpetas = carpetas.map(res => ({
        id: res.id,
        nombre: res.name,
        fechaCreacion: res.created_at
      }));
    } catch (error) {
      console.log(error);
    }
  }

  onClickAction() {
    this.obtenerArticulos();
  }

  async crearCarpeta(value: any) {
    try {
      console.log(this.requestData)
      if (this.carpeta?.id) {
        await this.electron.crearCarpeta(this.requestData.nombre, this.carpeta?.id);
        this.obtenerFolderID();

      }
    } catch (error) {
      console.error('Error al gaurdar carpeta:', error);
    }
  }

  onClickFiles(event: any) {
    this.entrarEnCarpeta(event);
    let last = this.rastroCarpeta.length - 1;
    this.carpeta = this.rastroCarpeta[last];
    this.obtenerArticulos();
    this.obtenerFolderID();
    this.viewportScroller.scrollToPosition([0, 0]);
    this.selectorSer.addCarpeta(event);
  }

  async agregarHistorial(historialList: any[]) {
    try {
      if (historialList) {
        this.electron.limpiarHistorialCarpetas();
        historialList.forEach(async element => {
          this.electron.agregarHistorialCarpeta(element.id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  accionFlotante() {
    this.isOpen = !this.isOpen
  }

  onClickClose(event: any) {
    console.log(event);
    this.isOpen = event;
  }

  async crearArticulo() {
    if (!this.carpeta) return;
    try {
      await this.scrollToTopById('articulosComponenteId');
      await this.electron.crearArticulo(this.carpeta.id, '', '', false);
      this.obtenerArticulos();

    } catch (err) {
      console.error('Error al crear artículo:', err);
    }
  }

  
}
