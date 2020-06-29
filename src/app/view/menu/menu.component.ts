import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Menu } from 'src/app/_model/menu';
import { MenuService } from 'src/app/_service/menu.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


    
  cantidad: number = 0;
  dataSource: MatTableDataSource<Menu>;

  displayedColumns: string[] = ['nidmenu',  'modulo', 'snombremenu', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  
  constructor(
    private menuService: MenuService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.cargarVariablesReactiva();

    this.listarMenu();
    

  }


  listarMenu() {

    this.menuService.listarMenu(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(data.content);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('dataaaaaa menu');
      console.log(data.content);

    });

    /*this.generoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/
  }



  cargarVariablesReactiva() {
    this.menuService.listaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.menuService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });
  }



  openDialog(menu?: Menu) {
     
  }

  eliminar(menu?: Menu) {
     
  }

  filter(x: string) {
    this.dataSource.filter = x.trim().toLowerCase();
  }


  mostrarMas(e: any) {
    //console.log(e);
    this.menuService.listarMenu(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(data.content);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }



}
