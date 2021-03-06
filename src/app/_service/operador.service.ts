import { Operador } from './../_model/operador'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OperadorDto } from '../_model_dto/operadorDto';
import { Pageable } from '../_model/pageable';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {



  operadorCambio = new Subject<Operador[]>();
  mensajeCambio = new Subject<string>();
  listaCambio = new Subject<Operador[]>();
  pagina = new Pageable();
  url: string = `${environment.HOST}/operadores`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Operador[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Operador>(`${this.url}/${id}`);
  }

  registrar(operadordto: OperadorDto) {
    return this.http.post<any>(this.url+'/insertaroperador', operadordto);
  }

  modificar(operador: Operador) {
    return this.http.put(this.url, operador);
  }

  eliminar(id: number) {    
    return this.http.post<any>(this.url+'/eliminaroperador', id);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }


  listarPageableOpe(pagiable: Pageable) {    
    return this.http.post<any>(this.url+'/listaroperador', pagiable);
  }


  modificarOperador(operadorDto: OperadorDto) {
    return this.http.post<any>(this.url+'/modificarUsuarioOperador', operadorDto);
  }
  
  generarExcel(tiporeporte : string) {
    return this.http.post(`${this.url}/generarReporte`,tiporeporte, {
      responseType: 'blob'
    });
    
  }
  generarReporte(tiporeporte: string) {
    return this.http.post<any>(this.url+'/generarReporte',tiporeporte);
  }

  consultarImagenOperador(idoperador: number) {
    return this.http.post<any>(this.url+'/consultarimagenoperador',idoperador);
  }

  activarOperador(idOperador: number) {
    return this.http.post<any>(this.url+'/reactivaroperador', idOperador);
  }



}
