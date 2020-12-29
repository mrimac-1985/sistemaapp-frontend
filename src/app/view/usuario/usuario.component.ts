import { EliminarDialogComponent } from './eliminar-dialog/eliminar-dialog.component';
import { UsuarioDialogComponent } from './usuario-dialog/usuario-dialog.component';
import { OperadorDto } from './../../_model_dto/operadorDto';
import { OperadorService } from './../../_service/operador.service';
 
import { Operador } from './../../_model/operador';

import { Usuario } from './../../_model/usuario'
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public cantidad: number  = 0;

  public dataSource: MatTableDataSource<OperadorDto>;
 
  public mymodel :string;
 
  formBuscar : FormGroup;

  
  displayedColumns: string[] = ['nidoperador',  'snumdocu', 'snombre',  'slogin','spassword', 'estado', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public usuarioService: UsuarioService,
    public operadorServicio: OperadorService,    
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {

    this.formBuscar = this.formBuilder.group({
      palabraclave:  new FormControl('')  
    });

    /*traduce componetes de la tabla*/
    this.paginator._intl.itemsPerPageLabel= 'Operador por Página';
    this.paginator._intl.firstPageLabel='Primera Página';
    this.paginator._intl.lastPageLabel ='Última Página';
    this.paginator._intl.previousPageLabel ='Página Anterior';
    this.paginator._intl.nextPageLabel ='Página Siguiente';
  
    this.listarOperadores(0, 10);

    this.cargarVariablesReactiva();
  }

  listarOperadores(page: number , side: number) {

      this.operadorServicio.listarPageableOpe(page, side).subscribe(respuestabase => {
      this.cantidad = respuestabase.data[0].totalElements;      
      this.dataSource = new MatTableDataSource(respuestabase.data[0].content);      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  cargarVariablesReactiva() {
  
    /*MUESTRA MENSAJE*/
    this.operadorServicio.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'OK', {
        duration: 4000  ,
        verticalPosition: 'bottom', // 'top' | 'bottom'
        horizontalPosition: 'end', //'start' | 'center' | 'end' | 'left' | 'right'
        panelClass: ['my-snack-bar', 'button-bar']
      });
      
    }); 

  }

  openDialog(operador?: OperadorDto) {

  
    
    let ope = operador != null ? operador : new OperadorDto();
  

    this.dialog.open(UsuarioDialogComponent, {
      width: '800px',
      data: ope
    })
    .afterClosed().subscribe( resultado => {
      console.log('resultado ->'+resultado);
      this.refrescarTabla();
      if (resultado === 1) {
        console.log(resultado);
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService

        this.refrescarTabla();
      }        
    }
    );
 
  }


  
  elimiarUsuarioDialog(operador?: Operador) {

    let ope = operador != null ? operador : new Operador();
    this.dialog.open(EliminarDialogComponent, {
      width: '350px',
      data: ope
    })
    .afterClosed().subscribe( resultado => {
      console.log('resultado ->'+resultado);
      this.refrescarTabla();       
    }
    );
 
  }


  refrescarTabla(){
    
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  eliminar(usuario?: Usuario) {
     
  }

  filter(x: string) {
    this.dataSource.filter = x.trim().toLowerCase();
  }


  buscar(){

    console.log(this.formBuscar.value['palabraclave']);

     //this.formBuscar.value['nidoperador'];
  }

  mostrarMas(e?: any) {

    this.operadorServicio.listarPageableOpe(e.pageIndex, e.pageSize).subscribe(RespuestaBase => {
      this.cantidad = RespuestaBase.data[0].totalElements;
      this.dataSource = new MatTableDataSource( RespuestaBase.data[0].content);
      //para recargar la tabla no se debe ejecutar el paginator
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  genereReporte(tiporeporte: string){

    this.usuarioService.generarExcel(tiporeporte).subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;')
      a.href = url;
      a.download =  'reporte.'+tiporeporte;
      a.click();
    });
 
  }

 

}
