import { Pageable } from './../_model/pageable'
import { HttpClient } from '@angular/common/http'
import { Rol } from './../_model/rol'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {


  rolCambio = new Subject<Rol[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/roles`;

  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<any>(this.url+'/listarRol');
  }

  listarPorId(id: number){
    return this.http.get<Rol>(`${this.url}/${id}`);
  }

  registrar(rol: Rol) {
    return this.http.post(this.url, rol);
  }

  modificar(rol: Rol) {
    return this.http.put(this.url, rol);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listarPageable(pageable : Pageable) {
    return this.http.post<any>(this.url+'/listarRolPage', pageable); //&sort=nombre
  }
  
  listarRolUsuario(nidusuario: number) {
    return this.http.get<any>(`${this.url}/listarRolUsuario/${nidusuario}`);
  }

}
