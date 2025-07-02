import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from '../../electron/services/electron.service';
import { Carpeta, CategoriaCarpetas } from './model/CategoriaCarpetasModel';
import { SelectorServiceService } from './providers/selector-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  listadoCategoria: CategoriaCarpetas[] = []
  listadoCate: any[] = []
  idCategoria: number = 0;
  formFields = [
    { type: 'text', placeholder: 'Nombre *', model: 'nombre', requiered: true },
  ];
  requestData: any = {};
  modal: any;
  textoCarpeta: any = {};

  constructor(private electron: ElectronService, public selectorSer: SelectorServiceService, private router: Router) { }

  ngAfterViewInit() {
    const modalEl = document.getElementById('carpetaCreateModal');
    if (modalEl) {
      this.modal = new bootstrap.Modal(modalEl);
    }
  }

  ngOnInit(): void {
    this.obtenerCategoria()
  }


  onClickActionCarpeta(event: any) {
    this.selectorSer.setItemSeleccionId({ id: event.id, tipo: 1 })
    this.router.navigate(['/inicio']);
    this.selectorSer.clearHistorial();
    this.selectorSer.addCarpeta(event);
  }

  clickCreate(event: any) {
    this.idCategoria = event;
    this.abrirModal();
  }

  async clickDelete(event: any) {
    this.idCategoria = event;
    await this.messageEliminar(async () => {
      this.eliminarCategoria()
    })
  }

  async eliminarCategoria() {
    try {
      await this.electron.eliminarCategoria(this.idCategoria);
      this.obtenerCategoria();
      Swal.fire({
        title: "Se elimino Correctamente!",
        icon: "success",
        draggable: true
      });
      this.router.navigate(['/home']);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Elimine Carpetas Antes",
        icon: "error",
        draggable: true
      });
    }
  }

  async obtenerCategoria() {
    try {
      this.clearListCategoria();
      this.selectorSer.limpiarCategorias();
      this.listadoCate = await this.electron.obtenerCategorias();

      for (const res of this.listadoCate) {
        const carpetas = await this.obtenerCarpeta(res.id);
        this.listadoCategoria.push({ id: res.id, categoria: res.name, carpetas: carpetas, ocultar: this.textoABoolean(res.ocultar) });
      }

      this.selectorSer.setListadoCategoria(this.listadoCategoria);
    } catch (error) {
      console.error(error);
    }
  }

  textoABoolean(valor: string): boolean {
    return valor?.toLowerCase() === 'true';
  }

  async obtenerCarpeta(id: any): Promise<Carpeta[]> {
    try {
      const carpetas: any[] = await this.electron.obtenerCarpetaCategoria(id);

      return carpetas.map(res => ({
        id: res.id,
        nombre: res.name,
        fechaCreacion: res.created_at
      }));
    } catch (error) {
      console.error('Error al obtener carpetas:', error);
      return [];
    }
  }


  clearListCategoria() {
    this.listadoCategoria = [];
  }

  async crearEspe(value: any) {
    try {
      if (this.idCategoria) {
        await this.electron.crearCarpeta(value.nombre, null, this.idCategoria);
        await this.obtenerCategoria();

        value.nombre = '';
      }
    } catch (error) {
      console.error('Error al gaurdar carpeta:', error);
    }
  }

  abrirModal() {
    this.modal.show();
  }

  cerrarModal() {
    this.modal.hide();
  }

  messageEliminar(callback: () => void) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  }

  async agregarHistorial(id:any,tipo:number) {
    try {
      this.electron.limpiarHistorial();
      const tipoText = tipo == 0 ? 'categoria' : 'carpeta'
      this.electron.agregarHistorial(id, tipoText);
      
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
   // this.agregarHistorial();
  }

}
