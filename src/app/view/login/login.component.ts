
import { SesionService } from './../../_service/sesion.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_service/login.service';
import { MenuService } from 'src/app/_service/menu.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/_service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  v_usaurio : string ;

  usuario: string;
  clave: string;


  
    constructor( 
    private loginService: LoginService,
    private menuService: MenuService,
    private router: Router,
    private usuarioServiec : UsuarioService,
    private sesionService : SesionService
    ) { }


  ngOnInit(): void {
  }


  iniciarSesion() {
 

    sessionStorage.setItem("login","logeado");

    console.log(this.usuario +' '+ this.clave );

    this.v_usaurio='MAX'; 
 
    /*LISTAR MENU DEL USUARIO*/   
      this.menuService.listarPorUsuario(this.v_usaurio).subscribe(respuestabase => {        
        this.menuService.menuCambio.next(respuestabase.data);
        this.router.navigate(['home']);
         });

     /*CARGAR DATOS DEL USAURIO */
     this.usuarioServiec.consutlarusuariosesion('MAX').subscribe(respuestabase =>{
      console.log('consulta persona'+respuestabase.data[0].scorreo);
          this.usuarioServiec.usuariosesion.next(respuestabase.data[0]);
     });


    /*INICIAR  SESION*/         
    this.sesionService.inicarSesion(this.v_usaurio).subscribe( respuestabase  =>{
      this.usuarioServiec.usuarioIdsesion.next(respuestabase.mensaje.toString());
      sessionStorage.setItem("idsesion",respuestabase.mensaje.toString());
      console.log('incia sesion->'+ respuestabase.mensaje.toString());  
    }
    ) ;
 


   }




}
