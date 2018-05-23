import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeticionesService } from '../../../services/peticiones.service';
import { Person } from '../../../modelo/person';
import { Inscription } from '../../../modelo/inscription';
import { Registro } from '../../../modelo/registro';
import { DescOcupation } from '../../../modelo/descOcupation';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ PeticionesService]
})
export class EditComponent implements OnInit {
  @ViewChild("close", { read: ElementRef }) close: ElementRef;
    @Output() messageEvent = new EventEmitter();
    
    public personId;
    public person;//colection
    public personfirstname;
    public last_name;
    public ci;
    public cellphone;
    public phone;
    public email;
    public ocupacion;
    public AreaTrabajo;

    public ocupSelected;
    public descOcupation: DescOcupation;
    public eventos;//colection
    public programs;//colection
    public montoCan;
    public IdEvent;

    public registro: Registro;

    public inscription;
    submitted= false;

  constructor(
     private _peticionesService: PeticionesService,
      private route: ActivatedRoute,
      private router: Router
  ) {
    
   }

  ngOnInit() {
    this.queryPersonId();
    this.findPerson();
    

}
queryPersonId(){
  this.route.params.subscribe(params => {
    this.personId = params.id;
  })
}
findPerson(){
  this._peticionesService.getPerson(this.personId).subscribe(
    result => {
      this.person = result;
      console.log(this.person);
      this.personfirstname = this.person.first_name;
      this.last_name= this.person.last_name;
      this.ci = this.person.ci;
      this.cellphone = this.person.cellphone;
      this.phone = this.person.phone;
      this.email = this.person.email;
      this.ocupacion = this.person.ocupation;
      this.descOcupation = this.person.descOcupation;
      console.log(this.descOcupation+ "hola");
    }, error => {
      var errorMessage = <any>error;
          console.log(errorMessage);
    }
  )
}
captOcupation(){ 
  console.log(this.ocupSelected);
  this.descOcupation.universidad = '';this.descOcupation.carrera = '';
  this.descOcupation.semestre = '';this.descOcupation.areaTrabajo = '';
  this.descOcupation.profesion = '';this.descOcupation.cargo = '';
  this.descOcupation.empresa = '';
  this.person.ocupation = this.ocupSelected; 
}
 saveEdition(){

  this.person.first_name=this.personfirstname;
  this.person.last_name=this.last_name;
  this.person.ci=this.ci;
  this.person.cellphone=this.cellphone;
  this.person.phone=this.phone;
  this.person.email=this.email;
  this.person.ocupation=this.ocupacion;
  this.person.descOcupation=this.descOcupation;

  console.log(this.person);
  this._peticionesService.updatePerson(this.person).subscribe(
      result =>{
        var res = result;
        console.log(res);
        this.router.navigate(['home/persons']);
        alert('Se Guardo correctamente la edicion');
      },
      error=>{
        var errorMessage = <any>error;
          console.log(errorMessage + "Error al editar");
          alert("no se edito");
      }
  );
 }
 cancel() {
  this.router.navigate(['/home/persons']);
 }
}
