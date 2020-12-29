import { SubMenu } from './submenu';
import { Modulo } from './modulo';

export class Menu {
    nidmenu: number;
    snombremenu: string;
    siconomenu: string;
    surl: string;
    bactivo: boolean;
    modulo: Modulo;
    dfechareg: Date;
    nidsesion: number;        
    submenu: SubMenu[];

}

