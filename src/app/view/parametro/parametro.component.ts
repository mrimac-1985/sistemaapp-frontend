import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  styleUrls: ['./parametro.component.css']
})
export class ParametroComponent implements OnInit {

  variablebooleana: boolean= true;


  miarray = [1,2,3,4,5,6,7,8,9];


  canasto = ["Manzanas", "Peras", "Platanos", "Frutillas"]


  estado : number = 654;

  cadena : string  ="fasdfasdfasd" ;

  constructor() { }


  ngOnInit(): void {
  }


  
}
