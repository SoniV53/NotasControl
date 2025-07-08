import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ConfiguracionPageComponent } from '../configuracion-page/configuracion-page.component';
import { Carpeta, CategoriaCarpetas } from '../../../model/CategoriaCarpetasModel';
import { AtributosTitulo } from '../../../providers/atribuitos/EnumAtributos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends ConfiguracionPageComponent implements OnInit, AfterViewInit {

  listadoCategoria: CategoriaCarpetas[] = []
  filterListadoCategoria: CategoriaCarpetas[] = []
  modelSearch: string = '';
  loading: boolean = true;
  filterSelect = '';
  idItem = '';

  ngAfterViewInit(): void {

  }


  async ngOnInit() {

    this.selectorSer.listadoCategoria$.subscribe(async data => {
      if (data) {
        this.listadoCategoria = data;
        this.filterListadoCategoria = await this.filtrarCategoria(this.filterSelect);
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

  filtrarCategoria(tipo?: string): CategoriaCarpetas[] {
    const actual = this.listadoCategoria;

    return actual.filter(item => {
      const coincideCategoria = item.categoria.toLowerCase().includes(this.modelSearch.toLowerCase());

      if (!coincideCategoria) {
        return false;
      }

      if (!tipo) {
        return true;
      }

      if (item.attr && item.attr.length > 0) {
        return item.attr.some(attr => {
          if (attr.titulo === AtributosTitulo.VisibleMenu) {
            return tipo === 'show'
              ? attr.value === 'true'
              : attr.value === 'false';
          }
          return false;
        });
      }
      return false;
    });
  }

  async selectFilter(tipo: string) {
    this.filterSelect = tipo === this.filterSelect ? '' : tipo;
    this.filterListadoCategoria = this.filtrarCategoria(this.filterSelect);
    //await this.scrollToTopByIdEnd('mainCategoriasId')
  }

  onChange(event: any) {
    this.filterListadoCategoria = this.filtrarCategoria(this.filterSelect);
  }

  async onChangeHidden(event:any){
    this.idItem = event;
  }
}
