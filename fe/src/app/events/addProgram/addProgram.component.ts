import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Programa } from '../../modelo/programa';
import { PeticionesService } from '../../services/peticiones.service';
@Component({
   selector: 'app-addProgram',
   templateUrl: './addProgram.component.html',
   styleUrls: ['./addProgram.component.css'],
   providers: [ PeticionesService]
})
export class AddProgramComponent implements OnInit {
   @ViewChild('nameInput') nameInputRef: ElementRef;
   @ViewChild('moduleInput') moduleInputRef: ElementRef;
   @ViewChild('modulesArea') modulesAreaRef: ElementRef;
   @ViewChild('detailsArea') detailsAreaRef: ElementRef;
   @ViewChild("close", {read: ElementRef}) close: ElementRef;
   private modules: String;
   constructor(private _peticionesService: PeticionesService) { }

   ngOnInit() {
      this.modules = '';
   }
   save() {
      const name = this.nameInputRef.nativeElement.value;
      let modules = this.modulesAreaRef.nativeElement.value.split('\n');
      modules.splice(-1, 1);
      const details = this.detailsAreaRef.nativeElement.value;
      const newProgram = new Programa(name, details);
      this._peticionesService.addProgram(newProgram).subscribe(response => {
         // console.log(response);
         this.close.nativeElement.click();
      },
      error =>{
          var errosMessage = <any>error;
          alert('El nombre del Programa ya existe debe crear otro programa ');
      }
    
    );
   }
   add() { 
      const module = this.moduleInputRef.nativeElement.value;
      this.modules = this.modules + module + '\n';
      this.modulesAreaRef.nativeElement.value = this.modules;

   }

}
