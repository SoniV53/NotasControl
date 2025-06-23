import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPageComponent } from './ui/main/inicio-page/inicio-page.component';
import { ConfiguracionesComponent } from './ui/configuraciones/configuraciones.component';

const routes: Routes = [
  { path: 'inicio', component: InicioPageComponent },
  // { path: 'carpetas', component: CarpetasComponent },
  // { path: 'articulos', component: ArticulosComponent },
   { path: 'configuracion', component: ConfiguracionesComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
