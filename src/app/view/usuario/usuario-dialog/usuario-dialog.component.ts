import { TipoDocumentoService } from './../../../_service/tipodocumentoservices';
import { OperadorService } from './../../../_service/operador.service';
import { Operador } from './../../../_model/operador';
import { RolService } from './../../../_service/rol.service';
import { PerfilService } from 'src/app/_service/perfil.service';
import { AreaService } from 'src/app/_service/area.service';
import { Component, OnInit, Inject, ɵConsole, OnDestroy } from '@angular/core';
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

  formOperador : FormGroup;

  public demo1TabIndex = 0;

  // tslint:disable-next-line: max-line-length
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private dialogRef: MatDialogRef<UsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data_dialog: OperadorDto,

    private operadorServicio: OperadorService,
    private tipodocumentService: TipoDocumentoService,
    private areaService: AreaService,
    private perfilService: PerfilService,
    private rolService: RolService,
    private formBuilder: FormBuilder,
    public _validator: ValidatorService
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
      sapepaterno:  new FormControl(this.operadorDto.operador.sapematerno, Validators.required) , 
      sapematerno:  new FormControl(this.operadorDto.operador.sapematerno, Validators.required) , 
      dfechanac:  new FormControl(this.operadorDto.operador.dfechanac, Validators.required) , 
      scorreo:  new FormControl(this.operadorDto.operador.scorreo, [Validators.required , Validators.minLength(8),Validators.maxLength(50),Validators.pattern(this.emailPattern)]) , 
      stelefono:  new FormControl(this.operadorDto.operador.stelefono, Validators.required) , 
      sgenero:  new FormControl(this.operadorDto.operador.sgenero, Validators.required) , 
      sdireccion:  new FormControl(this.operadorDto.operador.sdireccion, Validators.required) , 
      sobservacion:  new FormControl(this.operadorDto.operador.sobservacion, ) , 
      slogin:  new FormControl(this.operadorDto.operador.usuario.slogin, Validators.required) , 
      spassword:  new FormControl(this.operadorDto.operador.usuario.spassword, Validators.required) , 
      idare:  new FormControl(this.operadorDto.nidarea, Validators.required) , 
      idperfil:  new FormControl(this.operadorDto.nidperfil, Validators.required) , 
      idRol:  new FormControl(this.operadorDto.nidrol, Validators.required) 
    });

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
    operadorDto.nidarea = this.formOperador.value['idare'];
    operadorDto.nidperfil = this.formOperador.value['idperfil'];
    operadorDto.nidrol = this.formOperador.value['idRol'];

    console.log('registra');    

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

  /*VALIDANDO CAMPOS*/
  //get snumdocu(){ return this.formOperador.get('snumdocu')?.errors;   }

  // get sidtipodoc(){ return this.formOperador.get('sidtipodoc'); }
  // get snombre(){ return this.formOperador.get('snombre'); }
  // get sapepaterno(){ return this.formOperador.get('sapepaterno'); }
  // get sapematerno(){ return this.formOperador.get('sapematerno'); }
  // get scorreo(){ return this.formOperador.get('scorreo'); }
  // get sgenero(){ return this.formOperador.get('sgenero'); }
  // get stelefono(){ return this.formOperador.get('stelefono'); }
  // get dfechanac(){ return this.formOperador.get('dfechanac'); }
  // get sdireccion(){ return this.formOperador.get('sdireccion'); }
  // get sobservacion(){ return this.formOperador.get('sobservacion'); }

//  public getMensajeError(field: string): string {
//     let mensaje = '';

//     if (this.formOperador.get(field).errors.required) {
//       mensaje = field+ 'El campo es requerido.';
//     } else if (this.formOperador.get(field).hasError('pattern')) {
//       mensaje = 'No valido.';
//     } else if (this.formOperador.get(field).hasError('minLength')) {
//       const minLength = this.formOperador.get(field).errors?.minLength
//         .requiredLength;
//       mensaje = 'EL campo debe ser mayor que ' + minLength + ' caracteres.';
//     } 

//     console.log('---------------------------------> ' + mensaje);

//     return mensaje;
//   }

//   public esCampoValido(field: string): boolean {
//     return (
//       (this.formOperador.get(field).touched ||
//         this.formOperador.get(field).dirty) &&
//       this.formOperador.get(field).valid
//     );
//   }
}
