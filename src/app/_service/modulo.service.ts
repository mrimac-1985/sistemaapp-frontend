import { HttpClient } from '@angular/common/http'
import { Modulo } from './../_model/modulo'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  moduloCambio = new Subject<Modulo[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/modulos`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Modulo[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Modulo>(`${this.url}/${id}`);
  }

  registrar(modulo: Modulo) {
    return this.http.post(this.url, modulo);
  }

  modificar(modulo: Modulo) {
    return this.http.put(this.url, modulo);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }
  
}
