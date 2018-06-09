import { Component, OnInit } from '@angular/core';
import {PeticionesService } from '../../services/peticiones.service';
import { Identity } from "../../services/global";
import { ActivatedRoute,Router,Route } from "@angular/router";


@Component({
  selector: 'app-dividir-cartera',
  templateUrl: './dividir-cartera.component.html',
  styleUrls: ['./dividir-cartera.component.css'],
  providers:[PeticionesService]
  
})
export class DividirCarteraComponent implements OnInit {

  public listaEjecutivos;
  public listado_personas;

  constructor(

    private _peticionesService:PeticionesService,
    private router:Router  
  ) { }

  ngOnInit() {
    this._peticionesService.getAllEjecutivosOfSucursal(Identity).subscribe(response=>{
      this.listaEjecutivos=response;
    })

  }

  onSubmit(){

  }
  cancel(){
    
  }

}
