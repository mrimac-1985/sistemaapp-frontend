import { PerfilService } from './../../../_service/perfil.service'
import { Perfil } from './../../../_model/perfil'
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/util/ValidatorService';

@Component({
  selector: 'app-perfil-dialog',
  templateUrl: './perfil-dialog.component.html',
  styleUrls: ['./perfil-dialog.component.css']
})
export class PerfilDialogComponent implements OnInit {

  perfil : Perfil;

  /*boton */
  nombreboton: string;

  formperfil : FormGroup;

  perfildb : Perfil;

  /*VARIABLES DE VALIDACION */
  val_snombre : string ;
  val_nsesionusuario : string;
  val_ntiempoconexion : string;
  val_ntiempopasword : string;

  constructor(
    private dialogRef: MatDialogRef<PerfilDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data_dialog: Perfil,
    private formBuilder: FormBuilder,
    public perfilservice : PerfilService,
    public _validator: ValidatorService
  ) { }

  ngOnInit(): void {

    this.perfil = new Perfil();

    if(this.data_dialog.nidperfil != null ){
      this.perfil = this.data_dialog
      this.nombreboton = "Actualizar";
    }else {
      this.nombreboton = "Registrar";
    }

    /*INICIALIZANDO FORMULARIO */
    this.formperfil = this.formBuilder.group({
      nidperfil :  new FormControl(this.perfil.nidperfil),
      snombreperfil :  new FormControl(this.perfil.snombreperfil, [Validators.required, Validators.minLength(8),Validators.maxLength(50)]),
      nsesionesporusuario :  new FormControl(this.perfil.nsesionesporusuario, [Validators.required, Validators.minLength(1),Validators.maxLength(8)]),
      ntiempoconexion :  new FormControl(this.perfil.ntiempoconexionminuto, [Validators.required, Validators.minLength(1),Validators.maxLength(8)]),
      ntiempopasword :  new FormControl(this.perfil.ntiempovidapasworddia, [Validators.required, Validators.minLength(1),Validators.maxLength(8)])
    });
  }


  cancelar(): void {
    this.dialogRef.close();
  }

  operar(){
    this.perfildb = new Perfil();

    this.perfildb.nidperfil = this.formperfil.value['nidperfil'];
    this.perfildb.snombreperfil = this.formperfil.value['snombreperfil'];
    this.perfildb.nsesionesporusuario = this.formperfil.value['nsesionesporusuario'];
    this.perfildb.ntiempoconexionminuto = this.formperfil.value['ntiempoconexion'];
    this.perfildb.ntiempovidapasworddia = this.formperfil.value['ntiempopasword'];
    this.perfildb.nidsesion = Number(sessionStorage.getItem('idsesion'));

    if (this.formperfil.valid) {
      /* OPERAR*/
      if (this.perfildb.nidperfil!= null){
        //modificas

        this.perfilservice
          .modificar(this.perfildb)
          .subscribe((RespuestaBase) => {
            this.perfilservice.mensajeCambio.next(RespuestaBase.mensaje);
          });

        this.LimpiarForm();
        this.dialogRef.close();
      }else{
 
        //registras 
        this.perfilservice.registrar(this.perfildb).subscribe((RespuestaBase) => {
        this.perfilservice.mensajeCambio.next(RespuestaBase.mensaje);
       });
 
       this.LimpiarForm();
         this.dialogRef.close();
     }
    }

  }

  LimpiarForm() {
    this.formperfil.reset();
  }

  get snombre() { 
    return this.val_snombre = this._validator?.isValid('snombreperfil',this.formperfil);
  }

  get nsesionusuario() { 
    return this.val_nsesionusuario = this._validator?.isValid('nsesionesporusuario',this.formperfil);
  }

  get ntiempoconexion() { 
    return this.val_ntiempoconexion = this._validator?.isValid('ntiempoconexion',this.formperfil);
  }

  get ntiempopasword() { 
    return this.val_ntiempopasword = this._validator?.isValid('ntiempopasword',this.formperfil);
  }
}
