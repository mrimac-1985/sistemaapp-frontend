import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sede } from 'src/app/_model/sede';
import { ValidatorService } from 'src/app/util/ValidatorService';

@Component({
  selector: 'app-sede-dialog',
  templateUrl: './sede-dialog.component.html',
  styleUrls: ['./sede-dialog.component.css']
})
export class SedeDialogComponent implements OnInit {


  sede : Sede;

  /*boton */
  nombreboton: string;

  formsede : FormGroup;


  /*VARIABLES DE VALIDACION */
  val_snombre : string ;
  val_sdireccion : string;
  val_departamento : string;
  val_provincia : string;
  val_distrito : string;
  val_observacion : string;

  constructor(
    private dialogRef: MatDialogRef<SedeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data_dialog: Sede,
    private formBuilder: FormBuilder,
    public _validator: ValidatorService
  ) { }

  ngOnInit(): void {

    this.sede = new Sede();

    if(this.data_dialog.nidsede != null ){
      this.sede = this.data_dialog
      this.nombreboton = "Actualizar";
    }else {
      this.nombreboton = "Registrar";
    }

    /*INICIALIZANDO FORMULARIO */
    this.formsede = this.formBuilder.group({
      nidsede :  new FormControl(this.sede.nidsede),
      snombre :  new FormControl(this.sede.snombre, [Validators.required, Validators.minLength(8),Validators.maxLength(50)]),
      sdireccion : new FormControl(this.sede.sdireccion, [Validators.required, Validators.minLength(8),Validators.maxLength(50)]),
      departamento : new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(50)]),
      provincia : new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(50)]),
      distrito : new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(50)]),
      observacion : new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(50)])

    });

  }


  cancelar(): void {
    this.dialogRef.close();
  }

  operar(){


    if (this.formsede.valid) {
      /* OPERAR*/
    }


  }


  get snombre() { 
    return this.val_snombre = this._validator?.isValid('snombre',this.formsede); 
  }

  get sdireccion() { 
    return this.val_sdireccion = this._validator?.isValid('sdireccion',this.formsede); 
  }

  get departamento() { 
    return this.val_departamento = this._validator?.isValid('departamento',this.formsede); 
  }

  get provincia() { 
    return this.val_provincia = this._validator?.isValid('provincia',this.formsede); 
  }

  get distrito() { 
    return this.val_distrito = this._validator?.isValid('distrito',this.formsede); 
  }

  get observacion() { 
    return this.val_observacion = this._validator?.isValid('sobservacion',this.formsede); 
  }
}
