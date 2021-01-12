import { ReporteService } from './../../util/reporte.service';
import { NotificacionService } from './../../util/notificacion.service';
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
import { Pageable } from 'src/app/_model/pageable';


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


  pagina: Pageable;
  
  displayedColumns: string[] = ['nidoperador',  'snumdocu', 'snombre',  'slogin','spassword', 'estado', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public usuarioService: UsuarioService,
    public operadorServicio: OperadorService,    
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private notificacion : NotificacionService,
    private ReporteService : ReporteService

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
  
      /*crea el objeto pagina*/
      this.pagina = new Pageable();
      this.pagina.pageNumber =page*side;
      this.pagina.pageSize =side;

      
      this.operadorServicio.listarPageableOpe(this.pagina).subscribe(respuestabase => {
      this.cantidad = respuestabase.data[0].totalElements;      
      this.dataSource = new MatTableDataSource(respuestabase.data[0].content);      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  cargarVariablesReactiva() {
  
    /*MUESTRA MENSAJE*/
    this.operadorServicio.mensajeCambio.subscribe(data => {

      this.notificacion.mostrarNtificacion(data,'OK','exito');
    }),(error : any) =>{

      this.notificacion.mostrarNtificacion(error,'OK','error');
    }; 

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
      this.formBuscar.reset();
      if (resultado === 1) {
        console.log(resultado);
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService

        this.refrescarTabla();
      }        
    }
    );
 
  }


  
  elimiarUsuarioDialog(operador?: OperadorDto) {

    let ope = operador != null ? operador : new OperadorDto();
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

  activarUsuarioDialog(operador?: OperadorDto) {
     
  }

  refrescarTabla(){
    
    this.paginator._changePageSize(this.paginator.pageSize);
  }
 

  filter(x: string) {
    this.dataSource.filter = x.trim().toLowerCase();
  }





  buscar(){

    /*crea el objeto pagina*/
    this.pagina = new Pageable();
    this.pagina.pageNumber =0;
    this.pagina.pageSize =10;
    this.pagina.palabraClave= this.formBuscar.value['palabraclave'];
    console.log(this.formBuscar.value['palabraclave']);

    this.operadorServicio.listarPageableOpe(this.pagina).subscribe(respuestabase => {
      this.cantidad = respuestabase.data[0].totalElements;      
      this.dataSource = new MatTableDataSource(respuestabase.data[0].content);      
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

     //this.formBuscar.value['nidoperador'];
  }

  mostrarMas(e?: any) {

    /*crea el objeto pagina*/
    this.pagina = new Pageable();
    this.pagina.pageNumber =e.pageIndex*e.pageSize;
    this.pagina.pageSize =e.pageSize;
          
    this.operadorServicio.listarPageableOpe(this.pagina).subscribe(RespuestaBase => {
      this.cantidad = RespuestaBase.data[0].totalElements;
      this.dataSource = new MatTableDataSource( RespuestaBase.data[0].content);
      //para recargar la tabla no se debe ejecutar el paginator
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  genereReporte(tiporeporte: string){
    this.operadorServicio.generarReporte(tiporeporte).subscribe(RespuestaBase => {
      this.ReporteService.generareporte(RespuestaBase.data[0].reporte,'ReporteOperador',tiporeporte);     
    });
  }

 

}
