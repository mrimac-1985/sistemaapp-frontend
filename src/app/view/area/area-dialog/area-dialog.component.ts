import { Area } from './../../../_model/area'
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/util/ValidatorService';

@Component({
  selector: 'app-area-dialog',
  templateUrl: './area-dialog.component.html',
  styleUrls: ['./area-dialog.component.css']
})
export class AreaDialogComponent implements OnInit {

  area : Area;

  /*boton */
  nombreboton: string;

  formarea : FormGroup;

   /*VARIABLES DE VALIDACION */
   val_snombre : string ;
   val_sede : string;
   val_nsesion : string;

  constructor(
    private dialogRef: MatDialogRef<AreaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data_dialog: Area,
    private formBuilder: FormBuilder,
    public _validator: ValidatorService
  ) { }

  ngOnInit(): void {

    this.area = new Area();

    if(this.data_dialog.nidarea != null ){
      this.area = this.data_dialog
      this.nombreboton = "Actualizar";
    }else {
      this.nombreboton = "Registrar";
    }

    /*INICIALIZANDO FORMULARIO */
    this.formarea = this.formBuilder.group({
      nidrol :  new FormControl(this.area.nidarea),
      snombrearea :  new FormControl(this.area.snombre, [Validators.required, Validators.minLength(8),Validators.maxLength(50)]),
      sede :  new FormControl(this.area.nidsede, [Validators.required, Validators.minLength(1),Validators.maxLength(4)]),
      sesion : new FormControl(this.area.nidsesion, [Validators.required, Validators.minLength(1), Validators.maxLength(4)])
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  operar(){

    if (this.formarea.valid) {
      /* OPERAR*/
    }
  }

  get snombre() { 
    return this.val_snombre = this._validator?.isValid('snombrearea',this.formarea);
  }

  get sede() { 
    return this.val_sede = this._validator?.isValid('sede',this.formarea);
  }
  get sesion() { 
    return this.val_nsesion = this._validator?.isValid('sesion',this.formarea);
  }

}
