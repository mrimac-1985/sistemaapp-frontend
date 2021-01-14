import { MatDialog } from '@angular/material/dialog'
import { SedeService } from './../../_service/sede.service'
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pageable } from 'src/app/_model/pageable';
import { Sede } from 'src/app/_model/sede';
import { SedeDialogComponent } from './sede-dialog/sede-dialog.component';
import { EliminarSedeDialogComponent } from './eliminar-sede-dialog/eliminar-sede-dialog.component';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {

  public dataSource: MatTableDataSource<Sede>;
  public cantidad: number  = 0;

  pagina: Pageable;
  listaSedes : Sede[];


  displayedColumns: string[] = ['nidsede',  'snombre', 'sdireccion', 'subigeo', 'dfechareg', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialog : MatDialog,
    public sedeservicio : SedeService
  ) { }

  ngOnInit(): void {

     /*traduce componetes de la tabla*/
     this.paginator._intl.itemsPerPageLabel= 'Sedes por Página';
     this.paginator._intl.firstPageLabel='Primera Página';
     this.paginator._intl.lastPageLabel ='Última Página';
     this.paginator._intl.previousPageLabel ='Página Anterior';
     this.paginator._intl.nextPageLabel ='Página Siguiente';

    this.listarSedes(0 , 10)
  }

  listarSedes(page: number, side: number) {
    /*crea el objeto pagina*/
    this.pagina = new Pageable();
    this.pagina.pageNumber =page*side;
    this.pagina.pageSize =side;
    this.pagina.palabraClave="";

    this.sedeservicio.listarPageable(this.pagina).subscribe( respuestabase => {
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
          
    this.sedeservicio.listarPageable(this.pagina).subscribe(RespuestaBase => {
      this.cantidad = RespuestaBase.data[0].totalElements;
      this.dataSource = new MatTableDataSource( RespuestaBase.data[0].content);
      this.dataSource.sort = this.sort;
    });

  }

  openDialog(sede?: Sede) {
    let sededata = sede != null ? sede : new Sede();
    this.dialog.open(SedeDialogComponent, {
      width: '700px',
      data: sededata
    })
    .afterClosed().subscribe( resultado => {      
      this.refrescarTabla();     
    }
    );
  }

  eliminarSedeDialog(sede?: Sede) {
    let sededata = sede != null ? sede : new Sede();
    this.dialog.open(EliminarSedeDialogComponent, {
      width: '800px',
      height: '400px',
      data: sededata
    })
    .afterClosed().subscribe( resultado => {      
      this.refrescarTabla();     
    }
    );
  }

  activarSedeDialog(sede?: Sede) {
 
  }

  refrescarTabla(){
    
    this.paginator._changePageSize(this.paginator.pageSize);
  }

}
