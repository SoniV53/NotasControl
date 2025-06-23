import { Component, OnInit } from '@angular/core';
import { ConfiguracionPageComponent } from '../configuracion-page/configuracion-page.component';
import { ElectronService } from '../../../../../electron/services/electron.service';
import { Carpeta } from '../../../model/CategoriaCarpetasModel';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.scss'
})
export class InicioPageComponent extends ConfiguracionPageComponent implements OnInit {
  carpeta: Carpeta | null = null;

  ngOnInit(): void {
    this.selectorSer.carpeta$.subscribe(c => this.carpeta = c);
  }


}
