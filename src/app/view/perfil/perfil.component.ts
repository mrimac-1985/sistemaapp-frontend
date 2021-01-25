import { MatDialog } from '@angular/material/dialog'
import { PerfilService } from './../../_service/perfil.service'
import { Perfil } from './../../_model/perfil'
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pageable } from 'src/app/_model/pageable';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PerfilDialogComponent } from './perfil-dialog/perfil-dialog.component';
import { EliminarPerfilDialogComponent } from './eliminar-perfil-dialog/eliminar-perfil-dialog.component';
import { NotificacionService } from 'src/app/util/notificacion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public dataSource: MatTableDataSource<Perfil>;
  public cantidad: number  = 0;

  pagina: Pageable;
  listaPerfiles : Perfil[];

  displayedColumns: string[] = ['nidperfil',  'snombreperfil', 'dfechareg', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialog : MatDialog,
    public perfilservicio : PerfilService,
    private notificacion : NotificacionService,
  ) { }

  ngOnInit(): void {

    this.cargarVariablesReactiva();

    /*traduce componetes de la tabla*/
    this.paginator._intl.itemsPerPageLabel= 'Perfiles por Página';
    this.paginator._intl.firstPageLabel='Primera Página';
    this.paginator._intl.lastPageLabel ='Última Página';
    this.paginator._intl.previousPageLabel ='Página Anterior';
    this.paginator._intl.nextPageLabel ='Página Siguiente';

    this.listarPerfiles(0 , 10)
  }

  listarPerfiles(page: number , side: number) {

    /*crea el objeto pagina*/
      this.pagina = new Pageable();
      this.pagina.pageNumber =page*side;
      this.pagina.pageSize =side;
      this.pagina.palabraClave="";

      this.perfilservicio.listarPageable(this.pagina).subscribe( respuestabase => {
        this.cantidad = respuestabase.data[0].totalElements; 
        this.dataSource = new MatTableDataSource(respuestabase.data[0].content);      
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  
       }
       );
  }

  mostrarMas(e?: any) {

    /*crea el objeto pagina*/
    this.pagina = new Pageable();
    this.pagina.pageNumber =e.pageIndex*e.pageSize;
    this.pagina.pageSize =e.pageSize;
          
    this.perfilservicio.listarPageable(this.pagina).subscribe(RespuestaBase => {
      this.cantidad = RespuestaBase.data[0].totalElements;
      this.dataSource = new MatTableDataSource( RespuestaBase.data[0].content);
      this.dataSource.sort = this.sort;
    });

  }

  openDialog(perfil?: Perfil) {
    let perfildata = perfil != null ? perfil : new Perfil();
    this.dialog.open(PerfilDialogComponent, {
      width: '800px',
      /*height: '400px',*/
      data: perfildata
    })
    .afterClosed().subscribe( resultado => {      
      this.refrescarTabla();     
    }
    );
  }

  eliminarPerfilDialog(perfil?: Perfil) {
    let perfildata = perfil != null ? perfil : new Perfil();
    this.dialog.open(EliminarPerfilDialogComponent, {
      width: '800px',
      height: '400px',
      data: perfildata
    })
    .afterClosed().subscribe( resultado => {      
      this.refrescarTabla();     
    }
    );
  }

  activarPerfilDialog(perfil?: Perfil) {
 
  }

  refrescarTabla(){
    
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  cargarVariablesReactiva() {
  
    /*MUESTRA MENSAJE*/
    this.perfilservicio.mensajeCambio.subscribe(data => {

      this.notificacion.mostrarNotificacion(data,'OK','exito');
    }),(error : any) =>{

      this.notificacion.mostrarNotificacion(error,'OK','error');
    }; 

  }

}
