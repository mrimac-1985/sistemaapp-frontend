
import { SesionService } from './../../_service/sesion.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/_service/login.service';
import { MenuService } from 'src/app/_service/menu.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/util/ValidatorService';
import { NotificacionService } from 'src/app/util/notificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy{


  v_usaurio : string ;

  usuario: string;
  clave: string;

  formUsuario: FormGroup;

  
    constructor( 
    private loginService: LoginService,
    private menuService: MenuService,
    private router: Router,
    private usuarioServiec : UsuarioService,
    private sesionService : SesionService,
    private formBuilder : FormBuilder,
    public _validator: ValidatorService,
    private notificacion : NotificacionService
    ) {       
    }
  
    ngOnDestroy(): void {
    
      //sessionStorage.clear();
  }


  ngOnInit(): void {


  
    this.formUsuario = this.formBuilder.group({
      usuario:  new FormControl('MAX', [Validators.required] ) , 
      contraseña:  new FormControl('') 
    });
    
  }


  iniciarSesion() {
 

  if(this.formUsuario.valid){

    
 
  
      this.v_usaurio=this.formUsuario.value['usuario'];; 
  
      /*LISTAR MENU DEL USUARIO*/   
        this.menuService.listarPorUsuario(this.v_usaurio).subscribe(respuestabase => {

          console.log(respuestabase.data);
          
          if(respuestabase.data[0]!== undefined){

            sessionStorage.setItem("login","logeado");

                this.menuService.menuCambio.next(respuestabase.data);
                this.router.navigate(['home']);

              /*CARGAR DATOS DEL USAURIO */
              this.usuarioServiec.consutlarusuariosesion(this.v_usaurio).subscribe(respuestabase =>{
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
          }else{

            this.notificacion.mostrarNotificacion('Usuario no valido!!!','OK','error');

          }              


        });

    
  

  }




   }




}
