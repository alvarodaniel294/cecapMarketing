import { Component, OnInit } from '@angular/core';
import {PeticionesService } from './../services/peticiones.service';
import { Identity,CarteraS } from "./../services/global";
import { ActivatedRoute,Router,Route } from "@angular/router";


@Component({
  selector: 'app-reporte-events',
  templateUrl: './reporte-events.component.html',
  styleUrls: ['./reporte-events.component.css'],
  providers:[PeticionesService],
  
})
export class ReporteEventsComponent implements OnInit {


  public fechaInicio;
  public fechaFin;
  public events;
  public program;
  public lista_eventos=[];
  public showReporteEvento;

  constructor(

    private _peticionesService:PeticionesService,
    private router:Router  
    
  ) { }

  ngOnInit() {
  }


  onSubmit(){
    
    this.lista_eventos=[];
    this.showReporteEvento=null;
    this.filterByDates(this.fechaInicio,this.fechaFin);


  }
  
  filterByDates(fecha_ini:Date,fecha_fin:Date){
 
    let fechas={} as FechasObj;
    fechas.fecha_ini=fecha_ini;
    fechas.fecha_fin=fecha_fin;
    fechas.identity=Identity;
    this._peticionesService.getEventsFilterByDates(fechas).subscribe(res=>{
      this.events=res;
      for(let e of this.events){
        let eventoItem={}as EventoItem;

        eventoItem.name=e.name;
        eventoItem.date_start=e.date_start;
        eventoItem.cupos=e.total;
        eventoItem._id=e._id;
        eventoItem.programaId=e.programs;
        this._peticionesService.getProgram(e.programs).subscribe(result=>{
            this.program=result;
            eventoItem.programa=this.program.name;
            this.lista_eventos.push(eventoItem);

        });

    }
      
    })

  }

  cancel(){
    window.history.back();
  }
  reporteEvento(eventId:string){
    this.showReporteEvento=null;
    this._peticionesService.getReportEvent(eventId).subscribe(resp=>{
      this.showReporteEvento=resp;
      console.log(this.showReporteEvento);
    })

  }

}

export interface FechasObj{
  fecha_ini:Date,
  fecha_fin:Date,
  identity:{},
}
export interface EventoItem{
  _id:string,
  name:string,
  date_start:Date,
  cupos:number,
  programa:string,
  programaId:string,
}

