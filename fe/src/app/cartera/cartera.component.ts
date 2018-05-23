import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeticionesService } from '../services/peticiones.service';
import { Person } from '../modelo/person';
import { Identity, Roles } from "../services/global";
// import { forEach } from '@angular/router/src/utils/collection';
// import { Identity } from "../services/global";
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.css'],
  providers: [ PeticionesService]
  
})
export class CarteraComponent implements OnInit {

  public carteras;
  public role;
  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private _peticionesService: PeticionesService
  ) { }
  
  ngOnInit() {

    this._peticionesService.getCarteras().subscribe(response=>{
      this.carteras=response;
    });
    this.queryRol();
  }
  addCartera(){
    this.router.navigate(['/home/cartera/add']);
  }
  send(_id:string){
    // console.log(_id);
    this.router.navigate(['/home/cartera',_id]);
  }
  editCartera(_name:string){
    console.log("carteracomponent");
    this.router.navigate(['/home/cartera/edit',_name]);
    console.log("router.navigate");
  }

  queryRol(){
    console.log(Identity.rol)
      this._peticionesService.getRole(Identity.rol).subscribe(
     result => {
      this.role = result;
     },
     error=>{
      var errorMessage = <any>error;
      console.log(errorMessage);
     }
 );
 }

}
