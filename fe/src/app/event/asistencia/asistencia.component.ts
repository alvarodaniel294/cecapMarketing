import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeticionesService } from '../../services/peticiones.service';
import { Identity } from '../../services/global';
import { Lists } from '../../modelo/lists';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css'],
  providers: [PeticionesService]
})
export class AsistenciaComponent implements OnInit {
  public lists: Lists;
  public personId;
  public eventId;
  public modulos;

  submitted= false;
  constructor(
        private _peticionesService: PeticionesService,
        private route: ActivatedRoute,
        private router: Router
  ) { 
    this.lists = new Lists(null,0,'',null,null, '','','');//(bol, dol,receipt,assist,type,per,event,mod)
  }

  ngOnInit(){
    this.queryModulos();
  }
  guardar(){
    console.log(this.lists);
    this.lists.events = this.eventId;
    this.lists.person = this.personId;

    this._peticionesService.addAssitance(this.lists).subscribe(
      result => {
        var esperado = result;
        console.log(esperado);
        alert('Registrado correctamente');
        var _id =this.eventId;
        this.router.navigate(['home/event', _id]);
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        alert('Error al registrar Asistencia');
        
      }
    );

  }
  queryModulos(){
    this.route.params.subscribe(params => {
      var arrayIds = params.id.split('-');
      this.personId = arrayIds[0];
      this.eventId = arrayIds[1];
      console.log(this.eventId);
      console.log('el id del evento ')
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
  cancel(){
    window.history.back();
  }
}
