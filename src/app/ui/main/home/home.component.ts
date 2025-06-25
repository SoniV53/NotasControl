import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ConfiguracionPageComponent } from '../configuracion-page/configuracion-page.component';
import { Carpeta } from '../../../model/CategoriaCarpetasModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends ConfiguracionPageComponent implements OnInit, AfterViewInit {


  ngAfterViewInit(): void {

  }


  ngOnInit(): void {
    this.obtenerHistorial();
  }

  async obtenerHistorial() {
    try {
      const historialList:any[] = await this.electron.obtenerHistorialCarpetas();
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
      
    } catch (error) {
      console.log(error);
    }
  }
}
