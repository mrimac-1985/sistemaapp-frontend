import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil-dialog',
  templateUrl: './perfil-dialog.component.html',
  styleUrls: ['./perfil-dialog.component.css']
})
export class PerfilDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<PerfilDialogComponent>
  ) { }

  ngOnInit(): void {
  }
  

  cancelar(): void {
    this.dialogRef.close();
  }
}
