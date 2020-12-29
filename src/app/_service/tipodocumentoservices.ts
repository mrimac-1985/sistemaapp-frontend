import { TipoDocumento } from './../_model/tipodocumento';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";



@Injectable({
    providedIn: 'root'
  })
export class TipoDocumentoService {



    url: string = `${environment.HOST}/tipodocumentos`;

    constructor(private http : HttpClient) {    }

    listar(){
        return this.http.get<any>(this.url+'/listartipodocumento');
      }

 

}