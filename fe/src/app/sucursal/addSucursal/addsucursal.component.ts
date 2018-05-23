import { Component, OnInit } from '@angular/core';
import { Offices } from '../../modelo/offices';
import { SucursalService } from '../../services/sucursal.service';
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-addsucursal',
  templateUrl: './addsucursal.component.html',
  styleUrls: ['./addsucursal.component.css']
})
export class AddSucursalComponent implements OnInit {

  public office: Offices;
  public companys;
  constructor(
      private _peticionSucursalService: SucursalService,
     private route: ActivatedRoute,
     private router: Router
   ) {
    this.office = new Offices('','',null,'',null);//name,ubicacion,caja,departament,company_id
   }

  ngOnInit(){
    this.queryCompany();
  }
  onSubmit(){
    console.log(this.office);
    this._peticionSucursalService.addOffice(this.office).subscribe(
      result => {
        var esperado = result;
       // console.log(esperado);
       // this.router.navigate(['home/event', this.eventId]);
        alert('Se Creo correctamente la Sucursal');
        this.router.navigate(['home/sucursal']);
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        alert('Error al Crear Sucursal verifique los datos');
      }
    );
  } 
  queryCompany(){
    this._peticionSucursalService.getCompanys().subscribe(
      result => {
        this.companys = result;
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        alert('No existe compañia');
      }
    );
  }
  cancelar() {
    this.router.navigate(['home/sucursal']);
  }
}
