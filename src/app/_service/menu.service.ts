import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Menu } from '../_model/menu';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pageable } from '../_model/pageable';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  url: string = `${environment.HOST}/menus`;   

  menuCambio = new Subject<Menu[]>();
   

  listaCambio = new Subject<Menu[]>();
  mensajeCambio = new Subject<string>();
  //pagina = new Pageable();

  constructor(private http: HttpClient) { }

 
  listarPorUsuario(nombre: string) { 
    return this.http.post<any>(`${this.url}/menuusuario`, nombre);
  }


  listarMenu(p: number, s: number) {
   //return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`); //&sort=nombre
    //this.pagina.pageNumber = p;
   // this.pagina.pageSize = s;
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`); //&sort=nombre
  }

  generarExcel(tiporeporte : string) {
    return this.http.post(`${this.url}/generarReporte`,tiporeporte, {
      responseType: 'blob'
    });
    
  }

}
