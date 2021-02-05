import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperadorDto } from 'src/app/_model_dto/operadorDto';
import { OperadorService } from 'src/app/_service/operador.service';
import { UsuarioService } from 'src/app/_service/usuario.service';

@Component({
  selector: 'app-activar-usu-dialog',
  templateUrl: './activar-usu-dialog.component.html',
  styleUrls: ['./activar-usu-dialog.component.css']
})
export class ActivarUsuDialogComponent implements OnInit {

  nombreOperador :string ='';
  idOperador:number;


  constructor(
    private dialogo: MatDialogRef<ActivarUsuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data_dialog: OperadorDto,    
    private usuarioService : UsuarioService,
    private operadorServicio : OperadorService,
  ) { }

  ngOnInit(): void {
    this.nombreOperador= this.data_dialog.operador.snombre+ ' '+ this.data_dialog.operador.sapepaterno + ' '+this.data_dialog.operador.sapematerno;
    this.idOperador= this.data_dialog.operador.nidoperador;
  }

  cerrarDialogo(){
    this.dialogo.close(false);
  }

  activarOperador(){
    this.operadorServicio.activarOperador(this.idOperador).subscribe(RespuestaBase =>
    {     
        this.operadorServicio.mensajeCambio.next(RespuestaBase.mensaje);  
    })
    this.dialogo.close(true);
  }
}
