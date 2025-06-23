import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MenuLateralComponent } from './component/menu-lateral/menu-lateral.component';
import { InicioPageComponent } from './ui/main/inicio-page/inicio-page.component';
import { ConfiguracionPageComponent } from './ui/main/configuracion-page/configuracion-page.component';
import { ConfiguracionesComponent } from './ui/configuraciones/configuraciones.component';
import { AcordionItemComponent } from './component/acordion-item/acordion-item.component';
import { ModalCreacionActualizacionComponent } from './component/modal-creacion-actualizacion/modal-creacion-actualizacion.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    InicioPageComponent,
    ConfiguracionPageComponent,
    ConfiguracionesComponent,
    AcordionItemComponent,
    ModalCreacionActualizacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
