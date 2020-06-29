import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-cerrarsesion',
  templateUrl: './dialog-cerrarsesion.component.html',
  styleUrls: ['./dialog-cerrarsesion.component.css']
})
export class DialogCerrarsesionComponent implements OnInit {

  constructor(
    private router: Router,
    private dialogo: MatDialogRef<DialogCerrarsesionComponent>,
  ) { }

  ngOnInit(): void {
  }


  cerrarDialogo(){
    this.dialogo.close(false);
  }


  confirmado(){
    this.dialogo.close(true);
    
  }


}
