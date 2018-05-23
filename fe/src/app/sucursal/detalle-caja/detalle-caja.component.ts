import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { SucursalService } from '../../services/sucursal.service';

@Component({
  selector: 'app-detalle-caja',
  templateUrl: './detalle-caja.component.html',
  styleUrls: ['./detalle-caja.component.css'],
  providers: [ SucursalService]
})
export class DetalleCajaComponent implements OnInit {
  public collection ;
  public office;
  public officeId;
  constructor(
    private _peticionesServiceSucursal: SucursalService,
    private route: ActivatedRoute,
    public router: Router
  ) { 
     this.collection = ["RRHH", "Medio Ambiente", "derecho"];
  }

  ngOnInit() {
    this.querySucursal();
  }
 
  querySucursal(){
    this.route.params.subscribe(params => {
      this.officeId = params.id;
      console.log(this.officeId);
     });
    this._peticionesServiceSucursal.getSucursal(this.officeId).subscribe(
         result => {
            this.office = result;
            console.log(this.office);
         },
         error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
         }
      );
  }
}
