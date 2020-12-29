import { Injectable } from '@angular/core';
import { Parametro } from '../_model/parametro';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  parametroCambio = new Subject<Parametro[]>();
  mensajeCambio = new Subject<string>();
  listaCambio = new Subject<Parametro[]>();

  url: string = `${environment.HOST}/parametros`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Parametro[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Parametro>(`${this.url}/${id}`);
  }

  registrar(parametro: Parametro) {
    return this.http.post(this.url, parametro);
  }

  modificar(parametro: Parametro) {
    return this.http.put(this.url, parametro);
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
