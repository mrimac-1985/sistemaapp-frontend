import { DashboardComponent } from './view/dashboard/dashboard.component';
import { MenuComponent } from './view/menu/menu.component';
import { PerfilComponent } from './view/perfil/perfil.component';
import { UsuariosComponent } from './view/usuarios/usuarios.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { HomeComponent } from './view/home/home.component';


const routes: Routes = [
  { path: 'reporte', component: DashboardComponent },  
  { path: 'usuario', component: UsuariosComponent },  
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
