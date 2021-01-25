import { SedeService } from './../../../_service/sede.service'
import { UbigeoService } from './../../../_service/ubigeo.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sede } from 'src/app/_model/sede';
import { ValidatorService } from 'src/app/util/ValidatorService';
import { Ubigeo } from 'src/app/_model/ubigeo';

@Component({
  selector: 'app-sede-dialog',
  templateUrl: './sede-dialog.component.html',
  styleUrls: ['./sede-dialog.component.css']
})
export class SedeDialogComponent implements OnInit {


  sede : Sede;
  departamentocombo : Ubigeo[];
  provinciacombo : Ubigeo[];
  distritocombo : Ubigeo[];

  /*boton */
  nombreboton: string;

  formsede : FormGroup;

  sededb : Sede;

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
    public _validator: ValidatorService,
    public sedeservice : SedeService ,
    public ubigeoservice: UbigeoService
  ) { }

  ngOnInit(): void {

    this.listarDepartamento();
 
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
      departamento : new FormControl(''),
      provincia : new FormControl(''),
      distrito : new FormControl(this.sede.subigeo, [Validators.required]),
      observacion : new FormControl('' )

    });

  }

  listarDepartamento() {
 
    this.ubigeoservice.listarDepartamento().subscribe(respuestabase=>{
      this.departamentocombo = respuestabase.data;
    });
  }

  listarProvincia(iddepartamento : string) { 
    this.provinciacombo = [];
    this.distritocombo = [];

    this.ubigeoservice.listarProvincia(iddepartamento).subscribe(respuestabase=>{
      this.provinciacombo = respuestabase.data;
    });
  }

  listarDistrito(idprivincia : string) {
    this.distritocombo = [];
    this.ubigeoservice.listarDistrito(idprivincia).subscribe(respuestabase=>{
      this.distritocombo = respuestabase.data;
    });
  }
  


  cancelar(): void {
    this.dialogRef.close();
  }

  operar(){

    this.sededb = new Sede();

    this.sededb.nidsede = this.formsede.value['nidsede'];
    this.sededb.snombre = this.formsede.value['snombre'];
    this.sededb.sdireccion = this.formsede.value['sdireccion'];
    this.sededb.subigeo = this.formsede.value['distrito'];
    

    if (this.formsede.valid) {
      /* OPERAR*/
      
      if (this.sededb.nidsede!= null){
        //modificas
        this.sedeservice
          .modificar(this.sededb)
          .subscribe((RespuestaBase) => {
            this.sedeservice.mensajeCambio.next(RespuestaBase.mensaje);
          });

        this.LimpiarForm();
        this.dialogRef.close();
      }else{
       //registras 
       this.sedeservice.registrar(this.sededb).subscribe((RespuestaBase) => {
       this.sedeservice.mensajeCambio.next(RespuestaBase.mensaje);
      });

      this.LimpiarForm();
        this.dialogRef.close();
    }
    }else {
      console.log('formulario no valido');
    }
      
  

  }

  LimpiarForm() {
    this.formsede.reset();
  }

  select(plan: string)
  {
      console.log('COMBO->'+plan)
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
