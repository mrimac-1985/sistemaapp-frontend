import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AreaComponent } from './view/area/area.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { MenuComponent } from './view/menu/menu.component';
import { ModuloComponent } from './view/modulo/modulo.component';
import { Not403Component } from './view/not403/not403.component';
import { Not404Component } from './view/not404/not404.component';
import { OperadorComponent } from './view/operador/operador.component';
import { ParametroComponent } from './view/parametro/parametro.component';
import { PerfilComponent } from './view/perfil/perfil.component';
import { RolComponent } from './view/rol/rol.component';
import { SedeComponent } from './view/sede/sede.component';
import { UsuarioComponent } from './view/usuario/usuario.component';
import { EliminarDialogComponent } from './view/usuario/eliminar-dialog/eliminar-dialog.component';
import { UsuarioDialogComponent } from './view/usuario/usuario-dialog/usuario-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgProgressModule } from 'ngx-progressbar';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DialogCerrarsesionComponent } from './view/dialog-cerrarsesion/dialog-cerrarsesion.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { ValidatorService } from './util/ValidatorService';

@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    ModuloComponent,
    Not403Component,
    Not404Component,
    OperadorComponent,
    ParametroComponent,
    PerfilComponent,
    RolComponent,
    SedeComponent,
    UsuarioComponent,
    EliminarDialogComponent,
    UsuarioDialogComponent,
    DialogCerrarsesionComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    PdfViewerModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgProgressModule.withConfig({
      spinnerPosition: "right",
      color: "#ff0000"
    }),
    NgProgressHttpModule
  ],
  providers: [ValidatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }