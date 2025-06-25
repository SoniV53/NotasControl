import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ElectronService } from '../../../../electron/services/electron.service';
import Swal from 'sweetalert2';
declare var bootstrap: any;
@Component({
  selector: 'crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrl: './crear-articulo.component.scss'
})
export class CrearArticuloComponent {
  @Input() folderId: number | null = null;
  @Output() onClickAction = new EventEmitter<any>();
  @Input() modalId: string = 'dynamicModal';
  @Input() title: string = 'Formulario';

  titulo: string = '';
  contenido: string = '';

  constructor(private electron: ElectronService) { }

  async crearArticulo() {
    if (!this.folderId || !this.contenido) {
      Swal.fire({
        title: "Faltan datos!",
        icon: "error",
        draggable: true
      });
      return;
    }
    try {
      await this.electron.crearArticulo(this.folderId, this.titulo, this.contenido,false);

      if (this.onClickAction) {
        this.onClickAction.emit();
      }
      this.openClose();
    } catch (err) {
      console.error('Error al crear artículo:', err);
    }
  }

  cancelar() {
    this.openClose()
  }

  openClose() {
    this.titulo = '';
    this.contenido = '';
  }

  onChangeText(event: any) {
    console.log(event)
    if (event) {
      this.contenido = event;
    }
  }
}
