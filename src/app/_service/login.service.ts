import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router
  ) { }


  estaLogueado() {
    let token = sessionStorage.getItem("login");
    return token != null;
  }


  cerrarSesion() {
  
      sessionStorage.clear();
      this.router.navigate(['login']);
  
  }

 
}
