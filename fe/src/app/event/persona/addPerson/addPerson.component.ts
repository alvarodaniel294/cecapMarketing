import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeticionesService } from '../../../services/peticiones.service';
import { Identity } from '../../../services/global';
import { Person } from '../../../modelo/person';
import { Inscription } from '../../../modelo/inscription';
import { Registro } from '../../../modelo/registro';
import { DescOcupation } from '../../../modelo/descOcupation';
import { Cashflowusers } from "../../../modelo/cashflowusers";


@Component({
    selector: 'app-addPerson',
    templateUrl: './addPerson.component.html',
    styleUrls: ['./addPerson.component.css'],
    providers: [PeticionesService]
})
export class AddPersonComponent implements OnInit {
    @ViewChild("close", { read: ElementRef }) close: ElementRef;
    @Output() messageEvent = new EventEmitter();
    
    public person: Person;//colection
    public descOcupation: DescOcupation;//collection
    public inscription: Inscription;//collection
    public ocupSelected;
    public eventos;//colection
    public programs;//colection
    public IdEvent;
    public cartera;
    public ingresoPorInscripcion;

    public registro: Registro;

    submitted= false;

    constructor(
        private _peticionesService: PeticionesService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.person = new Person('', '', null, null, null,'','', null, '');
        //first_name,last_name,ci,phone,cellphone,email,ocupation,descOcupation:{ },carteras
        this.inscription = new Inscription(null, null, null,null,0,0,'0','');
        //this.identy=Identity._id;
        this.descOcupation = new DescOcupation('','','','','','','');
        this.registro = new Registro(null,null,'');//idEvent,idUser,persona:{}, montCancel
        
        this.ingresoPorInscripcion=new Cashflowusers(new Date(),new Date(),0,0,0,"","","","","");
    }
    onSubmit() { 
    }
    ngOnInit() {
        console.log(Identity._id);
        //this.queryPrograms();
        this.queryEvents();
        this.queryCartera();
        }
    guardar(){
        // console.log(this.IdEvent);
        // console.log(this.montoCan);

        // console.log(this.descOcupation);
        // console.log(this.inscription);
        this.person.descOcupation = this.descOcupation;
        this.inscription.users = Identity._id;
        this.registro.inscription = this.inscription;
        this.registro.eventId = this.IdEvent;
        this.registro.persona = this.person;
        console.log(this.registro);
        this._peticionesService.addPerson(this.registro).subscribe(
          result => {
            var esperado = result;
            console.log(esperado);

        /////////////   Ingreso por inscripcin a caja Chica////////////////

            // this.ingresoPorInscripcion.receipt=this.inscription.receipt;
            // this.ingresoPorInscripcion.title='Inscripcion';
            // this.ingresoPorInscripcion.description=this.person.first_name+' '+this.person.last_name;
            // this.ingresoPorInscripcion.detail_amount=this.inscription.canceled_price;
            // this.ingresoPorInscripcion.user=Identity._id;
            // this.ingresoPorInscripcion.events=this.IdEvent;
            // ////////////////////////////////////
            // this._peticionesService.addCashFlowUserIngreso(this.ingresoPorInscripcion).subscribe(
            //     result => {
            //       var returned = result;
            //     },
            //     error => {
            //       var errorMessage = <any>error;
            //       console.log(errorMessage);
            //       alert('Error al Crear cashflowuseringreso');
            //     }
            //   );

        ///////////////////////////////////////////////////////////////////



           this.router.navigate(['home/events']);
            alert('Se Registro a la persona de manera correcta');
            //this.router.navigate(['home/persons']);
            
          },
          error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
            alert('Error al registrar, Persona existente');
          }
        );
    }
    captOcupation(){ 
        console.log(this.ocupSelected);
        this.descOcupation.universidad = '';this.descOcupation.carrera = '';
        this.descOcupation.semestre = '';this.descOcupation.areaTrabajo = '';
        this.descOcupation.profesion = '';this.descOcupation.cargo = '';
        this.descOcupation.empresa = '';
        this.person.ocupation = this.ocupSelected; 
    }
    queryCartera() {
        //console.log(Identity._id)
        this._peticionesService.getCarteraFromUserId(Identity._id).subscribe(
            result => {
                this.cartera = result;
                this.person.carteras = this.cartera._id
                // console.log('aqui la cartera del usuario::::');
                // console.log(this.cartera);
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
            }
        );
    }
    queryEvents(){
        this._peticionesService.getEvents().subscribe(
            result => {
                this.eventos = result;
                //console.log(this.eventos);
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
            });
    }
    cancel(){
        // this.router.navigate(['home/events']);
        window.history.back();
    }
}
