import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Programa } from '../../modelo/programa';

@Component({
   selector: 'app-edit-programa',
   templateUrl: './edit-programa.component.html',
   styleUrls: ['./edit-programa.component.css'],
   providers: [PeticionesService]
})
export class EditProgramaComponent implements OnInit {
   @ViewChild('name') nameRef: ElementRef;
   @ViewChild('details') detailsRef: ElementRef;
   //@ViewChild("close", { read: ElementRef }) close: ElementRef;
   public programId;
   public program;
   public programName;
   public programDetails;

   constructor(
      private route: ActivatedRoute,
      public router: Router,
      private _peticionesService: PeticionesService,
   ) { }

   ngOnInit() {
      this.queryProgramId();
      this.findProgram();
   }
   queryProgramId() {
      this.route.params.subscribe(params => {
         this.programId = params.id;
      });
   }
   findProgram() {
      this._peticionesService.getProgram(this.programId).subscribe(
         result => {
            this.program = result;
            this.programName = this.program.name;
            this.programDetails = this.program.details;
            //console.log(this.program.name)
            //console.log(this.program.details)
         },
         error => {
            console.log(<any>error);
         })
   }
   saveProgram() {
      this.program.name = this.nameRef.nativeElement.value;
      this.program.details = this.detailsRef.nativeElement.value;

      if (this.nameRef.nativeElement.value == '' || this.detailsRef.nativeElement.value == '') {
         window.alert("Asegurese que todos los campos esten llenados");
      } else {
         console.log(this.program);
         this._peticionesService.updateProgram(this.program).subscribe(
            result => {
               console.log(result);
               var res = result;
               alert('Se Guardo correctamente la edicion');
               // window.history.back();          
            },
            error => {
               console.log(<any>error);
               alert('Error al Guardar verifique los datos');
            })
         this.router.navigate(['home/programs']);
      }
   }
   //save() {
   //console.log(this.program);
   //this.close.nativeElement.click();
   //}
   cancel() {
      this.router.navigate(['home/programs']);
   }
}