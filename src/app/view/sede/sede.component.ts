import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {


  variablebooleana: boolean= false;
   miarray = [1,2,3,4,5,6,7,8,9];
   canasto = ["Manzanas", "Peras", "Platanos", "Frutillas"]
   estado = 1;
   
  constructor() { }

  ngOnInit(): void {
  }

}
