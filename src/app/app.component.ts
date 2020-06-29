import { Component, OnInit } from '@angular/core';
import { Menu } from './_model/menu';
import { MenuService } from './_service/menu.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DialogCerrarsesionComponent } from './view/dialog-cerrarsesion/dialog-cerrarsesion.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from './_service/login.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Configuracion } from './_model/configuracion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  
  /*VARIABLE DEL MENU*/
  menus: Menu[];
  configuracion : Configuracion;

  /* VARIABLES DEL NAV */
  opened = true;
  over = "side";
  expandHeight = "42px";
  collapseHeight = "42px";
  displayMode = "flat";

  /*VARIABLES DEL LOADER */
  startedClass = false;
  completedClass = false;
  preventAbuse = false;

  isExpanded = false;
  element: HTMLElement;

 

  events = [];
 

  constructor(
   
    //public loginService: LoginService,
    private menuService: MenuService,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    public loginService: LoginService,
  ) {  }
  


  ngOnInit() {
    this.onStarted();
    this.cargaMenu();
    /*CARGA MENU*/
    this.menuService.menuCambio.subscribe(data => {        
      this.menus = data;      
    });


  }
  

  /** borrar este meteodo luego de la seguridad*/
  cargaMenu(){     
    this.menuService.listarPorUsuario('MAX').subscribe(data => {    
      this.menuService.menuCambio.next(data);  
    });  
  }




  /* CERRAR SESION*/
  cerrarSesion() {
 
    this.dialog
      .open(DialogCerrarsesionComponent, {
        width: "250px",
        data: "x",
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {     
          this.loginService.cerrarSesion();  
          this.router.navigate(["login"]);
        }
      });
  }


  /*METODOS DEL LOADER */
  onStarted() {
    this.startedClass = true;
    setTimeout(() => {
      this.startedClass = false;
    }, 800);
  }
  onCompleted() {
    this.completedClass = true;
    setTimeout(() => {
      this.completedClass = false;
    }, 800);
  }

  

}
