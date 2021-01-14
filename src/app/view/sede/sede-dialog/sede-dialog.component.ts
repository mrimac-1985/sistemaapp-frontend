import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sede-dialog',
  templateUrl: './sede-dialog.component.html',
  styleUrls: ['./sede-dialog.component.css']
})
export class SedeDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SedeDialogComponent>
  ) { }

  ngOnInit(): void {
    
  }


  cancelar(): void {
    this.dialogRef.close();
  }


}
