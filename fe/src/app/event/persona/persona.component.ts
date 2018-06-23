import { Component, OnInit } from '@angular/core';

import { PersonaService } from '../../services/persona.service';
import { PeticionesService} from '../../services/peticiones.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from "./filter.pipe";
import { Identity } from "../../services/global";
// import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
  providers:[PersonaService,PeticionesService],
  // | paginate: {itemsPerPage:5, currentPage: p}

})
export class PersonaComponent implements OnInit {
  public listado_personas;
  public busqueda;
   public name: string;
   public searchText: string = "";
  public color='rojo';
  public cartera;
  public rol;
  public page;
  public total;
  public totalPag;
  public mostrar = [];
  
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
      this.total = this.listado_personas.length;
      this.mostrarPer();
      console.log(this.listado_personas)
    })
  }
  dis(){
    this.page = this.page-1;
    var inicio = (8*(this.page-1));
    var final = (8*(this.page-1))+8;
    this.mostrar = [];
    for(var a = inicio  ; a < final ; a++ ){
      this.mostrar.push(this.listado_personas[a]);
  }
  }
  aum(){
    this.page = this.page+1;
    console.log(this.page)
    var inicio = (8*(this.page-1));
    console.log(inicio)
    var final = (8*(this.page-1))+8;
    if(final > this.total){
      final = this.total;
    }
    console.log(final)
    this.mostrar = [];
    for(var a = inicio  ; a < final ; a++ ){
        this.mostrar.push(this.listado_personas[a]);
    }
  }
  mostrarPer(){
    this.page = 1;
    this.total = this.listado_personas.length;
    this.totalPag = Math.ceil(this.total/8);
    console.log(this.totalPag)
    if(this.totalPag > 1){
      for(var a = 0 ; a < 8 ; a++){
      this.mostrar.push(this.listado_personas[a]) ;}
    } else{
      this.mostrar = this.listado_personas;
    }
    
  }
  query() {
    
    this._peticionesService.getPersons().subscribe(
       result => {
          this.listado_personas = result;
          this.mostrarPer();
          
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
  viewProfile(_id) {
    this.router.navigate(['home/profilePerson', _id]);
  }
}

