import { Component } from '@angular/core';
import { ElectronService } from '../../../../../electron/services/electron.service';
import { AppComponent } from '../../../app.component';
import { SelectorServiceService } from '../../../providers/selector-service.service';

@Component({
  selector: 'app-configuracion-page',
  templateUrl: './configuracion-page.component.html',
  styleUrl: './configuracion-page.component.scss'
})
export class ConfiguracionPageComponent {
  
  constructor(
    public electron: ElectronService,
    public myApp: AppComponent,
    public selectorSer: SelectorServiceService) {

  }

  formatId(texto: string): string {
    return texto.replace(/[\s^*@:.,'\\/-]/g, '');
  }
}
