import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PeticionesService } from '../../services/peticiones.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [ PeticionesService]
})
export class ReportsComponent implements OnInit {
  public titulo: string;
  public events;
  public inscriptions;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _peticionesService: PeticionesService
  ) {
    this.titulo = 'Reportes de Eventos';
  }

  ngOnInit() {
    console.log('reports.component.ts cargado')
    this._peticionesService.getEvents().subscribe(
      result => {
         this.events = result;
        //  console.log(result)
         this.events.map(event => {
          // var sum = 0;
          event.inscriptions = event.inscriptions.filter(e => {console.log(e.state == 1); return e.state == 1});
          // console.log(e)
          // event.inscritos = sum;
       });
       console.log(this.events)
         this.inscriptions = this.events.inscritos;
      },
      error => {
         console.log(<any>error)
      }
   );
  }

}