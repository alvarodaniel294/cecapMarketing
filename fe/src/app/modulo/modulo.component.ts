import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeticionesService } from '../services/peticiones.service';
import { Modulo } from '../modelo/modulo';

@Component({
   selector: 'app-modulo',
   templateUrl: './modulo.component.html',
   styleUrls: ['./modulo.component.css'],
   providers: [PeticionesService]
})
export class ModuloComponent implements OnInit {
   public programId;
   public modulos;
   public program;

   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private _peticionesService: PeticionesService
   ) { }

   ngOnInit() {
      this.queryProgramId();
      this.queryProgram();
      this.findModulos();
   }
   queryProgram() {
      this._peticionesService.getProgram(this.programId).subscribe(response => {
         this.program = response;
      },
         error => {
            console.log(<any>error);
         });
   }
   queryProgramId() {
      this.route.params.subscribe(params => {
         this.programId = params.id;
      });
   }
   findModulos() {
      console.log(this.programId)
      this._peticionesService.getModulos(this.programId).subscribe(
         result => {
            this.modulos = result;
            console.log(this.modulos)
         },
         error => {
            console.log(<any>error);
         })
   }
   editModulo(_id: string) {
      this.router.navigate(['/home/modulo/edit', _id]);
   }
   addModulo() {
      this.router.navigate(['/home/modulo/add', this.programId]);
   }
}