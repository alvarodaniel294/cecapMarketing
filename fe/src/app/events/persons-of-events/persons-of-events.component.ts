import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { PeticionesService} from '../../services/peticiones.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Pipe, PipeTransform } from '@angular/core';
import { Identity } from '../../services/global';



@Component({
  selector: 'app-persons-of-events',
  templateUrl: './persons-of-events.component.html',
  styleUrls: ['./persons-of-events.component.css'],
  providers:[PersonaService,PeticionesService]


})
export class PersonsOfEventsComponent implements OnInit {

 
  public eventId;
  public event;
  public lista_personas=[];
  public lista_personasPorInteres=[];
  public listaInteres;
  public persona;
  public listaReturned;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _personaService: PersonaService,
    private _peticionesService: PeticionesService
   


  ) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
        this.eventId=params.id;
        this.loadPersons2();
    })
    

  }
  loadPersons2(){
    this.lista_personasPorInteres=[];
    this._peticionesService.getEvent(this.eventId).subscribe(response=>{
          this.event=response;
          this._peticionesService.getPersonasInteresWithEvent(this.event).subscribe(res=>{
            this.listaReturned=res;
            this.lista_personasPorInteres=this.listaReturned;
          })
    })
    
  }
 
  loadPersonsInteres2(numInteres){
    this.lista_personasPorInteres=[];
    let eventinteres={}as EventInteres;
    eventinteres.event=this.event;
    eventinteres.interes=numInteres;
    this._peticionesService.getPersonFilterInteresWithEvent(eventinteres).subscribe(response=>{
      this.listaReturned=response;
      this.lista_personasPorInteres=this.listaReturned;
    })



  }
  
  edit(_id:string){
    var personIdEventId=_id+'-'+this.eventId;
    this.router.navigate(['home/events/persons/edit',personIdEventId]);

  }
   


}
export interface EventInteres{
  event:Object,
  interes:number;
}
export interface EventIdPersonId{
  eventId:string,
  personId:string,
}

export interface EventPerson{
  _id:string,
  person:Object,
  state:number,
}
export interface PersonItem{

  _id:string,
  first_name:string,
  last_name:string,
  cellphone:number,
  city:string,
  state:number,
  stateName:string,


}