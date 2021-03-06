import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { PeticionesService } from '../../services/peticiones.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Pipe, PipeTransform } from '@angular/core';
import { Identity } from '../../services/global';

import { Angular5Csv } from 'angular5-csv/Angular5-csv';


@Component({
  selector: 'app-persons-of-events',
  templateUrl: './persons-of-events.component.html',
  styleUrls: ['./persons-of-events.component.css'],
  providers: [PersonaService, PeticionesService]


})
export class PersonsOfEventsComponent implements OnInit {


  public eventId;
  public event;
  public lista_personas = [];
  public lista_personasPorInteres = [];
  public listaInteres;
  public persona;
  public listaReturned;
  private listaToExport = [];
  public rol;
  //////////////////////////////////////////////////////////////
  public page;
  public total;
  public totalPag;
  public mostrar = [];
  //////////////////////////////////////////////////////////////

  // public listaToExport=[];
  public toExport;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _personaService: PersonaService,
    private _peticionesService: PeticionesService



  ) { }

  ngOnInit() {
    this.queryRol();
    this.route.params.subscribe(params => {
      this.eventId = params.id;
      // this.loadPersons2();
      this.loadPersonsByCartera();
    })


  }
  dis(){
    this.page = this.page-1;
    var inicio = (7*(this.page-1));
    var final = (7*(this.page-1))+7;
    this.mostrar = [];
    for(var a = inicio  ; a < final ; a++ ){
      this.mostrar.push(this.lista_personasPorInteres[a]);
  }
  }
  aum(){
    this.page = this.page+1;
    console.log(this.page)
    var inicio = (7*(this.page-1));
    console.log(inicio)
    var final = (7*(this.page-1))+7;
    if(final > this.total){
      final = this.total;
    }
    console.log(final)
    this.mostrar = [];
    for(var a = inicio  ; a < final ; a++ ){
        this.mostrar.push(this.lista_personasPorInteres[a]);
    }
  }
  mostrarPer(){
    this.page = 1;
    this.total = this.lista_personasPorInteres.length;
    this.totalPag = Math.ceil(this.total/7);
    this.mostrar = []
    console.log(this.totalPag)
    if(this.totalPag > 1){
      for(var a = 0 ; a < 7 ; a++){
      this.mostrar.push(this.lista_personasPorInteres[a]) ;}
    } else{
      this.mostrar = this.lista_personasPorInteres;
    }
    
  }
  loadPersonsByCartera() {

    this.lista_personasPorInteres = [];
    this._peticionesService.getEvent(this.eventId).subscribe(res => {
      this.event = res;

      let eventIdPersonId = {} as EventIdPersonId;
      eventIdPersonId.event = this.event;
      eventIdPersonId.identity = Identity;
      this._peticionesService.getPersonasInteresWithEventByCartera(eventIdPersonId).subscribe(res => {
        this.listaReturned = res;
        this.lista_personasPorInteres = this.listaReturned;
        this.mostrarPer();
        // console.log(this.lista_personasPorInteres)
      })

    })




  }

  loadPersons2() {
    this.lista_personasPorInteres = [];
    this._peticionesService.getEvent(this.eventId).subscribe(response => {
      this.event = response;
      this._peticionesService.getPersonasInteresWithEvent(this.event).subscribe(res => {
        this.listaReturned = res;
        this.lista_personasPorInteres = this.listaReturned;
      })
    })

  }

  loadPersonsInteres2(numInteres) {
    this.lista_personasPorInteres = [];
    let eventinteres = {} as EventInteres;
    eventinteres.event = this.event;
    eventinteres.interes = numInteres;
    this._peticionesService.getPersonFilterInteresWithEvent(eventinteres).subscribe(response => {
      this.listaReturned = response;
      this.lista_personasPorInteres = this.listaReturned;
    })



  }
  loadPersonsInteresByCartera(numInteres) {
    this.lista_personasPorInteres = [];
    let eventinteres = {} as EventInteres;
    eventinteres.event = this.event;
    eventinteres.interes = numInteres;
    eventinteres.identity = Identity;
    this._peticionesService.getPersonFilterInteresWithEventByCartera(eventinteres).subscribe(response => {
      this.listaReturned = response;
      this.lista_personasPorInteres = this.listaReturned;
    })



  }

  edit(_id: string) {
    var personIdEventId = _id + '-' + this.eventId;
    this.router.navigate(['home/events/persons/edit', personIdEventId]);

  }

  queryRol() {
    this._peticionesService.getCurrentRol(Identity).subscribe(res => {
      this.rol = res;
    })
  }


  exportarExcel() {
    nPersons(0, this.lista_personasPorInteres, this.listaToExport, this.event.name);
    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      showTitle: false,
      useBom: true,
      headers: [
        (<HTMLInputElement>document.getElementById('grupo')).value,
        (<HTMLInputElement>document.getElementById('PrimerNombre')).value,
        (<HTMLInputElement>document.getElementById('SegundoNombre')).value,
        (<HTMLInputElement>document.getElementById('Apellido')).value,
        (<HTMLInputElement>document.getElementById('Celular')).value,
      ]
    };
    // console.log(this.listaToExport);
    this.toExport = new Angular5Csv(this.listaToExport, "Nuevo Reporte", options);
  }


}
function nPersons(i, lista_personasPorInteres, listaToExport, name) {
  console.log(i, lista_personasPorInteres.length);
  if (i == lista_personasPorInteres.length) return;
  let personToExport = {} as PersonToExport;
  // for (let p of lista_personasPorInteres) {
  personToExport.grupo = name;
  personToExport.first_name = lista_personasPorInteres[i].first_name;
  personToExport.middle_name = '';
  personToExport.last_name = lista_personasPorInteres[i].last_name;
  personToExport.cellphone = lista_personasPorInteres[i].cellphone;
  listaToExport.push(personToExport);
  // }
  return nPersons(i + 1, lista_personasPorInteres, listaToExport, name);
}

export interface EventInteres {
  event: Object,
  interes: number,
  identity: {},
}
export interface EventIdPersonId {
  event: {},
  identity: {},
}

export interface EventPerson {
  _id: string,
  person: Object,
  state: number,
}
export interface PersonItem {

  _id: string,
  first_name: string,
  last_name: string,
  cellphone: number,
  city: string,
  state: number,
  stateName: string,


}
export interface PersonToExport {
  grupo: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  cellphone: number,
}