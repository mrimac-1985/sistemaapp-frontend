import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from '../_model/usuario';
import { environment } from 'src/environments/environment';
 
import { Pageable } from '../_model/pageable';
import { Operador } from '../_model/operador';
import { UsuarioSesion } from '../_model_dto/usuariosesion';
import { OperadorDto } from '../_model_dto/operadorDto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  usuarioCambio = new Subject<Usuario[]>();
  mensajeCambio = new Subject<string>();
  
  listaCambio = new Subject<Operador[]>();
  cantidadDatasource = new Subject<number>();

  usuariosesion = new Subject<UsuarioSesion>();

  usuarioIdsesion = new Subject<String>();
  
  url: string = `${environment.HOST}/usuarios`;

  pagina = new Pageable();
  
  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Usuario[]>(this.url);
  }

  registrar(usuario: OperadorDto){
    return this.http.post(this.url, usuario);
  }

  modificar(operadordto: OperadorDto){

    return this.http.post<any>(this.url+'/modificarUsuarioOperador', operadordto);
  }
  
  eliminar(id : number){
    return this.http.delete(`${this.url}/${id}`);
  }

  listarPorId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  listarPageable(p: number, s: number) {
    //return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
    this.pagina.pageNumber = p *s ;
    this.pagina.pageSize = s;
    console.log(p +' - '+s)
    return this.http.post<any>(this.url+'/listarUsuario', this.pagina);
  }
 
  consultarUsuario(usuario: string) {
    return this.http.get(`${this.url}/${usuario}`, {
      responseType: 'blob'
    });
  }

  generarExcel(tiporeporte : string) {
    return this.http.post(`${this.url}/generarReporte`,tiporeporte, {
      responseType: 'blob'
    });
    
  }

  consutlarusuariosesion(usuario: string) {
    return this.http.post<any>(this.url+'/consultaUsuariosesion', usuario);
  }

}
