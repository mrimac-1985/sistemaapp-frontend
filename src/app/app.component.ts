import { ImagenConver } from './util/imagen';
import { UsuarioSesion } from './_model_dto/usuariosesion';
import { UsuarioService } from './_service/usuario.service';
import { Component, OnInit, ɵConsole } from '@angular/core';
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
import { DomSanitizer } from '@angular/platform-browser';
import { SesionService } from './_service/sesion.service';

 

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
  opened :boolean = true;
  over : string= "side";
  expandHeight : string= "42px";
  collapseHeight: string = "42px";
  displayMode : string = "flat";

  
  /*VARIABLES DEL LOADER */
  startedClass = false;
  completedClass = false;
  preventAbuse = false;

  isExpanded = false;
  element: HTMLElement;

 idSesion: string ='' ;

  events = [];

  usuariosesion : UsuarioSesion;

  imagenusuario: any;
  imagenEstado: boolean = false;

  idsesion :string;

  constructor(
   
    //public loginService: LoginService,
    private menuService: MenuService,
    public usuarioServiec : UsuarioService,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    public loginService: LoginService,
    private sanitization: DomSanitizer,
    private sesionservicio: SesionService
  ) {  

    
  }
  

  

  ngOnInit() {

    this.cargarParametros();
    this.onStarted();
    // this.cargarVariablesReactivas();


    this.usuariosesion = new UsuarioSesion();
 

    /*CARGA MENU*/
    this.menuService.menuCambio.subscribe(respuesta => {  
      this.menus = respuesta;         
    });

    /*CARGAR USUARIO SESION */
    this.usuarioServiec.usuariosesion.subscribe(data=> {
      this.usuariosesion = data;   

      if(data.ximagen !=null){
        this.convertir(data.ximagen);
      }   else {
        this.imagenusuario = null;
        this.imagenEstado = false;  
      }
      
    }); 
    
    /*CARGAR ID SESION*/
    this.usuarioServiec.usuarioIdsesion.subscribe(data=> {
      this.idsesion  = data.toString();       
    }); 
  
    
 

  }
  
  ngOnDestroy(): void{
     
    this.sesionservicio.cerrarSesion(Number(sessionStorage.getItem('idsesion'))).subscribe();
  }


  /** borrar este meteodo luego de la seguridad*/
  cargarVariablesReactivas(){ 

    this.idsesion = sessionStorage.getItem("idsesion") as string;;
  
      this.menuService.listarPorUsuario('MAX').subscribe(respuestabase => {  
      console.log('carga menu');
      this.menuService.menuCambio.next(respuestabase.data);  
      
    });  

    // this.usuarioServiec.consutlarusuariosesion('MAX').subscribe(data =>{
    //   console.log('consulta persona');
    //   console.log(data.scorreo);
    //   console.log(data.snombre);
    //   //console.log(data.ximagen);
    //   this.usuarioServiec.usuariosesion.next(data);
    //   this.convertir(data.ximagen);
      
    //   //let convertidor  = new ImagenConver(this.sanitization);
    //   //this.imagenusuario = convertidor.convertir(data.ximagen);

    // });

  }
 


  convertir(binario: any) {
    let reader = new FileReader();
    reader.readAsDataURL(this.b64toBlob(binario, 'image/png', 512));
    reader.onloadend = () => {
      let base64 = reader.result;
      this.sanar(base64);
    }
  }

  sanar(base64: any) {

    this.imagenusuario = this.sanitization.bypassSecurityTrustResourceUrl(base64);
    this.imagenEstado = true;

  }


  b64toBlob(b64Data: string, contentType: string, sliceSize: number) {
    contentType = contentType || 'image/png';
    sliceSize = sliceSize || 512;
  
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
  
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
    
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }
    
      var byteArray = new Uint8Array(byteNumbers);
    
      byteArrays.push(byteArray);
    }
  
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }


  dataURLtoBlob(dataURL: string) {
    // Decode the dataURL   
    var binary = atob(dataURL.split(',')[1]);
    // Create 8-bit unsigned array
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    // Return our Blob object
    return new Blob([new Uint8Array(array)], { type: 'image/png' });
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
          this.loginService.cerrarSesion( Number(sessionStorage.getItem("idsesion")));  
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


  cargarParametros(){
    this.idSesion = sessionStorage.getItem("idsesion")as string;;

  }

  

}
