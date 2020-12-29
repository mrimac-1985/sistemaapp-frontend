import { Usuario } from './usuario'

export class Sesion {

    nidsesion: number;
    dfechainicio: Date;
    dfechafin: Date;
    ssistemaversion: string;
    bactivo: boolean;
    dfechareg: Date;
    usuario: Usuario;

}