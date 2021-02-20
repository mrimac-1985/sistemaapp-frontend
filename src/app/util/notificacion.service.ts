import { OperadorComponent } from './../view/operador/operador.component';

import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificacionComponent } from './notificacion/notificacion.component';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private sackbar: MatSnackBar ) { }
 

  ruta_exito :string = "../../../assets/iconos/ok.png";
  ruta_error :string = "../../../assets/iconos/error.png";
  ruta_alera :string = "../../../assets/iconos/warning.png";

  
  mostrarNotificacion(mensaje: string , buttonTexto :string , tipoMensaje : 'error'|'exito'|'alerta' ){


    let ruta_imagen : string = tipoMensaje == 'exito' ? this.ruta_exito :  tipoMensaje == 'error' ? this.ruta_error :  tipoMensaje == 'alerta' ? this.ruta_alera :  '';

    this.sackbar.openFromComponent(NotificacionComponent, {
      data:{
        message:mensaje,
        buttonText:buttonTexto,
        type: tipoMensaje,
        rutaimage: ruta_imagen
      },
      duration : 5000,
      horizontalPosition:'right',
      verticalPosition:'bottom',
      panelClass: tipoMensaje
    });
  }





}
