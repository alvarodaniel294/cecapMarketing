import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-info-cartera',
  templateUrl: './info-cartera.component.html',
  styleUrls: ['./info-cartera.component.css'],
  providers: [ PeticionesService]
})
export class InfoCarteraComponent implements OnInit {


  public persons;
  public carteraId;
  public cartera;
  public user;
  public userName: string;
  public userRecordDate;
  constructor(

    private _peticionesService: PeticionesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
   this.queryPerson();
   this.findCartera();
   this.findPerson();
   
   
    
  }

  queryPerson(){
    this.route.params.subscribe(params => {
        this.carteraId = params.id;
        
     });
    //  this._peticionesService.getEvent(this.personId).subscribe(
    //     result => {
    //        this.person = result;
    //        console.log(this.person);
           
    //        //prueba total
    //        var o =this.person.total;
    //     },
    //     error => {
    //        var errorMessage = <any>error;
    //        console.log(errorMessage);
    //     }
    //  );
   }
   findPerson(){

      this._peticionesService.getPersonCartera(this.carteraId).subscribe(response=>{
        this.persons=response;
      });

    
   }
   findCartera(){
    this._peticionesService.getCartera(this.carteraId).subscribe(
       result =>{
         this.cartera=result;
         this.findOneUser();
        
       },
       error =>{
         var errorMessage=<any>error;
         console.log(errorMessage);
       }

    )
   }
   findOneUser(){
    this._peticionesService.getOneUser(this.cartera.user).subscribe(response=>{
      this.user=response;
      this.userName=this.user.name;
      this.userRecordDate=this.user.record_date;
      console.log(this.user);
    });
    
    
   }
}
