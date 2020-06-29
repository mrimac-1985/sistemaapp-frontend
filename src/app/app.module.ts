import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';


import { NgProgressModule } from "ngx-progressbar";
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { UsuariosComponent } from './view/usuarios/usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogCerrarsesionComponent } from './view/dialog-cerrarsesion/dialog-cerrarsesion.component';
import { PerfilComponent } from './view/perfil/perfil.component';
import { MenuComponent } from './view/menu/menu.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuariosComponent,
    DialogCerrarsesionComponent,
    PerfilComponent,
    MenuComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PdfViewerModule,
    NgProgressModule.withConfig({
      spinnerPosition: "right",
      color: "#ff0000"
    }),
    NgProgressHttpModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
