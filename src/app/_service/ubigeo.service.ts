import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  url: string = `${environment.HOST}/ubigeos`;
  
  constructor(
    private http : HttpClient
  ) { }

  listarDepartamento(){
    return this.http.get<any>(this.url+'/listardepartamento');
  }

  listarProvincia(idprivincia : string){
    return this.http.post<any>(this.url+'/listarprovincia', idprivincia);
  }

  listarDistrito(iddistrito : string){
    return this.http.post<any>(this.url+'/listardistrito', iddistrito);
  }

  
  
}
