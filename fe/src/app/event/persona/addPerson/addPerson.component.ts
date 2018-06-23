import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeticionesService } from '../../../services/peticiones.service';
import { Identity } from '../../../services/global';
import { Person } from '../../../modelo/person';
import { Inscription } from '../../../modelo/inscription';
import { Registro } from '../../../modelo/registro';
import { DescOcupation } from '../../../modelo/descOcupation';


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

    public newProgramsCheck = [];
    public registro: Registro;
    public selectMedio:Number;
    public otro;
    submitted = false;

    constructor(
        private _peticionesService: PeticionesService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.person = new Person('', '', null, null, null, '', '', '', '', null, '', null, null);
        ///////////////////////////
        ///new Person(f
        //irst_name: string, 
        //last_name: string, 
        //ci: number, 
        //phone: number, 
        //cellphone: number, 
        //whatsapp_group: string, 
        //city: string, 
        //email: string, 
        //ocupation: string, 
        //descOcupation: DescOcupation, 
        //carteras: string)
        ////////////////////////////////
        this.inscription = new Inscription(null, null, null, null, 0, 0, '0', '');
        //this.identy=Identity._id;
        this.descOcupation = new DescOcupation('', '', '', '', '', '', '');
        this.registro = new Registro(null, null, '');//idEvent,idUser,persona:{}, montCancel

    }
    onSubmit() {
    }
    ngOnInit() {
        // console.log(Identity._id);
        //this.queryPrograms();
        this.queryEvents();
        this.queryCartera();
        this.queryPrograms();

    }
    llenarProgramsCheckbox() {
        for (let p of this.programs) {
            let programItem = {} as ProgramCheckBox;
            programItem.checked = false;
            programItem.programId = p._id;
            programItem.programName = p.name;
            programItem.state = 0;
            this.newProgramsCheck.push(programItem);

        }
        // this.fixProgramCheckbox()

    }
    queryPrograms() {
        this._peticionesService.getPrograms().subscribe(response => {
            this.programs = response;
            this.llenarProgramsCheckbox();
            // console.log(this.programs);
            // console.log("hi")
        },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
            }
        );
    }
    guardar() {
        // console.log(this.IdEvent);
        // console.log(this.montoCan);

        // console.log(this.descOcupation);
        // console.log(this.inscription);
        var newInteres = [];
        for (let npc of this.newProgramsCheck) {
            if (npc.checked) {
                newInteres.push(npc);
            }
        }
        console.log(this.person);
        this.person.interes = newInteres;
        this.person.descOcupation = this.descOcupation;
        this.inscription.users = Identity._id;
        this.registro.inscription = this.inscription;
        this.registro.eventId = this.IdEvent;
        this.registro.persona = this.person;
        console.log(this.registro);
        // this._peticionesService.addPerson(this.registro).subscribe(
        this._peticionesService.addNewPerson(this.registro).subscribe(
            result => {
                var esperado = result;
                // console.log(esperado);

               

                this.router.navigate(['home/events']);
                alert('Se Registro a la persona de manera correcta');

            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                alert('Error al registrar, Persona existente');
            }
        );
    }
    selectMed(){
        console.log(this.person.contact_medium);
    }
    captOcupation() {
        console.log(this.ocupSelected);
        this.descOcupation.universidad = ''; this.descOcupation.carrera = '';
        this.descOcupation.semestre = ''; this.descOcupation.areaTrabajo = '';
        this.descOcupation.profesion = ''; this.descOcupation.cargo = '';
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
    queryEvents() {
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
    cancel() {
        // this.router.navigate(['home/events']);
        window.history.back();
    }
}
export interface ProgramCheckBox {
    programId: string,
    programName: string,
    checked: boolean,
    state: number,
}