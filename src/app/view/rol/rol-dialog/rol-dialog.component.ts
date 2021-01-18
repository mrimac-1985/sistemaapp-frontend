import { ValidatorService } from './../../../util/ValidatorService'
import { Rol } from './../../../_model/rol'
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rol-dialog',
  templateUrl: './rol-dialog.component.html',
  styleUrls: ['./rol-dialog.component.css']
})
export class RolDialogComponent implements OnInit {

  rol : Rol;

  /*boton */
  nombreboton: string;

  formrol : FormGroup;

  /*VARIABLES DE VALIDACION */
  val_snombrerol : string ;
  val_siglas : string;
  val_sobservacion : string;

  constructor(
    private dialogRef: MatDialogRef<RolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data_dialog: Rol,
    private formBuilder: FormBuilder,
    public _validator: ValidatorService
  ) { }

  ngOnInit(): void {

    this.rol = new Rol();

    if(this.data_dialog.nidrol != null ){
      this.rol = this.data_dialog
      this.nombreboton = "Actualizar";
    }else {
      this.nombreboton = "Registrar";
    }

    /*INICIALIZANDO FORMULARIO */
    this.formrol = this.formBuilder.group({
      nidrol :  new FormControl(this.rol.nidrol),
      snombrerol :  new FormControl(this.rol.snombrerol, [Validators.required, Validators.minLength(8),Validators.maxLength(50)]),
      siglas : new FormControl(this.rol.siglas, [Validators.required, Validators.minLength(3),Validators.maxLength(10)])
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  operar(){


    if (this.formrol.valid) {
      /* OPERAR*/
    }

  }

  get snombrerol() { 
    return this.val_snombrerol = this._validator?.isValid('snombrerol',this.formrol); 
  }

  get siglas() { 
    return this.val_siglas = this._validator?.isValid('siglas',this.formrol); 
  }
}
