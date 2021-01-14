
import { RolDialogComponent } from './rol-dialog/rol-dialog.component'
import { RolService } from './../../_service/rol.service'
import { Component, OnInit, ViewChild } from '@angular/core';
import { Rol } from 'src/app/_model/rol';
import { Pageable } from 'src/app/_model/pageable';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EliminarRolDialogComponent } from './eliminar-rol-dialog/eliminar-rol-dialog.component';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  public dataSource: MatTableDataSource<Rol>;
  public cantidad: number  = 0;

  pagina: Pageable;
  listaRoles : Rol[];


  displayedColumns: string[] = ['nidrol',  'snombrerol', 'siglas',  'dfechareg', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    public roleservicio : RolService    
  ) { }

  ngOnInit(): void {


     /*traduce componetes de la tabla*/
     this.paginator._intl.itemsPerPageLabel= 'Roles por Página';
     this.paginator._intl.firstPageLabel='Primera Página';
     this.paginator._intl.lastPageLabel ='Última Página';
     this.paginator._intl.previousPageLabel ='Página Anterior';
     this.paginator._intl.nextPageLabel ='Página Siguiente';
  
     

    this.listarRoles(0 , 10);

  }


  listarRoles(page: number , side: number) {

      /*crea el objeto pagina*/
      this.pagina = new Pageable();
      this.pagina.pageNumber =page*side;
      this.pagina.pageSize =side;
      this.pagina.palabraClave="";


     this.roleservicio.listarPageable(this.pagina).subscribe( respuestabase => {
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
          
    this.roleservicio.listarPageable(this.pagina).subscribe(RespuestaBase => {
      this.cantidad = RespuestaBase.data[0].totalElements;
      this.dataSource = new MatTableDataSource( RespuestaBase.data[0].content);
      this.dataSource.sort = this.sort;
    });

  }

 

  openDialog(rol?: Rol) {

    let roldata = rol != null ? rol : new Rol();
    this.dialog.open(RolDialogComponent, {
      width: '800px',
      /*height: '400px',*/
      data: roldata
    })
    .afterClosed().subscribe( resultado => {      
      this.refrescarTabla();     
    }
    );
 
  } 
 
  
  elimiarRolDialog(rol?: Rol) {
    let roldata = rol != null ? rol : new Rol();
    this.dialog.open(EliminarRolDialogComponent, {
      width: '800px',
      height: '400px',
      data: roldata
    })
    .afterClosed().subscribe( resultado => {      
      this.refrescarTabla();     
    }
    );
  }

  activarRolDialog(rol?: Rol) {
 
  }


   
  refrescarTabla(){
    
    this.paginator._changePageSize(this.paginator.pageSize);
  }
 

}



