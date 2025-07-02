import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfiguracionPageComponent } from '../../../ui/main/configuracion-page/configuracion-page.component';
import { Carpeta, CategoriaCarpetas, CATEGORIAS_DUMMY } from '../../../model/CategoriaCarpetasModel';
import Swal from 'sweetalert2';
import { ItemSeleccionado } from '../../../providers/selector-service.service';

@Component({
  selector: 'app-menu-lateral-izquierda',
  templateUrl: './menu-lateral-izquierda.component.html',
  styleUrl: './menu-lateral-izquierda.component.scss'
})
export class MenuLateralIzquierdaComponent extends ConfiguracionPageComponent implements OnInit, AfterViewInit {


  listadoCategoria: CategoriaCarpetas[] = []
  @Output() onClickActionCarpeta = new EventEmitter<Carpeta>()
  @Output() onClickCreate = new EventEmitter<any>()
  @Output() onClickEliminate = new EventEmitter<any>()

  isActive = true;
  nombreCate: string = '';
  itemSelectId: ItemSeleccionado | null = null;

  ngOnInit(): void {
    //this.listadoCategoria = CATEGORIAS_DUMMY;
    this.selectorSer.listadoCategoria$.subscribe(async data => {
       this.listadoCategoria = data || [];
    })
  }

  ngAfterViewInit(): void {
    this.selectorSer.itemSeleccionId$.subscribe(data => {
      if (data) {
        this.itemSelectId = data;
      }
    })

  }

  toggleSidebar() {
    this.isActive = !this.isActive;
  }

  clickActionCarpeta(event: Carpeta) {
    if (this.onClickActionCarpeta && event) {
      this.onClickActionCarpeta.emit(event);
    }
  }

  clickCreate(event: any) {
    if (this.onClickCreate && event) {
      this.onClickCreate.emit(event);
    }
  }

  clickDelete(event: any) {
    if (this.onClickEliminate && event) {
      this.onClickEliminate.emit(event);
    }
  }

  async goHome() {
    try {
      await this.electron.limpiarHistorial();
      await this.pintItemMenu(-1,-1);
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }

  changeTextEmitter(event: any, item: any, categoriaId: any) {
    if (event?.text && event?.tipo === 0) {
      this.selectorSer.actualizarNombreCategoria(item.id, event.text);
      this.electron.actualizarCategoria(item.id, event.text, item.ocultar);
    } else if (event?.text && event?.tipo === 1) {
      this.selectorSer.actualizarNombreCarpeta(categoriaId, item.id, event.text);
      this.electron.actualizarCarpeta(item.id, event.text);
    }
  }

  async clickItemCarpeta(item: any, length: any) {
    try {
      await this.electron.crearCarpeta('Carpeta ' + length, null, item?.id);
      await this.myApp.obtenerCategoria();

      const carpeta = this.listadoCategoria.find(res => res.id === item?.id)?.carpetas;
      this.selectorSer.clearListadoCarpetas();
      this.selectorSer.setListadoCarpetas(carpeta || [])
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Nombre ya existente",
        icon: "error",
        draggable: true
      });
    }
  }

  async crearNuevaCategoria() {
    try {
      await this.electron.crearCategoria('Categoria ' + this.listadoCategoria.length, false);
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

  validarSeleccionId(id: any, tipo: number): boolean {
    if (!this.itemSelectId) return false;
    return this.itemSelectId.id.toString() === id.toString() && this.itemSelectId.tipo === tipo;
  }

  async clickMore(event: any, item: CategoriaCarpetas) {
    item.ocultar = event;
    try {
      await this.electron.actualizarCategoria(item.id, item.categoria, item.ocultar);
    } catch (error) {
      console.error(error);
    }

  }

  clickItem(event: any, tipo: number) {
    this.selectorSer.setItemSeleccionId({ id: event.id, tipo: tipo })
    if (tipo === 1) {
      this.router.navigate(['/inicio']);
      this.selectorSer.clearHistorial();
      this.selectorSer.addCarpeta(event);
    } else {
      this.myApp.agregarHistorial(event.id, 0);
      this.selectorSer.clearListadoCarpetas();
      this.selectorSer.setListadoCarpetas(event.carpetas)
      this.router.navigate(['/inicio-categoria'],
        {
          queryParams: {
            categoriaId: event.id,
          }
        }
      );
    }
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    window.electron.ipcRenderer.invoke('mostrar-menu-contextual', {
      x: event.clientX,
      y: event.clientY
    });
  }

}
