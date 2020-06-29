import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_service/login.service';
import { MenuService } from 'src/app/_service/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usaurio : string ;

    constructor( private loginService: LoginService,
    private menuService: MenuService,
    private router: Router,) { }


  ngOnInit(): void {
  }


  iniciarSesion() {
 

    sessionStorage.setItem("login","logeado");

    console.log(sessionStorage.getItem("PRECIO_ENTRADA"));

    this.usaurio='MAX'; 
 
         this.menuService.listarPorUsuario(this.usaurio).subscribe(data => {
           
           this.menuService.menuCambio.next(data);
 
           this.router.navigate(['home']);
         });
       
 
   }


}
