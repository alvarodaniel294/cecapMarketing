import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeticionesService } from '../../services/peticiones.service';
import { Person } from '../../modelo/person';
import { DescOcupation } from '../../modelo/descOcupation';
import { Profile } from '../../modelo/profile';
// import { Inscription } from '../../modelo/inscription';
// import { Registro } from '../../modelo/registro';

@Component({
  selector: 'app-profile-person',
  templateUrl: './profile-person.component.html',
  styleUrls: ['./profile-person.component.css'],
  providers: [ PeticionesService]
})
export class ProfilePersonComponent implements OnInit {
  public person;
  public personId;
  public date;
  public carteras;
  public carteraReturned;
  public ocupation;
  public ocupations: DescOcupation;
  public profilePerson;  
  // public profile: Profile;
  public programs: Array<any> = [];
  public programName;
  public program;
  public programId;
  public oneProgram;
  // public finalWork;
  // public registro: Registro;
  // public inscription;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _peticionesService: PeticionesService
  ) { this.date = new Date(); }

  ngOnInit() {
    this._peticionesService.getCarteras().subscribe(response=>{
      this.carteras=response;
      console.log(this.carteras);
    });
    this.queryPersonId();
    this.findPerson();
  }
  queryPersonId(){
    this.route.params.subscribe(params => {
    this.personId=params.id;
    });
  }
  findPerson(){
    console.log(this.personId)
    this._peticionesService.getPerson(this.personId).subscribe(
      result => {
         this.person = result;
         console.log(result)
        
         this.findCartera(this.personId);
        
         this.ocupation = this.person.ocupation;
         //console.log(this.ocupation)
         this.ocupations = this.person.descOcupation;
         //console.log(this.ocupations)
         this.profilePerson = this.person.profile.programs;
         console.log(this.profilePerson)

         this.fillPrograms();
         this.findProgram(this.programId);
      },
      error => {
        
         console.log(<any>error);
      });
  }
  findCartera(personId){
    this._peticionesService.getCartera(this.person.carteras).subscribe(
    result =>{
      this.carteraReturned=result;
      //console.log(this.carteraReturned)
    },
    error =>{
      console.log(<any>error);
    });
  }
  fillPrograms(){
    for (let i = 0; i <= this.programs.length; i++) {
      this.programs.pop(); i = 0;
    }
    for (let i of this.profilePerson) {
      this.programs.push(i);
    }
    this.getOneProgram(this.programs);
  }
  getOneProgram(programs){
    this.oneProgram = this.programs[0];
    console.log(this.oneProgram)
    this.programId = this.oneProgram.programs
    // this.findProgram();
  }
  findProgram(programId){ 
    this._peticionesService.getProgram(this.programId).subscribe(
      result => {
         this.program = result;
         console.log(result)
      },
      error => {
         console.log(<any>error);
      });
      // this.fillFinalWork(this.programId);
  }
  // fillFinalWork(programId){
  //     this._peticionesService.getPerson(this.personId).subscribe(
  //        result => {
  //           this.finalWork = result;
  //           console.log(this.finalWork);
  //        },
  //        error => {
  //           console.log(<any>error);
  //        });
  // }
  // fillModulars(){}
  // fillRequirements(){}
}