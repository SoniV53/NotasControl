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
import { HerramientasEditorComponent } from './component/herramientas-editor/herramientas-editor.component';
import { EditorFormatoComponent } from './component/editor-formato/editor-formato.component';
import { TituloEditorComponent } from './component/titulo-editor/titulo-editor.component';
import { DetalleArticuloPageComponent } from './ui/detalle-articulo-page/detalle-articulo-page.component';
import { ItemArticuloComponent } from './component/item-articulo/item-articulo.component';
import { TituloEditorCategoriaComponent } from './component/titulo-editor-categoria/titulo-editor-categoria.component';
import { NgxPrintModule } from 'ngx-print';
import { ItemMenuComponent } from './component/menu/item-menu/item-menu.component';
import { MenuLateralIzquierdaComponent } from './component/menu/menu-lateral-izquierda/menu-lateral-izquierda.component';
import { InicioCategoriaComponent } from './ui/main/inicio-categoria/inicio-categoria.component';
import { RightClickDirective } from './directive/RightClickDirective';

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
    HomeComponent,
    HerramientasEditorComponent,
    EditorFormatoComponent,
    TituloEditorComponent,
    DetalleArticuloPageComponent,
    ItemArticuloComponent,
    TituloEditorCategoriaComponent,
    ItemMenuComponent,
    MenuLateralIzquierdaComponent,
    InicioCategoriaComponent,
    RightClickDirective  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPrintModule 
  ],
  exports: [RightClickDirective],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
