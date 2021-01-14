import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rol-dialog',
  templateUrl: './rol-dialog.component.html',
  styleUrls: ['./rol-dialog.component.css']
})
export class RolDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<RolDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
