import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaComponent } from './view/area/area.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { MenuComponent } from './view/menu/menu.component';
import { ParametroComponent } from './view/parametro/parametro.component';
import { PerfilComponent } from './view/perfil/perfil.component';
import { SedeComponent } from './view/sede/sede.component';
import { UsuarioComponent } from './view/usuario/usuario.component';

const routes: Routes = [
  { path: 'reporte', component: DashboardComponent },  
  { path: 'usuario', component: UsuarioComponent },
  { path: 'sede', component: SedeComponent},
  { path: 'area', component: AreaComponent},
  { path: 'parametro', component: ParametroComponent},  
  { path: 'perfil', component: PerfilComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
