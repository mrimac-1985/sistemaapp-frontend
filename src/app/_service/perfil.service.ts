import { Perfil } from './../_model/perfil'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {


  perfilCambio = new Subject<Perfil[]>();
  mensajeCambio = new Subject<string>();
  listaCambio = new Subject<Perfil[]>();

  url: string = `${environment.HOST}/perfiles`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<any>(this.url+'/listarperfil');
  }

  listarPorId(id: number) {
    return this.http.get<Perfil>(`${this.url}/${id}`);
  }

  registrar(perfil: Perfil) {
    return this.http.post(this.url, perfil);
  }

  modificar(perfil: Perfil) {
    return this.http.put(this.url, perfil);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  generarExcel(tiporeporte : string) {
    return this.http.post(`${this.url}/generarReporte`,tiporeporte, {
      responseType: 'blob'
    });
    
  }

  listarPerfilUsuario(nidusuario: number) {
    return this.http.get<any>(`${this.url}/listarPerfilUsuario/${nidusuario}`);
  }

}
