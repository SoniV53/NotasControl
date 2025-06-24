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

  rastroCarpeta: Carpeta[] = [];
  articulos: Articulo[] = [];
  carpetas: Carpeta[] = [];

  requestData: any = {};
  isOpen = false;


  ngOnInit(): void {
    this.selectorSer.carpeta$.subscribe(c => {
      if (c) {
        this.rastroCarpeta = [];
        this.entrarEnCarpeta(c);
        this.carpeta = this.rastroCarpeta[0];
        this.viewportScroller.scrollToPosition([0, 0]);
        this.obtenerArticulos();
        this.obtenerFolderID();
      }
    });
  }

  irACarpeta(id: number, nivel: number) {
    this.rastroCarpeta = this.rastroCarpeta.slice(0, nivel + 1);
    this.electron.obtenerCarpetas(id);
    this.carpeta = this.rastroCarpeta[nivel];
    this.obtenerArticulos();
    this.obtenerFolderID();
  }

  entrarEnCarpeta(carpeta: Carpeta) {
    this.rastroCarpeta.push(carpeta);
    this.electron.obtenerCarpetas(carpeta.id);
  }

  async obtenerArticulos() {
    try {
      const articulos: any[] = await this.electron.obtenerArticulosPorCarpeta(this.carpeta?.id);
      this.articulos = articulos.map(res => ({
        id: res.id,
        title: res.title,
        content: res.content,
        created_at: res.created_at
      }));
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
  }

  accionFlotante(){
    this.isOpen = !this.isOpen
  }

  onClickClose(event:any){
    console.log(event);
    this.isOpen = event;
  }
}
