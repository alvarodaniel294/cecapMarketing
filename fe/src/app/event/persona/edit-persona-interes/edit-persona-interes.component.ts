import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { PeticionesService } from '../../../services/peticiones.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Pipe, PipeTransform } from '@angular/core';
import { Identity } from '../../../services/global';
import { Tracing} from '../../../modelo/tracing';



@Component({
  selector: 'app-edit-persona-interes',
  templateUrl: './edit-persona-interes.component.html',
  styleUrls: ['./edit-persona-interes.component.css'],
  providers: [PersonaService, PeticionesService]

})
export class EditPersonaInteresComponent implements OnInit {

  public eventId;
  public personId;
  public person;
  public interesOfPerson;
  public currentInteres;
  public interes;
  public detail;
  public model: Tracing;
  

  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private _personaService: PersonaService,
    private _peticionesService: PeticionesService

  ) {
    this.model = new Tracing(new Date(), null, "", "");    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var personIdEventId = params.id
      this.personId = personIdEventId.split('-')[0];
      this.eventId = personIdEventId.split('-')[1];
      this.findPerson();

      this.model.eventId = this.eventId;      

    })

  }

  findPerson() {
    this._peticionesService.getPerson(this.personId).subscribe(result => {

      this.person = result;
      console.log(this.person);
      this.getIntersOfPerson();
    })

  }
  getIntersOfPerson() {
    let interesItem = {} as Interes;
    interesItem.state = 0;
    interesItem.eventId = this.eventId;
    interesItem.personId = this.personId;
    this._peticionesService.getInteresOfPersonaWithInteres(interesItem).subscribe(res => {
      this.interes = res;
      console.log(this.interes);
      this.person.detail = this.interes.details || '';
      this.interesOfPerson = this.interes.state;
    })

  }
  onSubmit() {
    // console.log(this.person.detail);
    // console.log(this.interesOfPerson, this.person.detail);
    let interesItem = {} as Interes;
    interesItem.details = this.person.detail;
    interesItem.state = this.interesOfPerson;
    interesItem.eventId = this.eventId;
    interesItem.personId = this.personId;
    this._peticionesService.setInteresOfPersonFromEvent(interesItem).subscribe(response => {

      // console.log(response);

      console.log(this.model);
      this._peticionesService.addNewTracing(this.personId, this.model).subscribe(response => {
        var esperado = response;
        console.log(esperado);

        this.router.navigate(['home/events/persons/', this.eventId]);
          
      });
      
      // this.router.navigate(['home/events/persons/', this.eventId]);
    })

  }

  cancel() {
    window.history.back();

  }

}

export interface Interes {

  state: number,
  eventId: string,
  personId: string,
  details: string
}