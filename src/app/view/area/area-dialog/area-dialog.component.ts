import { AreaService } from './../../../_service/area.service'
import { SedeService } from './../../../_service/sede.service'
import { Area } from './../../../_model/area'
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/util/ValidatorService';
import { Sede } from 'src/app/_model/sede';

@Component({
  selector: 'app-area-dialog',
  templateUrl: './area-dialog.component.html',
  styleUrls: ['./area-dialog.component.css']
})
export class AreaDialogComponent implements OnInit {

  area : Area;

  sedeCombo : Sede[];

  /*boton */
  nombreboton: string;

  formarea : FormGroup;

  areadb : Area;

   /*VARIABLES DE VALIDACION */
   val_snombre : string ;
   val_sede : string;
   val_nsesion : string;
   val_observacion : string;

  constructor(
    private dialogRef: MatDialogRef<AreaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data_dialog: Area,
    private sedeService : SedeService,
    private formBuilder: FormBuilder,
    public areaservice : AreaService,
    public _validator: ValidatorService
  ) { }

  ngOnInit(): void {

    this.listarSede();

    this.area = new Area();

    if(this.data_dialog.nidarea != null ){
      this.area = this.data_dialog
      this.nombreboton = "Actualizar";
    }else {
      this.nombreboton = "Registrar";
    }

    /*INICIALIZANDO FORMULARIO */
    this.formarea = this.formBuilder.group({
      nidarea :  new FormControl(this.area.nidarea),
      snombrearea :  new FormControl(this.area.snombre, [Validators.required, Validators.minLength(8),Validators.maxLength(50)]),
      sede :  new FormControl(this.area.nidsede, Validators.required),      
      sobservacion : new FormControl(this.area.sobservacion)
    });
  }

  listarSede() {
    this.sedeService.listar().subscribe((respuesta) => {
      this.sedeCombo = respuesta.data;
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  operar(){

    this.areadb = new Area();

    this.areadb.nidarea = this.formarea.value['nidarea'];
    this.areadb.snombre = this.formarea.value['snombrearea'];
    this.areadb.nidsede = this.formarea.value['sede'];
    this.areadb.sobservacion = this.formarea.value['sobservacion'];
    this.areadb.nidsesion = Number(sessionStorage.getItem('idsesion'));


    if (this.formarea.valid) {
      /* OPERAR*/

      if (this.areadb.nidarea!= null){
        //modificas


        this.areaservice
          .modificar(this.areadb)
          .subscribe((RespuestaBase) => {
            this.areaservice.mensajeCambio.next(RespuestaBase.mensaje);
          });

        this.LimpiarForm();
        this.dialogRef.close();
      }else{
 
        //registras 
        this.areaservice.registrar(this.areadb).subscribe((RespuestaBase) => {
        this.areaservice.mensajeCambio.next(RespuestaBase.mensaje);
       });
 
       this.LimpiarForm();
         this.dialogRef.close();
     }
    }else {
      console.log('formulario no valido');
    }


  }

  LimpiarForm() {
    this.formarea.reset();
  }

  get snombre() { 
    return this.val_snombre = this._validator?.isValid('snombrearea',this.formarea);
  }

  get sede() { 
    return this.val_sede = this._validator?.isValid('sede',this.formarea);
  }

  // get sesion() { 
  //   return this.val_nsesion = this._validator?.isValid('sesion',this.formarea);
  // }

  get observacion() { 
    return this.val_observacion = this._validator?.isValid('sobservacion',this.formarea); 
  }

}
