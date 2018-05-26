import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { PeticionesService} from '../../services/peticiones.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Pipe, PipeTransform } from '@angular/core';
import { Identity } from '../../services/global';

@Component({
  selector: 'app-list-person-program-user',
  templateUrl: './list-person-program-user.component.html',
  styleUrls: ['./list-person-program-user.component.css'],
  providers:[PersonaService,PeticionesService]

})
export class ListPersonProgramUserComponent implements OnInit {

  public listado_personas=[];
  public listado_personasConfirmadas;
  public listado_personasInteresadas;
  public listado_personasProximoEvento;
  public listadoConFiltro=[];
  public intereses=[];
  public programId;
  public interesState;
  public personasInteresadasParaLaConsulta={} as UserIdProgramId;
  public personasConfirmadasParaLaConsulta={} as UserIdProgramId;
  public personasProximoeventoParaLaConsulta={} as UserIdProgramId;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _personaService: PersonaService,
    private _peticionesService: PeticionesService
   


  ) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{


      this.programId=params.id;
      ///////por si se quiere en distintos botones
      // this.programId=params.id.split('-')[0];
      // this.interesState=params.id.split('-')[1];
      ///////////////////

                ////////////
                //  0 interesados
                //  1 en duda
                //  2 confirmados
                //  3 isncritos
                //  4 enlinea
                //  5 proximo evento 
                //  6 sin interes
                //////// 

      /////confirmadas////
      this.personasConfirmadasParaLaConsulta.programId=this.programId;
      this.personasConfirmadasParaLaConsulta.state=2;
      this.personasConfirmadasParaLaConsulta.userId=Identity._id;

      ////interesadas////
      this.personasInteresadasParaLaConsulta.programId=this.programId;
      this.personasInteresadasParaLaConsulta.state=0;
      this.personasInteresadasParaLaConsulta.userId=Identity._id;

      /////proximo evento///
      this.personasProximoeventoParaLaConsulta.programId=this.programId;
      this.personasProximoeventoParaLaConsulta.state=5;
      this.personasProximoeventoParaLaConsulta.userId=Identity._id;

    })

    this.findPersonOfProgramByUser();    

  }
  findPersonOfProgramByUser(){

    this._peticionesService.getPersonsOfProgramByUser(this.personasConfirmadasParaLaConsulta).subscribe(
      resultConfirmados => {
         this.listado_personasConfirmadas = resultConfirmados;
        //  console.log(this.listado_personasConfirmadas);
         for(let personasConfirmadas of this.listado_personasConfirmadas){
           this.listado_personas.push(personasConfirmadas);
         }
         this._peticionesService.getPersonsOfProgramByUser(this.personasInteresadasParaLaConsulta).subscribe(
           resultInteresadas=>{
            this.listado_personasInteresadas=resultInteresadas;
            // console.log(this.listado_personasInteresadas);
            for(let personasInteresadas of this.listado_personasInteresadas){
              this.listado_personas.push(personasInteresadas);
            }

            this._peticionesService.getPersonsOfProgramByUser(this.personasProximoeventoParaLaConsulta).subscribe(
              resultProximoEvento=>{
                this.listado_personasProximoEvento=resultProximoEvento;
                for(let personasProximoEvento of this.listado_personasProximoEvento){
                  this.listado_personas.push(personasProximoEvento);
                }
              }
            )
           }
         );
         
        
         
      },
      error => {
         var errorMessage = <any>error;
         console.log(errorMessage);
      }
   );

  }
  
//  personasInteresadas(){
//    this.listadoConFiltro=[];
//    for(let persona of this.listado_personas){
//     this.intereses=persona.interes;
//     console.log(this.intereses)
//     for(let int of this.intereses){

//       if(int.state==0){
//         this.listadoConFiltro.push(persona);
        
//       }
//     }
//    }


//  }

}

export interface UserIdProgramId{
  userId:string,
  programId:string,
  state:number,
}