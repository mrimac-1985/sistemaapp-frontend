import { TipoDocumentoService } from './../../../_service/tipodocumentoservices';
import { OperadorService } from './../../../_service/operador.service';
import { Operador } from './../../../_model/operador';
import { RolService } from './../../../_service/rol.service';
import { PerfilService } from 'src/app/_service/perfil.service';
import { AreaService } from 'src/app/_service/area.service';
import { Component, OnInit, Inject, ɵConsole, OnDestroy, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/_model/usuario';
import { Area } from 'src/app/_model/area';
import { Perfil } from 'src/app/_model/perfil';
import { Rol } from 'src/app/_model/rol';
import { OperadorDto } from 'src/app/_model_dto/operadorDto';
import { TipoDocumento } from 'src/app/_model/tipodocumento';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { ValidatorService } from 'src/app/util/ValidatorService';
import { ImagenService } from 'src/app/util/imagen.service';

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.css']
})
export class UsuarioDialogComponent implements OnInit {

  usuario: Usuario;
  operadorDto: OperadorDto;
  operador : Operador;

  /*LISTA PARA LOS COMBOS*/
  areaCombo: Area[];
  perfilCombo: Perfil[];
  rolCombo: Rol[];
  tipodocumentocombo: TipoDocumento[];

  /*ID COMBOS*/
  idarecombo: number;
  idperfilcombo: number;
  idRolCombo: number;
  idcombogenero: string;
  idTipoDocumento: string;

  /**NOMBRE BOTON*/
  nombreboton: string;

  /*FORMULARIO REACTIVO */
  formOperador : FormGroup;

  /*NUMERO DE TAB */
  public demo1TabIndex = 0;

  /*FORMATO DE CORREO ELECTRONICO */
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  /*VARIABLES DE MENSAJE DE VALIDACION */
  val_snumdoc : string ;
  val_snombre : string ;
  val_sidtipodoc : string ;
  val_sapepaterno : string ;
  val_sapematerno: string ;
  val_dfechanac: string ;
  val_sgenero: string ;
  val_stelefono: string ;
  val_sdireccion: string;
  val_scorreo: string;
  val_sobservacion: string;
  val_slogin: string;
  val_spassword: string;
  val_nidRol: string;
  val_nidarea: string;
  val_nidperfil: string;

  /*FOTO */
  imagenData: any;

  constructor(
    private dialogRef: MatDialogRef<UsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data_dialog: OperadorDto,

    private operadorServicio: OperadorService,
    private tipodocumentService: TipoDocumentoService,
    private areaService: AreaService,
    private perfilService: PerfilService,
    private rolService: RolService,
    private formBuilder: FormBuilder,
    public _validator: ValidatorService,
    public imagenservicio : ImagenService
  ) {

    
  }


  ngOnInit(): void {

    /*CARGA LOS COMBOS*/
    this.listarPerfil();
    this.listarArea();
    this.listarRoles();
    this.listarTipoDocumento();


    /*se crea objeto de usuario y operador*/
    this.operadorDto = new OperadorDto();

    this.operador = new Operador();
    this.usuario = new Usuario();
 
 

    if (this.data_dialog.operador!= null) {
      // this.cargarDatosDelUsuario(this.data_dialog.operador.nidoperador);
      
      this.operadorDto = this.data_dialog;
      this.nombreboton = 'Actualizar'; 
      

    } else { 
        
      this.operador.usuario =  this.usuario;
      this.operadorDto.operador = this.operador;
      this.nombreboton = 'Registrar';
    }
 
  
    this.formOperador = this.formBuilder.group({
      nidoperador:  new FormControl(this.operadorDto.operador.nidoperador ) , 
      sidtipodoc:  new FormControl(this.operadorDto.operador.sidtipodoc, Validators.required) , 
      snumdocu:  new FormControl(this.operadorDto.operador.snumdocu, [Validators.required , Validators.minLength(8),Validators.maxLength(15)]) , 
      snombre:  new FormControl(this.operadorDto.operador.snombre, Validators.required) , 
      sapepaterno:  new FormControl(this.operadorDto.operador.sapepaterno, Validators.required) , 
      sapematerno:  new FormControl(this.operadorDto.operador.sapematerno, Validators.required) , 
      dfechanac:  new FormControl(this.operadorDto.operador.dfechanac, Validators.required) , 
      scorreo:  new FormControl(this.operadorDto.operador.scorreo, [Validators.required , Validators.minLength(8),Validators.maxLength(50),Validators.pattern(this.emailPattern)]) , 
      stelefono:  new FormControl(this.operadorDto.operador.stelefono, Validators.required) , 
      sgenero:  new FormControl(this.operadorDto.operador.sgenero, Validators.required) , 
      sdireccion:  new FormControl(this.operadorDto.operador.sdireccion, Validators.required) , 
      sobservacion:  new FormControl(this.operadorDto.operador.sobservacion, ) , 
      slogin:  new FormControl(this.operadorDto.operador.usuario.slogin, Validators.required) , 
      spassword:  new FormControl(this.operadorDto.operador.usuario.spassword, Validators.required) , 
      nidarea:  new FormControl(this.operadorDto.nidarea, Validators.required) , 
      nidperfil:  new FormControl(this.operadorDto.nidperfil, Validators.required) , 
      nidRol:  new FormControl(this.operadorDto.nidrol, Validators.required) 
    });

    this.consultarImagen();

  }


