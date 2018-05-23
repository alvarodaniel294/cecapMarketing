import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import {PeticionesService } from '../../services/peticiones.service';
import { Identity, } from "../../services/global";
import { Cashflowusers } from "../../modelo/cashflowusers";

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css'],
  providers:[PeticionesService]
  
})
export class IngresoComponent implements OnInit {


  public ingresoTitulo;
  public ingresoDescripcion;
  public ingresoEvent;
  // public ingresoNombreInscrito;
  // public ingresoCi;
  public ingresoRecibo;
  public ingresoDetailMonto;
  public ingreso;
  public eventos;

  // public ingreso:Cashflowusers;

  constructor(
    private _peticionesService:PeticionesService,
    private router: Router,
    private route: ActivatedRoute,



  ) {
    this.ingreso=new Cashflowusers(new Date(),new Date(),0,0,0,"","","","","")///(datestart,dateend,amount,amountdelivered,receipt,description,detailamount)

   }


  submitted = false;
 

  ngOnInit() {

    this._peticionesService.getEvents().subscribe(response =>{

      this.eventos=response;
      console.log(this.eventos);
    })

  }

  onSubmit() { 
    this.submitted = true;
    
    this.ingreso.date_start=new Date;
    this.ingreso.date_end=new Date;
    this.ingreso.receipt=this.ingresoRecibo;
    this.ingreso.description=
    
                              // "Titulo : "+this.ingresoTitulo+"\n"+
                              // "Nombre Inscrito : "+this.ingresoNombreInscrito+"\n"+
                              // "Ci : "+this.ingresoCi+"\n"+
                              // "Descripcion: "+
                              
                              this.ingresoDescripcion;
    this.ingreso.detail_amount=this.ingresoDetailMonto;
    this.ingreso.user=Identity._id;
    this.ingreso.title=this.ingresoTitulo;
    this.ingreso.events=this.ingresoEvent;


    // console.log(this.ingreso);
    // console.log(Identity._id);

    this._peticionesService.addCashFlowUserIngreso(this.ingreso).subscribe(
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
 

}
