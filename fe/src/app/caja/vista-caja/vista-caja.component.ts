import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {PeticionesService } from '../../services/peticiones.service';
import { Identity, } from "../../services/global";
// import { runInThisContext } from 'vm';



@Component({
  selector: 'app-vista-caja',
  templateUrl: './vista-caja.component.html',
  styleUrls: ['./vista-caja.component.css'],
  providers:[PeticionesService]

})
export class VistaCajaComponent implements OnInit {

  public detalles;
  public cash;
  public total;

  constructor(
    private _peticionesService:PeticionesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this._peticionesService.getCashFlowUserByUser(Identity._id).subscribe(response=>{
      this.cash=response;

      console.log(this.cash);

      this.detalles=this.cash.details;
      this.total=this.cash.amount;
      console.log(this.detalles);
    });


  }

  goIngreso(){
    this.router.navigate(['/home/caja/ingreso']);
    

  }
  goEgreso(){

    this.router.navigate(['/home/caja/egreso']);
    
  }
  goCloseCash(){
    this._peticionesService.closeCashFlowUser(Identity._id).subscribe(response=>{

      this.cash=response;
      this.detalles=this.cash.details;
      this.total=this.cash.amount;
      
    })

  }

}
