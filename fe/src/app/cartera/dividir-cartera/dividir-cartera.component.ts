import { Component, OnInit } from '@angular/core';
import {PeticionesService } from '../../services/peticiones.service';
import { Identity } from "../../services/global";
import { ActivatedRoute,Router,Route } from "@angular/router";


@Component({
  selector: 'app-dividir-cartera',
  templateUrl: './dividir-cartera.component.html',
  styleUrls: ['./dividir-cartera.component.css'],
  providers:[PeticionesService]
  
})
export class DividirCarteraComponent implements OnInit {

  public listaEjecutivos;
  public listado_personas;
  public events;
  public program;
  public lista_eventos=[];


  public listaEjecutivosChecked=[];
  public listaEventosChecked=[];

  constructor(

    private _peticionesService:PeticionesService,
    private router:Router  
  ) { }

  ngOnInit() {
    this._peticionesService.getAllEjecutivosOfSucursal(Identity).subscribe(response=>{
      this.listaEjecutivos=response;
      this.queryEvents();
    })

  }

  onSubmit(){
    this.listaEjecutivosChecked=[];
    this.listaEventosChecked=[];
    this.listado_personas=[];
    for(let unEjecutivo of this.listaEjecutivos){
      if(unEjecutivo.checked){
        this.listaEjecutivosChecked.push(unEjecutivo);
      }
    }
    for(let unEvento of this.lista_eventos){
      if(unEvento.checked){
        this.listaEventosChecked.push(unEvento);
      }
    }

    let objtsend={} as ObjToSend;
    objtsend.lista_ejecutivos=this.listaEjecutivosChecked;
    objtsend.lista_eventos=this.listaEventosChecked;
    this._peticionesService.getPersonsShareCarteraEvent(objtsend).subscribe(response=>{
      this.listado_personas=response;
    })




  }
  cancel(){

    for(let a of this.listaEjecutivos){
      a.checked=false;
    }
    this.listaEjecutivosChecked=[];
    for(let b of this.lista_eventos){
      b.checked=false;
    }
    this.listaEventosChecked=[];
    this.listado_personas=[];
    
  }
  queryEvents() {
    this._peticionesService.getAllEvents().subscribe(
       result => {
           console.log('hola')
          this.events = result;
         console.log(this.events)
          this.events.map(event => {
             var sum = 0;
             event.inscriptions.forEach(e => {
                if (e.state == 1) sum++;
             });
             event.cupos = event.total - sum;
          });


          for(let e of this.events){
              let eventoItem={}as EventoItem;

              eventoItem.name=e.name;
              eventoItem.date_start=e.date_start;
              eventoItem.cupos=e.total;
              eventoItem._id=e._id;
              eventoItem.programaId=e.programs;
              eventoItem.checked=false;
              eventoItem.listaInteres=e.interes;
              this._peticionesService.getProgram(e.programs).subscribe(result=>{
                  this.program=result;
                  eventoItem.programa=this.program.name;
                  this.lista_eventos.push(eventoItem);

              });

          }


       },
       error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
       }
    );
 }

}



export interface EventoItem{
  _id:string,
  name:string,
  date_start:Date,
  cupos:number,
  programa:string,
  programaId:string,
  checked:boolean,
  listaInteres:{},
}


export interface ObjToSend{

  lista_ejecutivos:{},
  lista_eventos:{}
}
