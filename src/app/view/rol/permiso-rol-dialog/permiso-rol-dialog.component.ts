import { RolProcedimiento } from './../../../_model/rolprocedimiento';
import { RolService } from './../../../_service/rol.service';
import { RolMenuDTO } from './../../../_model_dto/rolmenuDto';
import { Procedimiento } from './../../../_model/procedimiento';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Menu } from 'src/app/_model/menu';
import { MenuService } from 'src/app/_service/menu.service';
import { Task } from '../rol-dialog/rol-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Rol } from 'src/app/_model/rol';

@Component({
  selector: 'app-permiso-rol-dialog',
  templateUrl: './permiso-rol-dialog.component.html',
  styleUrls: ['./permiso-rol-dialog.component.css']
})
export class PermisoRolDialogComponent implements OnInit {

  menusubmenu : Menu[];
  position: number;
  numRowsx : number = 0;
  
  roldialog : Rol;


  rolmenu : RolMenuDTO;

  rolprocedimiento : RolProcedimiento;

  listarolprocedimiento : RolProcedimiento[];

  public dataSource: MatTableDataSource<Procedimiento>;

  displayedColumns: string[] = ['select','sdescripcion' ];
  
  selection = new SelectionModel<Procedimiento>(true, []);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data_dialog: Rol,
    private dialogRef: MatDialogRef<PermisoRolDialogComponent>,
    public menuservice: MenuService,
    private rolservicio : RolService
  ) { }

  ngOnInit(): void { 
    this.roldialog = new Rol();
    
    this.roldialog = this.data_dialog;

    this.listarMenuSubmenu();
  }



  listarMenuSubmenu() {
    this.menuservice.listarMenuSubmenu().subscribe(respuestabase=>{
      this.menusubmenu = respuestabase.data;    

    });
  }


  
  cancelar(): void {
    this.dialogRef.close();
  }


  consultarPermiso(idmenu: number) :void {

    this.selection.clear();
    this.numRowsx = 0; 

    this.rolmenu = new RolMenuDTO();
    this.rolmenu.nidmenu = idmenu
    this.rolmenu.nidrol =  this.roldialog.nidrol ; 

    this.menuservice.consultapermisomenu(this.rolmenu).subscribe(respuestabase =>{
      this.dataSource = new MatTableDataSource(respuestabase.data); 
      this.numRowsx = this.dataSource.data.length;

      this.dataSource.data.forEach(row => {
        if(row.bactivo == true){
          this.selection.select(row)
        }        
      }  
        );

    });
    

  }


/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.numRowsx ; //this.dataSource.data.length;
  return numSelected === numRows;
}


/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {

  let boleandato :boolean ;
  this.isAllSelected() ? boleandato = false: boleandato = true;
  
  /*cargar todo*/
  let procedimiento : RolProcedimiento ;
  this.listarolprocedimiento = new Array();
 
 this.dataSource.data.forEach(row => {
    procedimiento = new RolProcedimiento();
    procedimiento.nidprocedimiento = row.nidprocedimiento;
    procedimiento.nidrol = this.roldialog.nidrol;
    procedimiento.bactivo = boleandato;
    this.listarolprocedimiento.push(procedimiento)
     
    }  
  );
    
  this.rolservicio.registrarrolprocedimientolista(this.listarolprocedimiento).subscribe(respuestabase =>{
      console.log(respuestabase.mensaje);
  } );
 

  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }




/** The label for the checkbox on the passed row */
checkboxLabel(row?: Procedimiento): string {

  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.nidprocedimiento + 1}`;
}









  //   valueChange(model.units, unit, $event) {
//     //set the two-way binding here for the specific unit with the event
//     model.units[unit].checked = $event.checked;
// }


  // task: Task = {
  //   name: 'Indeterminate',
  //   completed: false,
  //   color: 'primary',
  //   subtasks: [
  //     {name: 'Primary', completed: false, color: 'primary'},
  //     {name: 'Accent', completed: false, color: 'accent'},
  //     {name: 'Warn', completed: false, color: 'warn'}
  //   ]
  // };
  
  

  allComplete: boolean = false;


  RegistrarPermiso(row: Procedimiento){
 
    let boleandato :boolean ;
    this.selection.isSelected(row) ? boleandato = false: boleandato = true;
  
    /*cargar todo*/ 
    this.listarolprocedimiento = new Array();
 
    this.rolprocedimiento = new RolProcedimiento();
    this.rolprocedimiento.nidprocedimiento = row.nidprocedimiento;
    this.rolprocedimiento.nidrol = this.roldialog.nidrol;
    this.rolprocedimiento.bactivo = boleandato;
    
    this.listarolprocedimiento.push(this.rolprocedimiento);
 
    this.rolservicio.registrarrolprocedimientolista(this.listarolprocedimiento).subscribe(respuestabase =>{
      console.log(respuestabase.mensaje);
    } );
  
    
  }
  

  // updateAllComplete() {
  //   this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  // }

  // someComplete(): boolean {
  //   if (this.task.subtasks == null) {
  //     return false;
  //   }
  //   return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  // }

  // setAll(completed: boolean) {
  
  //   this.allComplete = completed;
  //   if (this.task.subtasks == null) {
  //     return;
  //   }
  //   this.task.subtasks.forEach(t => t.completed = completed);
  // }


}
