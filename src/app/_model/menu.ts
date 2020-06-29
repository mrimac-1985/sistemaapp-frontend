import { SubMenu } from './submenu';
import { Modulo } from './modulo';

export class Menu {
    nIdMenu: number;
    sNombreMenu: string;
    sIconoMenu: string;
    sUrl: string;
    bActivo: boolean;
    modulo: Modulo;
    dFechaReg: Date;
    nIdSesion: number;        
    subMenu: SubMenu[];

}

