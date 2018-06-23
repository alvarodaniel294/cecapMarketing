import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { Event } from '../../modelo/event';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
   selector: 'app-addEvent',
   templateUrl: './addEvent.component.html',
   styleUrls: ['./addEvent.component.css'],
   providers: [PeticionesService]
})
export class AddEventComponent implements OnInit {
   public programs;
   public sucursales;
   public sucursal;
   
   public model: Event;
   constructor(
      private _peticionesService: PeticionesService,
      private route: ActivatedRoute,
      private router: Router
   ) {
      this.model = new Event("", "", null, null, "","");
   }
   submitted = false;
   ngOnInit() {
      this.queryPrograms();
   }
   queryPrograms() {
      this._peticionesService.getPrograms().subscribe(response => {
         this.programs = response;
         this._peticionesService.getSucursales().subscribe(response=>{
            this.sucursales=response;
            // console.log(this.sucursales)
          });
         //console.log(this.programs);
      },
         error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
         }
      );
   }
   cancelar() {
      this.router.navigate(['home/events']);
   }
   onSubmit() {
      // console.log(this.model);
   }
   save() {
      if ((this.model.description == '') || (this.model.total == 0)) {
         window.alert("Asegurese de llenar todos los campos")
      } else {
         if (this.model.date_start < new Date()) {
            window.alert("Asegurese que la fecha sea mayor a la de hoy")

         } else {
            // console.log(this.model);
            this._peticionesService.addEvent(this.model).subscribe(response => {
               this.router.navigate(['/home/events']);
               alert("El evento se creo con exito");
            });

         }


      }

   }

}
