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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _personaService: PersonaService,
    private _peticionesService: PeticionesService
   


  ) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
        this.eventId=params.id;
        this.loadPersons();
    })
    

  }
  loadPersons(){

    this.lista_personasPorInteres=[];
    
    this._peticionesService.getEvent(this.eventId).subscribe(result=>{
      this.event=result;
      console.log(this.event.interes);
      this.listaInteres=this.event.interes;
      for(let i of this.listaInteres){
        this._peticionesService.getPerson(i.persons).subscribe(result=>{
          this.persona=result;
          let personaItem={} as PersonItem;
          personaItem._id=this.persona._id;
          personaItem.first_name=this.persona.first_name;
          personaItem.last_name=this.persona.last_name;
          personaItem.cellphone=this.persona.cellphone;
          personaItem.city=this.persona.city;
          for(let int of this.event.interes){
            if(int.persons==this.persona._id){
              personaItem.state=int.state;
               ////////////
                 //  0 interesados
                 //  1 en duda
                 //  2 confirmados
                 //  3 isncritos
                 //  4 enlinea
                 //  5 proximo evento 
                 //  6 sin interes
                 //////// 
              if(personaItem.state==0)personaItem.stateName='Interesado';
              if(personaItem.state==1)personaItem.stateName='En Duda';
              if(personaItem.state==2)personaItem.stateName='Confirmado';
              if(personaItem.state==3)personaItem.stateName='Inscrito';
              if(personaItem.state==4)personaItem.stateName='En Linea';
              if(personaItem.state==5)personaItem.stateName='Proximo Evento';
              if(personaItem.state==6)personaItem.stateName='Sin Interes';

            }
          }
          this.lista_personasPorInteres.push(personaItem);
          // this.lista_personas.push(this.persona);
        })
        

      }
      // console.log(this.lista_personas);

    })
  }
  loadPersonsInteres(numInteres){
    this.lista_personasPorInteres=[];
    // this.lista_personasPorInteres=[];
    // this.lista_personasPorInteres=[];
    

    this._peticionesService.getEvent(this.eventId).subscribe(result=>{
      this.event=result;
      console.log(this.event.interes);
      this.listaInteres=this.event.interes;
      for(let i of this.listaInteres){
        this._peticionesService.getPerson(i.persons).subscribe(result=>{
          this.persona=result;
          let personaItem={} as PersonItem;
          personaItem._id=this.persona._id;
          personaItem.first_name=this.persona.first_name;
          personaItem.last_name=this.persona.last_name;
          personaItem.cellphone=this.persona.cellphone;
          personaItem.city=this.persona.city;
          for(let int of this.event.interes){
            if(int.persons==this.persona._id){
              personaItem.state=int.state;
               ////////////
                 //  0 interesados
                 //  1 en duda
                 //  2 confirmados
                 //  3 isncritos
                 //  4 enlinea
                 //  5 proximo evento 
                 //  6 sin interes
                 //////// 
              if(personaItem.state==0)personaItem.stateName='Interesado';
              if(personaItem.state==1)personaItem.stateName='En Duda';
              if(personaItem.state==2)personaItem.stateName='Confirmado';
              if(personaItem.state==3)personaItem.stateName='Inscrito';
              if(personaItem.state==4)personaItem.stateName='En Linea';
              if(personaItem.state==5)personaItem.stateName='Proximo Evento';
              if(personaItem.state==6)personaItem.stateName='Sin Interes';
             
            }
          }
          if(personaItem.state==numInteres){
            this.lista_personasPorInteres.push(personaItem);
          }
          
          // this.lista_personas.push(personaItem);
        })
        

      }
      console.log(this.lista_personas);

    })
  }
  edit(_id:string){
    var personIdEventId=_id+'-'+this.eventId;
    this.router.navigate(['home/events/persons/edit',personIdEventId]);

  }
   


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