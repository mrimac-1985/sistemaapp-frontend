import { AreaService } from 'src/app/_service/area.service'
import { Area } from './../../_model/area'
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pageable } from 'src/app/_model/pageable';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AreaDialogComponent } from './area-dialog/area-dialog.component';
import { EliminarAreaDialogComponent } from './eliminar-area-dialog/eliminar-area-dialog.component';
import { NotificacionService } from 'src/app/util/notificacion.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  public dataSource: MatTableDataSource<Area>;
  public cantidad: number  = 0;

  pagina: Pageable;
  listaRoles : Area[];


  displayedColumns: string[] = ['nidarea',  'snombre', 'sobservacion',  'dfechareg', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    public areaservicio : AreaService,
    private notificacion : NotificacionService,
  ) { }

  ngOnInit(): void {

    this.cargarVariablesReactiva();

    /*traduce componetes de la tabla*/
    this.paginator._intl.itemsPerPageLabel= 'Areas por Página';
    this.paginator._intl.firstPageLabel='Primera Página';
    this.paginator._intl.lastPageLabel ='Última Página';
    this.paginator._intl.previousPageLabel ='Página Anterior';
    this.paginator._intl.nextPageLabel ='Página Siguiente';
 

   this.listarAreas(0 , 10);
   
  }

  listarAreas(page: number, side: number) {
     /*crea el objeto pagina*/
      this.pagina = new Pageable();
      this.pagina.pageNumber =page*side;
      this.pagina.pageSize =side;
      this.pagina.palabraClave="";


     this.areaservicio.listarPageable(this.pagina).subscribe( respuestabase => {
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
          
    this.areaservicio.listarPageable(this.pagina).subscribe(RespuestaBase => {
      this.cantidad = RespuestaBase.data[0].totalElements;
      this.dataSource = new MatTableDataSource( RespuestaBase.data[0].content);
      this.dataSource.sort = this.sort;
    });

  }

  openDialog(area?: Area) {
    let areadata = area != null ? area : new Area();
    this.dialog.open(AreaDialogComponent, {
      width: '800px',
      /*height: '400px',*/
      data: areadata
    })
    .afterClosed().subscribe( resultado => {      
      this.refrescarTabla();     
    }
    );
  }

  eliminarAreaDialog(area?: Area) {
    let areadata = area != null ? area : new Area();
    this.dialog.open(EliminarAreaDialogComponent, {
      width: '800px',
      height: '400px',
      data: areadata
    })
    .afterClosed().subscribe( resultado => {      
      this.refrescarTabla();     
    }
    );
  }

  activarAreaDialog(area?: Area) {
 
  }

  refrescarTabla(){
    
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  cargarVariablesReactiva() {
  
    /*MUESTRA MENSAJE*/
    this.areaservicio.mensajeCambio.subscribe(data => {

      this.notificacion.mostrarNotificacion(data,'OK','exito');
    }),(error : any) =>{

      this.notificacion.mostrarNotificacion(error,'OK','error');
    }; 

  }
}
