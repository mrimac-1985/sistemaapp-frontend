import { Sesion } from './../_model/sesion'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SesionService {


  sesionCambio = new Subject<Sesion[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/sesiones`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Sesion[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Sesion>(`${this.url}/${id}`);
  }

  registrar(sesion: Sesion) {
    return this.http.post(this.url, sesion);
  }

  modificar(sesion: Sesion) {
    return this.http.put(this.url, sesion);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  inicarSesion(usaurio: string) {
    return this.http.post<any>(this.url+'/inciarsesion', usaurio);
  }

  cerrarSesion(usaurio: number) {
    return this.http.post(this.url+'/cerrarsesion', usaurio);
  }
 

}
