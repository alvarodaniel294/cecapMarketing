import { Component, OnInit } from '@angular/core';

import { PersonaService } from '../../services/persona.service';
import { PeticionesService} from '../../services/peticiones.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from "./filter.pipe";
import { Identity } from "../../services/global";

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
  public cartera;
  public rol;
  public textoAdmin="Usted es Administrador y se muestran TODAS las personas"
  constructor(
     private router: Router,
     private route: ActivatedRoute,
     private _personaService: PersonaService,
     private _peticionesService: PeticionesService
     
    

  ) {}

  ngOnInit() {
    // console.log(Identity)
    this.getRol();
    this.getCartera();
    
    
  }
  listarPersonasPorRol(){

    this._peticionesService.getPersonsOfCartera(this.cartera._id).subscribe(response=>{
      
      this.listado_personas=response;
      console.log(this.listado_personas)
    })
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

  getCartera(){
    this._peticionesService.getCarteraFromUserId(Identity._id).subscribe(response=>{

      this.cartera=response;

      if(this.rol.name=="Admin"){
        this.query();
      }else{
        this.listarPersonasPorRol();
      }
    })
  }
  
  getRol(){
    this._peticionesService.getRole(Identity.rol).subscribe(response=>{
      this.rol=response;


     
      // console.log(this.rol)
    })
  }
}

