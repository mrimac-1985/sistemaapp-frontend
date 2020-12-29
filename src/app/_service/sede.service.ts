import { Sede } from './../_model/sede'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  sedeCambio = new Subject<Sede[]>();
  mensajeCambio = new Subject<string>();

  listaCambio = new Subject<Sede[]>();

  url: string = `${environment.HOST}/sedes`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Sede[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Sede>(`${this.url}/${id}`);
  }

  registrar(sede: Sede) {
    return this.http.post(this.url, sede);
  }

  modificar(sede: Sede) {
    return this.http.put(this.url, sede);
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
}
