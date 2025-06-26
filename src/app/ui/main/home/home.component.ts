import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfiguracionPageComponent } from '../configuracion-page/configuracion-page.component';
import { Carpeta, CategoriaCarpetas } from '../../../model/CategoriaCarpetasModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends ConfiguracionPageComponent implements OnInit, AfterViewInit {

  listadoCategoria: CategoriaCarpetas[] = []
  loading: boolean = true;

  ngAfterViewInit(): void {

  }


  async ngOnInit() {
    await this.obtenerHistorial();
    this.selectorSer.listadoCategoria$.subscribe(async data => {
      if (data) {
        this.listadoCategoria = data;
      }
    })
  }


  async obtenerHistorial() {
    try {
      this.loading = true;
      const historialList: any[] = await this.electron.obtenerHistorialCarpetas();
      if (historialList?.length > 0) {
        const parcer = historialList.map(res => ({
          id: res.folder_id,
          nombre: res.name,
          fechaCreacion: res.created_at
        }));
        this.selectorSer.clearHistorial();
        this.selectorSer.setHistorial(parcer);
        this.router.navigate(['/inicio']);
        console.log("HISTORIAL: " + JSON.stringify(parcer))
      }
      this.loading = false;

    } catch (error) {
      console.log(error);
    }
  }

  changeTextEmitter(event: any) {
    if (event.value && event.id) {
      this.selectorSer.actualizarNombreCategoria(event.id, event.value);
    }
  }
}
