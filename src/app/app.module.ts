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
import { InputSelectorComponent } from './component/input-selector/input-selector.component';
import { ArticulosComponent } from './component/articulos/articulos.component';
import { CrearArticuloComponent } from './component/crear-articulo/crear-articulo.component';
import { CarpetasComponent } from './component/carpetas/carpetas.component';
import { HomeComponent } from './ui/main/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    InicioPageComponent,
    ConfiguracionPageComponent,
    ConfiguracionesComponent,
    AcordionItemComponent,
    ModalCreacionActualizacionComponent,
    InputSelectorComponent,
    ArticulosComponent,
    CrearArticuloComponent,
    CarpetasComponent,
    HomeComponent
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
