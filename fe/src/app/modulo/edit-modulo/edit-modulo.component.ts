import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Modulo } from '../../modelo/modulo';


@Component({
   selector: 'app-edit-modulo',
   templateUrl: './edit-modulo.component.html',
   styleUrls: ['./edit-modulo.component.css'],
   providers: [PeticionesService]
})
export class EditModuloComponent implements OnInit {
   @ViewChild('number') numberRef: ElementRef;
   @ViewChild('name') nameRef: ElementRef;
   @ViewChild('content') contentRef: ElementRef;
   @ViewChild("close", { read: ElementRef }) close: ElementRef;
   public moduloId;
   public modulo;
   public moduloNumber;
   public moduloName;
   public moduloContent;
   public programId;

   constructor(
      private route: ActivatedRoute,
      public router: Router,
      private _peticionesService: PeticionesService,
   ) { }

   ngOnInit() {
      this.queryModuloId();
      this.findModulo();
      //this.queryProgramId();
   }
   queryModuloId() {
      this.route.params.subscribe(params => {
         this.moduloId = params.id;
      });
   }
   findModulo() {
      this._peticionesService.getModulo(this.moduloId).subscribe(
         result => {
            this.modulo = result;
            this.moduloNumber = this.modulo.number;
            this.moduloName = this.modulo.name;
            this.moduloContent = this.modulo.content;
            //console.log(this.modulo.number)
            //console.log(this.modulo.name)
            //console.log(this.modulo.content)
         },
         error => {
            console.log(<any>error);

         })
   }
   saveModulo() {
      //console.log(this.modulo);
      this.modulo.number = this.numberRef.nativeElement.value;
      this.modulo.name = this.nameRef.nativeElement.value;
      this.modulo.content = this.contentRef.nativeElement.value;

      if (this.numberRef.nativeElement.value == null || this.nameRef.nativeElement.value == '' || this.contentRef.nativeElement.value == '') {
         window.alert("Asegurese que todos los campos esten llenos");
      } else {
         this._peticionesService.updateModulo(this.modulo).subscribe(
            result => {
               var res = result;
               console.log(res);
               alert('Se Guardo correctamente la edicion');
            },
            error => {
               console.log(<any>error);
               alert('Error al Guardar verifique los datos');
            })
         window.history.back();
      }
   }
   //save() {
   //console.log(this.modulo);
   //this.close.nativeElement.click();
   //}
   //queryProgramId(){
   //this.route.params.subscribe(params => {
   //this.programId=params.id;
   //});
   //}
   cancel() {
      // this.router.navigate(['home/modulos']);
      window.history.back();

   }

}
