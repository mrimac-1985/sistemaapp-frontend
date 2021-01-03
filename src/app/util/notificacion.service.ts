import { OperadorComponent } from './../view/operador/operador.component';

import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificacionComponent } from './notificacion/notificacion.component';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private sackbar: MatSnackBar ) { }


  mostrarNtificacion(mensaje: string , buttonTexto :string , tipoMensaje : 'error'|'exito'|'alerta' ){

    this.sackbar.openFromComponent(NotificacionComponent, {
      data:{
        message:mensaje,
        buttonText:buttonTexto,
        type: tipoMensaje
      },
      duration : 6000,
      horizontalPosition:'right',
      verticalPosition:'bottom',
      panelClass: tipoMensaje
    });
  }

}
