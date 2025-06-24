import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPageComponent } from './ui/main/inicio-page/inicio-page.component';
import { ConfiguracionesComponent } from './ui/configuraciones/configuraciones.component';
import { HomeComponent } from './ui/main/home/home.component';

const routes: Routes = [
  { path: 'inicio', component: InicioPageComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'carpetas', component: CarpetasComponent },
  // { path: 'articulos', component: ArticulosComponent },
   { path: 'configuracion', component: ConfiguracionesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
