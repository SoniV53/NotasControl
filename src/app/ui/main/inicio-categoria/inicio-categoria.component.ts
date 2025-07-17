import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ConfiguracionPageComponent } from '../configuracion-page/configuracion-page.component';
import { Carpeta } from '../../../model/CategoriaCarpetasModel';

@Component({
  selector: 'inicio-categoria',
  templateUrl: './inicio-categoria.component.html',
  styleUrl: './inicio-categoria.component.scss'
})
export class InicioCategoriaComponent extends ConfiguracionPageComponent implements OnInit {
  carpetas: any[] = [];
  carpeta: Carpeta | null = null;
  requestData: any = {};
  categoriaId: number = 0;

  async ngOnInit() {
    await this.route.queryParams.subscribe(params => {
      const categoriaId = params['categoriaId'];
      this.categoriaId = categoriaId;
      console.log(categoriaId)
    });

    this.selectorSer.listadoCarpetas$.subscribe(async data => {
      this.carpetas = data;
      this.carpeta = null;
    })
  }

  ondbClickFiles(event: any) {
    this.selectorSer.setItemSeleccionId({ id: event.id, tipo: 1 })
    this.router.navigate(['/inicio']);
    this.selectorSer.clearHistorial();
    this.selectorSer.addCarpeta(event);
  }

  onClickFiles(event: any) {
    this.carpeta = event;
  }

  async crearCarpeta(value: any) {
    console.log(value)
    try {
      if (this.categoriaId) {
        const res = await this.electron.crearCarpeta(value.nombre, null, this.categoriaId);
        let carp: Carpeta = {
          id: res?.lastInsertRowid,
          nombre: value.nombre,
          fechaCreacion: ''
        }
        this.selectorSer.agregarCarpetaCategoria(this.categoriaId, carp);
        value.nombre = '';
        const carpeta = this.myApp.listadoCategoria.find(res => res.id == this.categoriaId)?.carpetas;
        this.selectorSer.clearListadoCarpetas();
        this.selectorSer.setListadoCarpetas(carpeta || [])
      }
    } catch (error) {
      console.error('Error al gaurdar carpeta:', error);
    }
  }

}
