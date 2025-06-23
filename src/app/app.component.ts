import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from '../../electron/services/electron.service';
import { Carpeta, CategoriaCarpetas } from './model/CategoriaCarpetasModel';
import { SelectorServiceService } from './providers/selector-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  listadoCategoria: CategoriaCarpetas[] = []
  listadoCate: any[] = []



  constructor(private electron: ElectronService, public selectorSer: SelectorServiceService) { }

  ngOnInit(): void {
    //this.obtenerCategoria()

    const categoriaConCarpetas = {
      id: 1,
      categoria: 'Documentación Técnica',
      carpetas: [
        {
          id: 1,
          nombre: 'API REST',
          descripcion: 'Notas y ejemplos sobre servicios RESTful',
          fechaCreacion: '2025-06-23',
        },
        {
          id: 2,
          nombre: 'Base de Datos',
          descripcion: 'Diagramas, sentencias y esquemas',
          fechaCreacion: '2025-06-22',
        },
        {
          id: 3,
          nombre: 'Frontend Angular',
          descripcion: 'Componentes, servicios y rutas',
          fechaCreacion: '2025-06-20',
        },
      ]
    };

    this.listadoCategoria.push(categoriaConCarpetas);
    this.listadoCategoria.push(categoriaConCarpetas);
  }


  onClickActionCarpeta(event: Carpeta) {
    console.log(event)
    this.selectorSer.setCarpeta(event);
  }

  clickCreate(event: any) {
    
  }

  clickDelete(event: any) {
   console.log(event)
  }

  async obtenerCategoria() {
    try {
      this.clearListCategoria();
      this.listadoCate = await this.electron.obtenerCategorias();
      this.listadoCate.map(res => {
        this.listadoCategoria.push({ id: res.id, categoria: res.name, carpetas: [] })
      })
    } catch (error) {
      console.error(error);
    }
  }

  clearListCategoria() {
    this.listadoCategoria = [];
  }
}
