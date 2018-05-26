import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { PeticionesService} from '../../services/peticiones.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from "./filter.pipe";
import { Identity } from './../../services/global';


@Component({
  selector: 'app-persons-of-ejecutivo',
  templateUrl: './persons-of-ejecutivo.component.html',
  styleUrls: ['./persons-of-ejecutivo.component.css'],
  providers:[PersonaService,PeticionesService]
})
export class PersonsOfEjecutivoComponent implements OnInit {

  public listado_personas;
  public busqueda;
   public name: string;
   public searchText: string = "";
  public color='rojo';
  public cartera;
  public ejecutivoId;
  constructor(
     private router: Router,
     private route: ActivatedRoute,
     private _personaService: PersonaService,
     private _peticionesService: PeticionesService
     
    

  ) {}

  ngOnInit() {
    this.queryEjecutivoId();
    
  }
  queryEjecutivoId(){
    this.route.params.subscribe(params => {
    this.ejecutivoId=params.id;
      console.log(this.ejecutivoId);
    this.queryCartera();

   
 });
}

  findPersons() {
    
    this._peticionesService.getPersonsOfCartera(this.cartera._id).subscribe(
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
  
  clearFilter() {
    this.searchText = "";
  }


  queryCartera() {
    //console.log(Identity._id)
    this._peticionesService.getCarteraFromUserId(this.ejecutivoId).subscribe(
        result => {
            this.cartera = result;

            this.findPersons();
            
        },
        error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
        }
    );
  }
}
