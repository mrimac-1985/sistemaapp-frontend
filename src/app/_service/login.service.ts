import { SesionService } from './sesion.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private sesionService: SesionService
  ) { }


  estaLogueado() {
    let token = sessionStorage.getItem("login");
    return token != null;
  }


  cerrarSesion(nidSesion : number) {
      
    this.sesionService.cerrarSesion(nidSesion);

    sessionStorage.clear();
    this.router.navigate(['login']);

    
  
  }

 
}
