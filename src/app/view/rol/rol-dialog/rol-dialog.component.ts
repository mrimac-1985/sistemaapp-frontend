import { MenuService } from 'src/app/_service/menu.service';
import { RolService } from './../../../_service/rol.service'
import { ValidatorService } from './../../../util/ValidatorService'
import { Rol } from './../../../_model/rol'
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Menu } from 'src/app/_model/menu';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}


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

  roldb : Rol;

  menusubmenu : Menu[];

  /*VARIABLES DE VALIDACION */
  val_snombrerol : string ;
  val_siglas : string;
  val_sobservacion : string;

  constructor(
    private dialogRef: MatDialogRef<RolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data_dialog: Rol,
    private formBuilder: FormBuilder,
    public rolservice : RolService,
    public _validator: ValidatorService,
    public menuservice: MenuService
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
      siglas : new FormControl(this.rol.siglas, [Validators.required, Validators.minLength(3),Validators.maxLength(10)]),
      sobservacion : new FormControl(this.rol.sobservacion)
    });
  
  }


  cancelar(): void {
    this.dialogRef.close();
  }

  operar(){
    this.roldb = new Rol();

    this.roldb.nidrol = this.formrol.value['nidrol'];
    this.roldb.snombrerol = this.formrol.value['snombrerol'];
    this.roldb.siglas = this.formrol.value['siglas'];
    this.roldb.sobservacion = this.formrol.value['sobservacion'];
    this.roldb.nidsesion = Number(sessionStorage.getItem('idsesion'));

    if (this.formrol.valid) {
      /* OPERAR*/
      if (this.roldb.nidrol!= null){
        //modificas

        this.rolservice
          .modificar(this.roldb)
          .subscribe((RespuestaBase) => {
            this.rolservice.mensajeCambio.next(RespuestaBase.mensaje);
          });

        this.LimpiarForm();
        this.dialogRef.close();
      }else{
 
        //registras 
        this.rolservice.registrar(this.roldb).subscribe((RespuestaBase) => {
        this.rolservice.mensajeCambio.next(RespuestaBase.mensaje);
       });
 
       this.LimpiarForm();
         this.dialogRef.close();
     }
    }else {
      console.log('formulario no valido');
    }

  }

  LimpiarForm() {
    this.formrol.reset();    

  }
 
  get snombrerol() { 
    return this.val_snombrerol = this._validator?.isValid('snombrerol',this.formrol); 
  }

  get siglas() { 
    return this.val_siglas = this._validator?.isValid('siglas',this.formrol); 
  }

  get observacion() { 
    return this.val_sobservacion = this._validator?.isValid('sobservacion',this.formrol); 
  }

 

}
