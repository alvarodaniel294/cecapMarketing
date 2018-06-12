import { Component, OnInit } from '@angular/core';
import {PeticionesService } from './../services/peticiones.service';
import { Identity,CarteraS } from "./../services/global";
import { ActivatedRoute,Router,Route } from "@angular/router";




@Component({
  selector: 'app-reports-ejecutivos',
  templateUrl: './reports-ejecutivos.component.html',
  styleUrls: ['./reports-ejecutivos.component.css'],
  providers:[PeticionesService]
  
  
})
export class ReportsEjecutivosComponent implements OnInit {

  public currentUser;
  public listaUsersOfOffices;
  public listaRegistrados=[];
  public listaRegistradosReturned;
  public listaInscritos=[];
  public listaInscritosReturned;
  public fechaFin=new Date();
  public fechaInicio=new Date(this.fechaFin.getFullYear(),this.fechaFin.getMonth()-3,this.fechaFin.getDay())

  public listaReporteUsuarios=[];
  constructor(

      private _peticionesService:PeticionesService,
      private router:Router  
      
  ) { }

  ngOnInit() {
    this._peticionesService.getOneUser(Identity._id).subscribe(response=>{
      this.currentUser=response;

          this._peticionesService.getAllEjecutivosOfSucursal(Identity).subscribe(res=>{
            this.listaUsersOfOffices=res;
            console.log(this.listaUsersOfOffices);
            for(let u of this.listaUsersOfOffices){
                console.log(u)
                let item={}as ItemReport;
                item.user=u.userName;
                item.cartera=u.carteraName;
                this._peticionesService.reporteTrimestralInscritosEjecutivos(u).subscribe(reporte=>{
                  this.listaInscritosReturned=reporte;
                  this.listaInscritos=this.listaInscritosReturned
                  item.cantidadInscritos=this.listaInscritos.length;
                  
                
                  this._peticionesService.reporteTrimestralEjecutivos(u).subscribe(res=>{
                    this.listaRegistradosReturned=res;
                    this.listaRegistrados=this.listaRegistradosReturned;
                    item.cantidadRegistrados=this.listaRegistrados.length;
                    this.listaReporteUsuarios.push(item);
                  })
              })
              
            }
            
          })
      


      })

  

      console.log(this.listaReporteUsuarios);


  }
  onSubmit(){

  }
  cancel(){


  }


}
export interface ItemReport{
  user:string,
  cartera:string,
  cantidadRegistrados:number,
  cantidadInscritos:number,

}
