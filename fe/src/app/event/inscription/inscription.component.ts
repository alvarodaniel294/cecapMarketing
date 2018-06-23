import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeticionesService } from '../../services/peticiones.service';
import { Identity } from '../../services/global';
import { Person } from '../../modelo/person';
import { Inscription } from '../../modelo/inscription';
import { Registro } from '../../modelo/registro';
import { DescOcupation } from '../../modelo/descOcupation';


@Component({
   selector: 'app-inscription',
   templateUrl: './inscription.component.html',
   styleUrls: ['./inscription.component.css'],
   providers: [PeticionesService]
})
export class InscriptionComponent implements OnInit {
   @ViewChild("close", { read: ElementRef }) close: ElementRef;
   @Output() messageEvent = new EventEmitter();

   public person: Person;//colection
   public descOcupation: DescOcupation;//collection
   public inscription: Inscription;//collection
   public ocupSelected;
   public eventos;//colection
   public programs;//colection
   public eventId;
   public cartera;
   public ingresoPorInscripcion;
   public modulos;
   public registro: Registro;

   submitted = false;

   constructor(
      private _peticionesService: PeticionesService,
      private route: ActivatedRoute,
      private router: Router
   ) {
      this.person = new Person('', '', null, null, null,'','', '', '', null, '',null, null);
      //first_name,last_name,ci,phone,cellphone,email,ocupation,descOcupation:{ },carteras
      this.inscription = new Inscription(null, null, null, null, 0, 0, '0', '');
      //this.identy=Identity._id;
      this.descOcupation = new DescOcupation('', '', '', '', '', '', '');
      this.registro = new Registro(null, null, '');//idEvent,idUser,persona:{}, montCancel

   }
   onSubmit() {
   }
   ngOnInit() {
      console.log(Identity._id); 
      //this.queryPrograms();
      this.queryEventId();
      this.queryModulos();
      // this.queryEvents();
      // this.queryCartera();
   }
   queryEventId() {
      this.route.params.subscribe(params => {
         this.eventId = params.id;
         // console.log(this.eventId)
      });
   }
   
   guardar() {
      /////registrar inscripcion
      /////primero tiene q crearce el pago en ingreso a caja chica
      /////se registra en modulars list del evento
      /////se registra en inscription del evento
      /////se registra en perfil de la persona la inscripcion al evento
      

      this.person.descOcupation = this.descOcupation;
      this.inscription.users = Identity._id;
      this.registro.inscription = this.inscription;
      this.registro.eventId = this.eventId;
      this.registro.persona = this.person;//opcional
      console.log(this.registro);
   }

   queryModulos(){
    this.route.params.subscribe(params => {
        this.eventId = params.id;
        // console.log(this.eventId)
     });
    this._peticionesService.getEventModuls(this.eventId).subscribe(//consulta para obt todo modulos
      result => {
          this.modulos = result;
          console.log(this.modulos);
      },
      error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
      });
  }
   cancel() {
      // this.router.navigate(['home/events']);
      window.history.back();
   }
}
