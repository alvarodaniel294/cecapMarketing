import { Component, OnInit } from '@angular/core';
import { PeticionesService } from './../services/peticiones.service';
import { Identity } from './../services/global';
import { Person } from './../modelo/person';
import { Router,ActivatedRoute } from "@angular/router";
import { forEach } from '@angular/router/src/utils/collection';



@Component({
  selector: 'app-import-whats-numbers',
  templateUrl: './import-whats-numbers.component.html',
  styleUrls: ['./import-whats-numbers.component.css'],
  providers:[PeticionesService],

})
export class ImportWhatsNumbersComponent implements OnInit {

  public whatsGroupName;
  public whatsNumbers;
  public numbers=[];
  public nuevaPersona;
  public cartera;
  public departamento;


  public newPersons=[];

  constructor(
    private _peticionesService:PeticionesService,
    private router: Router,
    private route: ActivatedRoute,

  ) { 
    this.nuevaPersona=new Person('','',null,null,null,'','','','',null,'');

   ///////////////////////////
       ///new Person(f
       //irst_name: string, 
       //last_name: string, 
       //ci: number, 
       //phone: number, 
       //cellphone: number, 
       //whatsapp_group: string, 
       //city: string, 
       //email: string, 
       //ocupation: string, 
       //descOcupation: DescOcupation, 
       //carteras: string)
       ////////////////////////////////
  }

  ngOnInit() {
    this.queryCartera();
  }

  onSubmit(){

    this.fixText();
    console.log(this.whatsGroupName);
    console.log(this.whatsNumbers);



  }
  fixText(){
    var numeros=this.whatsNumbers.split(',');
    console.log(numeros);
    numeros.forEach(element => {
      if (element.split(';')[1] != undefined) {
        if (element.split(';')[1].length == 8) {
           this.numbers.push( element.split(';')[1]);
        }
      
     }
    });
    console.log(this.numbers);
    this.saveOnDB();
    // this.router.navigate(['home/persons']);
  }
  saveOnDB(){

    for(let num of this.numbers){


      this.nuevaPersona.whatsapp_group=this.whatsGroupName;
      this.nuevaPersona.cellphone=num;
      this.nuevaPersona.carteras=this.cartera._id;
      this.nuevaPersona.city=this.departamento;
      console.log(this.nuevaPersona);
      this._peticionesService.addPersonFromWhatsapp(this.nuevaPersona).subscribe(res=>{
        this.newPersons.push(res);

        this.router.navigate(['home/persons']);
      },err=>{

        console.log(err);
      })
    }
    
    
  }

  queryCartera() {
    //console.log(Identity._id)
    this._peticionesService.getCarteraFromUserId(Identity._id).subscribe(
        result => {
            this.cartera = result;
            
        },
        error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
        }
    );
}
  
  cancel(){
    this


  }

}
