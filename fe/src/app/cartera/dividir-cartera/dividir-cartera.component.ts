import { Component, OnInit } from '@angular/core';
import {PeticionesService } from '../../services/peticiones.service';
import { Identity } from "../../services/global";
import { ActivatedRoute,Router,Route } from "@angular/router";
import { Angular5Csv } from 'angular5-csv/Angular5-csv';


@Component({
  selector: 'app-dividir-cartera',
  templateUrl: './dividir-cartera.component.html',
  styleUrls: ['./dividir-cartera.component.css'],
  providers:[PeticionesService]
  
})
export class DividirCarteraComponent implements OnInit {

  public listaEjecutivos;
  public listado_personas=[];
  public events;
  public program;
  public lista_eventos=[];
  public numeroParaDividir;
  public enablePrint=false;
  public lista_lista_personas=[];
  public listadepersonasReturned;
  public listaEjecutivosChecked=[];
  public listaEventosChecked=[];
  
  public listaGeneral=true;
  public numTotal;

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
      this.listadepersonasReturned=response
      this.listado_personas=this.listadepersonasReturned;
      this.numTotal=this.listado_personas.length;



      this.enablePrint=true;
     
       

        
      // console.log(this.lista_lista_personas)
    })

   



  }
  dividir(){


    if(this.numeroParaDividir>this.numTotal){
      window.alert("El numero debe ser menor o igual a "+ this.numTotal)

    }else{
      
      this.lista_lista_personas=[];
      this.listaGeneral=false;
      this.enablePrint=true;
      
      let dividido=Math.floor(this.lista_lista_personas.length/this.numeroParaDividir)
      let numDeListas=this.numeroParaDividir;

      for(let i=0 ;i<numDeListas;i++){
        let lista=[];
        this.lista_lista_personas.push(lista);
      }
      console.log(this.lista_lista_personas);
      let res=llenado(this.listado_personas,this.lista_lista_personas);
      console.log(this.lista_lista_personas);
    }
    


  }
  deshacerDividir(){
    this.listaGeneral=true;
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
    this.listadepersonasReturned=[];
    this.lista_lista_personas=[];
    this.listaGeneral=true;
    this.numeroParaDividir=undefined;
    this.enablePrint=false;

    
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
 imprimir(listaToExport){

  console.log(listaToExport);
  let lista=[];
  for(let i of listaToExport){
    let newPerson={}as PersonToExport;
    newPerson.first_name=i.first_name;
    newPerson.last_name=i.last_name;    
    newPerson.celular=i.cellphone;
    newPerson.email=i.email;
    newPerson.telefono=i.phone;
    newPerson.city=i.city;
    newPerson.whatsapp_group=i.whatsapp_group
    lista.push(newPerson);
  }

  let options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    showTitle: false,
    useBom: true,
    // noDownload: true,
    // headers: ["NOMBRES", "APELLIDOS", "CIUDAD", "CELULAR", "Móvil"]
    headers: [
      // (<HTMLInputElement>document.getElementById(elementId)).value,
      (<HTMLInputElement>document.getElementById('PrimerNombre')).value,
      (<HTMLInputElement>document.getElementById('Apellido')).value,
      (<HTMLInputElement>document.getElementById('Celular')).value,
      (<HTMLInputElement>document.getElementById('email')).value,
      (<HTMLInputElement>document.getElementById('Telefono')).value,
      (<HTMLInputElement>document.getElementById('Ciudad')).value,
      (<HTMLInputElement>document.getElementById('whatsapp_group')).value,
      
    ]
  };

   let toExportCarteraShared=new Angular5Csv(lista,"carteraToExport",options)

 }

}


function llenado(listaP,listaParaLlenar){

  if(listaP.length==0){
    return listaParaLlenar;
  }
  else{
    for(let i of listaParaLlenar){
      if(listaP.length==0){
        return listaParaLlenar
      }else{
        i.push(listaP.pop());

      }
    }
    llenado(listaP,listaParaLlenar);
  }
  // console.log(listaParaLlenar);
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
export interface PersonToExport{

  first_name:string,
  last_name:string,
  celular:number,
  telefono:number,
  email:string,  
  whatsapp_group:string,
  city:string,



}
