import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ConfiguracionPageComponent } from '../configuracion-page/configuracion-page.component';

@Component({
  selector: 'inicio-categoria',
  templateUrl: './inicio-categoria.component.html',
  styleUrl: './inicio-categoria.component.scss'
})
export class InicioCategoriaComponent extends ConfiguracionPageComponent implements OnInit {
  carpetas: any[] = [];
  requestData: any = {};
  categoriaId: number = 0;

  async ngOnInit() {
    await this.route.queryParams.subscribe(params => {
      const categoriaId = params['categoriaId'];
      this.categoriaId = categoriaId;
    });

    this.selectorSer.listadoCarpetas$.subscribe(async data => {
      if (data) {
        this.carpetas = data;
      }
    })
  }

  onClickFiles(event: any) {
    this.selectorSer.setItemSeleccionId({ id: event.id, tipo: 1 })
    this.router.navigate(['/inicio']);
    this.selectorSer.clearHistorial();
    this.selectorSer.addCarpeta(event);
  }

  async crearCarpeta(value: any) {
    try {
      if (this.categoriaId) {
        await this.electron.crearCarpeta(this.requestData.nombre, null, this.categoriaId);
        await this.myApp.obtenerCategoria();
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
