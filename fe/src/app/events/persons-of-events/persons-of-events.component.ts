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


    this._peticionesService.getEvent(this.eventId).subscribe(result=>{
      this.event=result;
      console.log(this.event.interes);
      this.listaInteres=this.event.interes;
      for(let i of this.listaInteres){
        this._peticionesService.getPerson(i.persons).subscribe(result=>{
          this.persona=result;
          this.lista_personas.push(this.persona);
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

export interface EventPerson{
  _id:string,
  person:Object,
  state:number,
}