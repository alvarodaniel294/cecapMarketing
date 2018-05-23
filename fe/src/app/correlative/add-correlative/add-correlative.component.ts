import { Component, OnInit } from '@angular/core';
import { Correlativo } from '../../modelo/correlativo';
import {PeticionesService } from '../../services/peticiones.service';
import { Router,ActivatedRoute } from "@angular/router";
import { Receipt } from '../../modelo/receipts';



@Component({
  selector: 'app-add-correlative',
  templateUrl: './add-correlative.component.html',
  styleUrls: ['./add-correlative.component.css'],
  providers:[PeticionesService]
})
export class AddCorrelativeComponent implements OnInit {
 public correlativo: Correlativo;
 public receipt: Receipt;
  constructor(
    private _peticionesService:PeticionesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.receipt = new Receipt(1233, 1000, "recivo de caja");
    this.correlativo = new Correlativo(null,null,this.receipt);
   }

  ngOnInit() {
  }
  guardar(){
      console.log(this.correlativo);
      this._peticionesService.addCorrelative(this.correlativo).subscribe(response=>{
      //this.router.navigate(['/home/ejecutivo/']); 
      },error=>{
          var errorMessage=<any>error;
          console.log(errorMessage);
      })
  }
  cancel(){
    this.router.navigate(['home/events']);
  }
}
