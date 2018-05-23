import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {PeticionesService } from '../../services/peticiones.service';
import { Identity, } from "../../services/global";
import { CashFlowOffices } from "./../../modelo/cashFlowOffices";




@Component({
  selector: 'app-info-pending-cash',
  templateUrl: './info-pending-cash.component.html',
  styleUrls: ['./info-pending-cash.component.css'],
  providers:[PeticionesService]
 
  
})
export class InfoPendingCashComponent implements OnInit {

  public pendingCashId;
  public cash;
  public detalles;
  public total;

  public btnInactiveConfirm;

  public confirmedCash;

  public cashOffice;

  public confirmedDetailCashOffice;

  public amountDeliveredCash;
  public amountDelivered;

  constructor(
    private _peticionesService:PeticionesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 

    this.cashOffice=new CashFlowOffices(new Date(),new Date(),null,null,'',new Date(),'','');


  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.pendingCashId = params.id;
     });

     this._peticionesService.getCashFlowUser(this.pendingCashId).subscribe(response=>{
      this.cash=response;
      this.detalles=this.cash.details;
      this.total=this.cash.amount;
      if(this.cash.state==1){

        this.btnInactiveConfirm=true;
      }

     })
  }
  onSubmit(){

    this.confirmPendingCash();
  }
  goPendingCash(){

    this.router.navigate(['home/pendientes']);
  }

  confirmPendingCash(){

    

      this.cash.amount_delivered=this.amountDelivered;
      this._peticionesService.setAmountDeliveredCashFlowUser(this.cash).subscribe(response=>{

               this.amountDeliveredCash=response;

              this._peticionesService.confirmCashFlowUser(this.pendingCashId).subscribe(response=>{
                      this.confirmedCash=response;
                      console.log(this.confirmedCash);


                    this.cashOffice.cashFlowUser=this.confirmedCash._id;
                    this.cashOffice.dateCloseCash=this.confirmedCash.date_end;
                    this.cashOffice.userOfCash=this.confirmedCash.user;
                    this._peticionesService.addDetailCashFlowOffice(this.cashOffice).subscribe(response=>{
                          this.confirmedDetailCashOffice=response;

                          this.router.navigate(['home/pendientes']);
                          this.router.navigate(['home/pendientes']);
                
                          this.router.navigate(['home/pendientes']);
                
                          this.router.navigate(['home/pendientes']);
                          this.router.navigate(['home/pendientes']);
                
                          this.router.navigate(['home/pendientes']);

                      })
            
          


              })

    })
  }
  setAmountDelivered(){

    this.cash.amount_delivered=this.amountDelivered;
    this._peticionesService.setAmountDeliveredCashFlowUser(this.cash).subscribe(response=>{

      this.amountDeliveredCash=response;
    })
  }
}
