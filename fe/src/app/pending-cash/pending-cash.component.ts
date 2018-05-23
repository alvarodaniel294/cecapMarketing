import { Component, OnInit, } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd } from "@angular/router";
import {PeticionesService } from './../services/peticiones.service';
import { Identity, } from "./../services/global";
import { Location } from "@angular/common";
import { CashFlowOffices } from "./../modelo/cashFlowOffices";

@Component({
  selector: 'app-pending-cash',
  templateUrl: './pending-cash.component.html',
  styleUrls: ['./pending-cash.component.css'],
  providers:[PeticionesService]

})

export class PendingCashComponent implements OnInit {


  public cajas;
  public nuevasCajas=[];
  // public pendienteUsuario;
  // public pendienteFechaInicio;
  // public pendieteFechaFin;
  // public pendienteMonto;
  // public penditeState;
  public confirmedCashUser;
  public btnInactive=true;

  public cashOffice;
  public currentCashFlowOffice;


  public cashFlowOfficeAmount;
  public closeCashFlowOffice;


  public closedCashFlowUserFromManager;

  constructor(
    private _peticionesService:PeticionesService,
    private router: Router,
    private route: ActivatedRoute,
    private location:Location,
  ) {

    // this.cashOffice=new CashFlowOffices(new Date(),new Date(),null,null,'',new Date(),'','');
    ///cashFlowOffice(date_start,date_end,amount,amount_delivered,cashFLOWuSER,DATECLOSECASH,OFFICES)


     }

    

  ngOnInit() {


    this._peticionesService.getCashFlowUsersPending().subscribe(response=>{

      this.cajas=response;
      this.llenarCajasNuevas();
      console.log(this.cajas);



      
    })
  ///////obtenemos  cashflowoffice  de nuestro usuario que tiene su sucursal////
    this._peticionesService.getCurrentCashFlowOffice(Identity._id).subscribe(response=>{

      this.currentCashFlowOffice=response;

      this.cashFlowOfficeAmount=this.currentCashFlowOffice.amount;     

    })
  }
  

  llenarCajasNuevas(){

    for(let caja of this.cajas){

      let infoCaja={} as InfoCaja;
      var user;
      var username;
      this._peticionesService.getOneUser(caja.user).subscribe(response=>{
        user=response;
        username=user.name;
        infoCaja.usuario=username;

      })
      infoCaja.fechaInicio=caja.date_start;
      infoCaja.fechaFin=caja.date_end;
      infoCaja.monto=caja.amount;
      infoCaja.montoEntregado=caja.amount_delivered;
      infoCaja.idCaja=caja._id;
      infoCaja.estado=caja.state;
      this.nuevasCajas.push(infoCaja);

    }
    console.log(this.nuevasCajas);
  }
  infoPendiente(idCash){
    this.router.navigate(['home/pendientes/info/',idCash]);


  }

  cerrarCajaSucursal(){

    for(let caja of this.nuevasCajas){
      this._peticionesService.closeCashFlowUserFromManager(caja.idCaja).subscribe(response=>{


        this.closedCashFlowUserFromManager=response;
      })


    }
    this._peticionesService.closeCashFlowOffice(this.currentCashFlowOffice).subscribe(response=>{
      this.closeCashFlowOffice=response;

      this._peticionesService.addNewCashFlowOffice(Identity._id).subscribe(response=>{

        var newCashOffice=response;
      })
    })







  }
  // confirmarCaja(idCaja){

  //   this._peticionesService.confirmCashFlowUser(idCaja).subscribe(response=>{

  //     this.confirmedCashUser=response;

  //     this.cashOffice.offices=this.currentCashFlowOffice._id;
  //     this.cashOffice.cashFlowUser=this.confirmedCashUser;
  //     this.cashOffice.dateCloseCash=this.cashOffice.date_end;
  //     console.log("hihihihihihihihi")
  //     console.log(this.cashOffice);

     
      
  //     this.router.navigate(['home/pendientes']);
  //     this.router.navigate(['home/pendientes']);
  //     this.router.navigate(['home/pendientes']);
  //     this.router.navigate(['home/pendientes']);

      
      
  //   })
    

  // }
  

}


export interface InfoCaja{

  usuario:string,
  fechaInicio:Date,
  fechaFin:Date,
  monto:number,
  montoEntregado:number,
  idCaja:string,
  estado:number
}
