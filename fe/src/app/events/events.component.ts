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
   
   public events;
   public role;
   
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
   
   queryEvents() {
      this._peticionesService.getEvents().subscribe(
         result => {
            this.events = result;
           console.log(this.events)
            this.events.map(event => {
               var sum = 0;
               event.inscriptions.forEach(e => {
                  if (e.state == 1) sum++;
               });
               event.cupos = event.total - sum;
            });
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


