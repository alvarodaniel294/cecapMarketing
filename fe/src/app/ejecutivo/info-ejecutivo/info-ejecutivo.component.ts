import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { ActivatedRoute,Router } from "@angular/router";
import { User} from '../../modelo/user';
import {  } from "../";

@Component({
  selector: 'app-info-ejecutivo',
  templateUrl: './info-ejecutivo.component.html',
  styleUrls: ['./info-ejecutivo.component.css'],
  providers: [ PeticionesService ]
  
})
export class InfoEjecutivoComponent implements OnInit {

  public ejecutivo;
  public ejecutivoId;
  public carteras;
  public sucursales;
  public rolUser;
  public carteraReturned;
  public sucursalReturned;

  constructor(

    private _peticionesService: PeticionesService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {

    this._peticionesService.getCarteras().subscribe(response=>{
      this.carteras=response;
      console.log(this.carteras);
    });
    this._peticionesService.getSucursales().subscribe(response=>{
      this.sucursales=response;
      console.log(this.sucursales)
    });
    this.queryEjecutivoId();
    this.findEjecutivo();
  }
  queryEjecutivoId(){
    this.route.params.subscribe(params => {
    this.ejecutivoId=params.id;
    console.log(this.ejecutivo);
 });
}

  findEjecutivo(){
    this._peticionesService.getOneUser(this.ejecutivoId).subscribe(
       result =>{
         this.ejecutivo=result;
         console.log(this.ejecutivo);
         this.findRol(this.ejecutivo.rol);
         
       },
       error =>{
         console.log(<any>error);
       });
 }

 findRol(idRol){
   console.log(idRol);

  this._peticionesService.getRole(idRol).subscribe(
    result =>{

      this.rolUser=result;
      console.log(this.rolUser)
      this.findCartera(this.ejecutivoId);
    },
    error =>{
      console.log(<any>error);
    });
 }
 findCartera(ejecutivoId){
    this._peticionesService.getCarteraFromUserId(ejecutivoId).subscribe(
    result =>{

      this.carteraReturned=result;
      console.log(this.carteraReturned)

      this.findSucursal(this.ejecutivo.offices);
    },
    error =>{
      console.log(<any>error);
    });

 }
 findSucursal(sucursalId){

  console.log(sucursalId);
    this._peticionesService.getSucursal(sucursalId).subscribe(
    result =>{

      this.sucursalReturned=result;
      console.log(this.sucursalReturned)

     
    },
    error =>{
      console.log(<any>error);
    });

 }
 goEjecutivoList(){

  // this.router.navigate(['home/ejecutivo']);
  window.history.back();

 }

}
