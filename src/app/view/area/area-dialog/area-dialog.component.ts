import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-area-dialog',
  templateUrl: './area-dialog.component.html',
  styleUrls: ['./area-dialog.component.css']
})
export class AreaDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AreaDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
