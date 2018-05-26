import { Component, OnInit } from '@angular/core';
import { PeticionesService } from './../services/peticiones.service';
import { Identity } from './../services/global';
import { Person } from './../modelo/person';
import { Router,ActivatedRoute } from "@angular/router";
import { forEach } from '@angular/router/src/utils/collection';
import { DescOcupation } from './../modelo/descOcupation';




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
  public descOcupation;
  public programs;
  
  public programasListCheckbox=[];

  public programasConInteres=[];


  public newPersons=[];

  constructor(
    private _peticionesService:PeticionesService,
    private router: Router,
    private route: ActivatedRoute,

  ) { 

    this.descOcupation = new DescOcupation('','','','','','','');

    this.nuevaPersona=new Person('','',null,null,null,'','','','',this.descOcupation,'',null);

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
    this.queryPrograms();
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
    this.llenarProgramasConInteres();
    
  }
  llenarProgramasConInteres(){

    for(let i of this.programasListCheckbox){
      if(i.checked){

        this.programasConInteres.push(i);
      }
      

    }
    console.log(this.programasConInteres);
    this.saveOnDB();

  }
  saveOnDB(){

    for(let num of this.numbers){


      this.nuevaPersona.whatsapp_group=this.whatsGroupName;
      this.nuevaPersona.cellphone=num;
      this.nuevaPersona.carteras=this.cartera._id;
      this.nuevaPersona.city=this.departamento;
      this.nuevaPersona.interes=this.programasConInteres;
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
  

  
  queryPrograms(){
    this._peticionesService.getPrograms().subscribe(response => {
        this.programs = response;
      console.log(this.programs);
        this.llenarProgramsCheckbox();
       },
       error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
       }
      );
   }


   llenarProgramsCheckbox(){
    for(let pro of this.programs){

      let oneProgramCheck={} as ProgramasCheckbox;
      oneProgramCheck.programId=pro._id;
      oneProgramCheck.programName=pro.name;
      oneProgramCheck.checked=true;
      oneProgramCheck.state=0;
      this.programasListCheckbox.push(oneProgramCheck);

    }
  }

  cancel(){
    this


  }


}

export interface ProgramasCheckbox{
  programId:string,
  programName:string,
  checked:boolean,
  state:number,

}


////////////
//  0 interesados
//  1 en duda
//  2 confirmados
//  3 isncritos
//  4 enlinea
//  5 proximo evento 
//  6 sin interes
//////// 
