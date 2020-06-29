import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Menu } from '../_model/menu';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  url: string = `${environment.HOST}/menus`;   

  menuCambio = new Subject<Menu[]>();
   

  listaCambio = new Subject<Menu[]>();
  mensajeCambio = new Subject<string>();


  constructor(private http: HttpClient) { }

 
  listarPorUsuario(nombre: string) { 
    return this.http.post<Menu[]>(`${this.url}/usuario`, nombre);
  }


  listarMenu(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`); //&sort=nombre
  }


}
