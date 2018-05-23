import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd } from "@angular/router";
import {PeticionesService } from './../services/peticiones.service';
import { Identity, } from "./../services/global";
import { CashFlowOffices } from "./../modelo/cashFlowOffices";

@Component({
  selector: 'app-offices-cash',
  templateUrl: './offices-cash.component.html',
  styleUrls: ['./offices-cash.component.css'],
  providers:[PeticionesService]

})
export class OfficesCashComponent implements OnInit {

  public offices;
  public nuevasCajasOffices=[];

  constructor(
    private _peticionesService:PeticionesService,
    private router: Router,
    private route: ActivatedRoute,


  ) { }

  ngOnInit() {


    this._peticionesService.getCashFlowOffices().subscribe(result=>{

      this.offices=result;
      this.llenarCajasNuevas();

      console.log(this.offices)
    })
  }
  llenarCajasNuevas(){

    for(let caja of this.offices){


      let infoCajaSucursal= {} as InfoSucursal;
      var user;
      console.log(caja);
      var username;
      this._peticionesService.getOneUser(caja.users).subscribe(response=>{
        user=response;
        username=user.name;
        infoCajaSucursal.usuario=username;

      });
      infoCajaSucursal.fechaInicio=caja.date_start;
      infoCajaSucursal.fechaFin=caja.date_end;
      infoCajaSucursal.monto=caja.amount;
      infoCajaSucursal.montoEntregado=caja.amount_delivered;
      infoCajaSucursal.idCajaSucursal=caja._id;
      infoCajaSucursal.idSucursal=caja.offices;

      var office;
      this._peticionesService.getSucursal(caja.offices).subscribe(response=>{
        office=response;
        infoCajaSucursal.nameSucursal=office.name;

      })
      infoCajaSucursal.estado=caja.state;
      this.nuevasCajasOffices.push(infoCajaSucursal);
      console.log(infoCajaSucursal);
    }


    // console.log(this.nuevasCajasOffices);
  }

}


export interface InfoSucursal{

  usuario:string,
  fechaInicio:Date,
  fechaFin:Date,
  monto:number,
  montoEntregado:number,
  idCajaSucursal:string,
  idSucursal:string,
  nameSucursal:string,
  estado:number,
}

