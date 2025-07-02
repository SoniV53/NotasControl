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

    this.selectorSer.listadoCategoria$.subscribe(async data => {
      if (data) {
        this.listadoCategoria = data;
        await this.obtenerHistorial();
      }
    })
  }


  async obtenerHistorial() {
    try {
      this.loading = true;
      const historial: any = await this.electron.obtenerHistorial();
      if (historial) {
        const hist = historial[0];
        if (hist?.tipo === 'categoria') {
          this.selectorMenuPint(this.listadoCategoria, hist.key, 0);
          this.router.navigate(['/inicio-categoria'],
            {
              queryParams: {
                categoriaId: hist.key,
              }
            }
          );
        } else {
          const historialList: any[] = await this.electron.obtenerHistorialCarpetas();
          if (historialList?.length > 0) {
            const parcer = historialList.map(res => ({
              id: res.folder_id,
              nombre: res.name,
              fechaCreacion: res.created_at
            }));
            this.pintItemMenu(parcer[0].id, 1);
            this.selectorSer.clearHistorial();
            this.selectorSer.setHistorial(parcer);
            this.router.navigate(['/inicio']);
          }
        }
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
