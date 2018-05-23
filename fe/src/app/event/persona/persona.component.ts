import { Component, OnInit } from '@angular/core';

import { PersonaService } from '../../services/persona.service';
import { PeticionesService} from '../../services/peticiones.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from "./filter.pipe";

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
  providers:[PersonaService,PeticionesService]

})
export class PersonaComponent implements OnInit {
  public listado_personas;
  public busqueda;
   public name: string;
   public searchText: string = "";
  public color='rojo';
  constructor(
     private router: Router,
     private route: ActivatedRoute,
     private _personaService: PersonaService,
     private _peticionesService: PeticionesService
     
    

  ) {}

  ngOnInit() {
    this.query();    
  }
  query() {
    
    this._peticionesService.getPersons().subscribe(
       result => {
          this.listado_personas = result;
          console.log(this.listado_personas);
       },
       error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
       }
    );
 }
  edit(_id) {
    this.router.navigate(['home/persons/edit', _id]);
  }
  asistence(_id){
    this.router.navigate(['home/persons/asistencia', _id]);
  }
  // butonv(){
  //  if(this.color == 'rojo') this.color='verde'
  //  else{this.color = 'rojo'}
  // }
  butonv(_id){
    if(this.color == 'rojo') {
      this.router.navigate(['home/persons/asistencia', _id]);
      this.color='verde'
    }
    else{this.color = 'rojo'}
   }
  
  clearFilter() {
    this.searchText = "";
  }
  
}