  operar() {
    //CONSTRUYE USUARIO DTO
    let operadorDto = new OperadorDto();
    let operadorMod = new Operador();
    let usuarioMod = new Usuario();
 
    
    operadorMod.nidoperador = this.formOperador.value['nidoperador'];
    operadorMod.sidtipodoc = this.formOperador.value['sidtipodoc'];
    operadorMod.snumdocu = this.formOperador.value['snumdocu'];
    operadorMod.snombre = this.formOperador.value['snombre'];
    operadorMod.sapepaterno = this.formOperador.value['sapepaterno'];
    operadorMod.sapematerno = this.formOperador.value['sapematerno'];
    operadorMod.dfechanac = this.formOperador.value['dfechanac'];
    operadorMod.scorreo = this.formOperador.value['scorreo'];
    operadorMod.sgenero = this.formOperador.value['sgenero'];
    operadorMod.sobservacion = this.formOperador.value['sobservacion'];
    operadorMod.stelefono = this.formOperador.value['stelefono'];
    operadorMod.sdireccion = this.formOperador.value['sdireccion'];
    operadorMod.nidsesion = Number(sessionStorage.getItem('idsesion'));
    usuarioMod.slogin = this.formOperador.value['slogin'];
    usuarioMod.spassword = this.formOperador.value['spassword'];

    operadorMod.usuario = usuarioMod;

    //CONSTRUYE USUARIO DTO
    operadorDto.operador = operadorMod;
    operadorDto.nidarea = this.formOperador.value['nidarea'];
    operadorDto.nidperfil = this.formOperador.value['nidperfil'];
    operadorDto.nidrol = this.formOperador.value['nidRol'];
  

    this.demo1TabIndex = 1;

    if (this.formOperador.valid) {
      /** PARA MODIFICAR EL USUARIO */
      if (operadorDto.operador.nidoperador > 0) {
        this.operadorServicio
          .modificarOperador(operadorDto)
          .subscribe((RespuestaBase) => {
            this.operadorServicio.mensajeCambio.next(RespuestaBase.mensaje);
          });

        this.LimpiarForm();
        this.dialogRef.close();
      } else {
      /** PARA REGISTRAR EL USUARIO */
      
        this.operadorServicio
          .registrar(operadorDto)
          .subscribe((RespuestaBase) => {
            this.operadorServicio.mensajeCambio.next(RespuestaBase.mensaje);
          });

        this.LimpiarForm();
        this.dialogRef.close();
      }
    }else {
      console.log('formulario no valido');
            
    }

  }

  LimpiarForm() {
    this.formOperador.reset();
  }

  listarArea() {
    this.areaService.listar().subscribe((respuesta) => {
      this.areaCombo = respuesta.data;
    });
  }

  listarPerfil() {
    this.perfilService.listar().subscribe((respuesta) => {
      this.perfilCombo = respuesta.data;
    });
  }

  listarRoles() {
    this.rolService.listar().subscribe((respuesta) => {
      this.rolCombo = respuesta.data;
    });
  }

  listarTipoDocumento() {
    this.tipodocumentService.listar().subscribe((respeusabase) => {
      this.tipodocumentocombo = respeusabase.data;
    });
  }
  onSubmit() {
    // Mostramos el objeto usuario
    console.log();
  }

  cancelar() {
    this.  LimpiarForm();
    this.dialogRef.close();
  }

  
  /*METODOS DE VALIDACION DE FORMULARIOS */
  get sidtipodoc(){ return this.val_sidtipodoc = this._validator?.isValid('sidtipodoc',this.formOperador);  }
  get snumdocu(){ return this.val_snumdoc = this._validator?.isValid('snumdocu',this.formOperador);  }
  get snombre(){ return this.val_snombre = this._validator?.isValid('snombre',this.formOperador);  }
   get sapepaterno(){ return this.val_sapepaterno = this._validator?.isValid('sapepaterno',this.formOperador);  }
   get sapematerno(){ return this.val_sapematerno = this._validator?.isValid('sapematerno',this.formOperador);  }
   get dfechanac(){ return this.val_dfechanac = this._validator?.isValid('dfechanac',this.formOperador);  }
   get sgenero(){ return this.val_sgenero = this._validator?.isValid('sgenero',this.formOperador);  }
   get stelefono(){ return this.val_stelefono = this._validator?.isValid('stelefono',this.formOperador);  }
   get sdireccion(){ return this.val_sdireccion = this._validator?.isValid('sdireccion',this.formOperador);  }
   get scorreo(){ return this.val_scorreo = this._validator?.isValid('scorreo',this.formOperador);  }
   get sobservacion(){ return this.val_sobservacion = this._validator?.isValid('sobservacion',this.formOperador);  }

   get slogin(){ return this.val_slogin = this._validator?.isValid('slogin',this.formOperador);  }
   get spassword(){ return this.val_spassword = this._validator?.isValid('spassword',this.formOperador);  }
   get nidRol(){ return this.val_nidRol = this._validator?.isValid('nidRol',this.formOperador);  }
   get nidarea(){ return this.val_nidarea = this._validator?.isValid('nidarea',this.formOperador);  }
   get nidperfil(){ return this.val_nidperfil = this._validator?.isValid('nidperfil',this.formOperador);  }
   
   
seleccionarimagen(){

}

consultarImagen() {
  
  let idoperador : number = this.formOperador.value['nidoperador'];   
  this.operadorServicio.consultarImagenOperador(idoperador).subscribe(RespuestaBase=>{    
    this.imagenData = this.imagenservicio.convertir(RespuestaBase.data[0].ximagen);
  });
}


}
