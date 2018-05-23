import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../services/sucursal.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {

  public sucursales;
  constructor(
    private _peticionSucursalService: SucursalService,
     private route: ActivatedRoute,
     private router: Router
  ) { }

  ngOnInit() {
    this.querySucursales();
  }
  sendEdit(){
    
  }
  querySucursales(){
      this._peticionSucursalService.getSucursales().subscribe(
        result => {
          this.sucursales = result;
         console.log(this.sucursales);
        },
        error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
          alert('Error ');
        }
      );
  }
  verSucursal(id:String){
    //console.log("facilitadorComponent");
    this.router.navigate(['/home/sucursal/detalleCaja/', id]);
    }
}
