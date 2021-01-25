import { Sede } from './../_model/sede'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pageable } from '../_model/pageable';

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
    return this.http.get<any>(this.url+'/listarsede');
  }

  listarPorId(id: number) {
    return this.http.get<Sede>(`${this.url}/${id}`);
  }

  registrar(sede: Sede) {
    return this.http.post<any>(this.url+'/insertarsede', sede);
  }

  modificar(sede: Sede) {
    return this.http.post<any>(this.url+'/actualizarsede', sede);
  }
 
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listarPageable(pageable : Pageable) {
    return this.http.post<any>(this.url+'/listarSedePage', pageable);
  }
  
  generarExcel(tiporeporte : string) {
    return this.http.post(`${this.url}/generarReporte`,tiporeporte, {
      responseType: 'blob'
    });
    
  }
}
