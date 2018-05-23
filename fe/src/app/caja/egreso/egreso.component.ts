import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import {PeticionesService } from '../../services/peticiones.service';
import { Identity, } from "../../services/global";
import { Cashflowusers } from "../../modelo/cashflowusers";


@Component({
  selector: 'app-egreso',
  templateUrl: './egreso.component.html',
  styleUrls: ['./egreso.component.css'],
  providers:[PeticionesService]
  
})
export class EgresoComponent implements OnInit {

  public egresoTitulo;
  public egresoDescripcion;
  public egresoEvent;
  public egresoRecibo;
  public egresoMonto;

  public egreso;

  public eventos;

  constructor(
    private _peticionesService:PeticionesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 

    this.egreso=new Cashflowusers(new Date(),new Date(),0,0,0,"","","","","")///(datestart,dateend,amount,amountdelivered,receipt,description,detailamount)

  }





  submitted = false;
  

  onSubmit() {
    
    this.submitted = true; 

    this.egreso.title=this.egresoTitulo;
    this.egreso.description=this.egresoDescripcion;
    this.egreso.events=this.egresoEvent;
    this.egreso.detail_amount=this.egresoMonto;
    this.egreso.receipt=this.egresoRecibo;
    this.egreso.user=Identity._id;

    // console.log(this.egreso);

    this._peticionesService.addCashFlowUserEgreso(this.egreso).subscribe(
      result => {
        var returned = result;
      //  console.log(returned)
       this.router.navigate(['home/caja/vistacaja']);
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        alert('Error al Crear cashflowuseringreso');
      }
    );
  }
  ngOnInit() {

    this._peticionesService.getEvents().subscribe(response =>{

      this.eventos=response;
      console.log(this.eventos);
    })
  }
  cancelar(){

    this.router.navigate(['home/caja/vistacaja']);
  }

}
