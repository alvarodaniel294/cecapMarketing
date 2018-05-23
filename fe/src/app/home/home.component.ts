import { Component, OnInit } from '@angular/core';
import { Identity } from '../services/global';
import { Router } from '@angular/router';
import { PeticionesService } from '../services/peticiones.service'
@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.css']
//    providers: [, PeticionesService]
})
export class HomeComponent implements OnInit {
   // public events;
   public identify;
   constructor(
      private router: Router,
    //   private _peticionesService: PeticionesService

   ) { }

   ngOnInit() {
       
      if (Identity._id == '') {
         this.router.navigate(['/login']);
      } else {
         this.router.navigate(['/home/events']);
         this.identify = Identity._id;
        // console.log(this.identify+'   este es el id');  //recuperando el id del usuario
         // this._peticionesService.getEvents().subscribe(
         //    result => {
         //       this.events = result;
         //       console.log(this.events);
         //    },
         //    error => {
         //       var errorMessage = <any>error;
         //       console.log(errorMessage);
         //    }

         // );
      }
   }
}
