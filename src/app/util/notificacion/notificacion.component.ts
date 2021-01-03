import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data : any,
  public snackBarRef : MatSnackBarRef<NotificacionComponent>
  ) { }

  
  ngOnInit(): void {
  }


  //https://www.youtube.com/watch?v=gO8rL5iXk-Y&ab_channel=CodehouseAcademy

  
}
