import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
//import { UserService } from '../services/user.service';
import { Identity } from '../services/global';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
   selector: 'app-events',
   templateUrl: './events.component.html',
   styleUrls: ['./events.component.css'],
   providers: [ PeticionesService]

})
export class EventsComponent implements OnInit {
   
    public lista_eventos=[];
   public events;
   public role;
   public program;
   
   constructor(
      private router: Router,
      private _peticionesService: PeticionesService
      //,private _userService: UserService
   ) { }
   ngOnInit() {
      // this.queryRol();
       this.queryEvents(); 
       //   console.log(this.role);
    }
    
    addPerson(){
     this.router.navigate(['home/event/persons/add']);
    }
   send(_id: string) {
      this.router.navigate(['home/event', _id]);
   }

   personsOfEvents(_id: string) {
    this.router.navigate(['home/events/persons', _id]);
 }
   
   queryEvents() {
      this._peticionesService.getAllEvents().subscribe(
         result => {
             console.log('hola')
            this.events = result;
           console.log(this.events)
            this.events.map(event => {
               var sum = 0;
               event.inscriptions.forEach(e => {
                  if (e.state == 1) sum++;
               });
               event.cupos = event.total - sum;
            });


            for(let e of this.events){
                let eventoItem={}as EventoItem;

                eventoItem.name=e.name;
                eventoItem.date_start=e.date_start;
                eventoItem.cupos=e.total;
                eventoItem._id=e._id;
                eventoItem.programaId=e.programs;
                this._peticionesService.getProgram(e.programs).subscribe(result=>{
                    this.program=result;
                    eventoItem.programa=this.program.name;
                    this.lista_eventos.push(eventoItem);

                });

            }


         },
         error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
         }
      );
   }
//    queryRol(){
//        //console.log(Identity.rol)
//     this._peticionesService.getRole(Identity.rol).subscribe(
//         result => {
//          this.role = result;
//         },
//         error=>{
//          var errorMessage = <any>error;
//          console.log(errorMessage);
//         }
//     );
//     }
}


export interface EventoItem{
    _id:string,
    name:string,
    date_start:Date,
    cupos:number,
    programa:string,
    programaId:string,
}

