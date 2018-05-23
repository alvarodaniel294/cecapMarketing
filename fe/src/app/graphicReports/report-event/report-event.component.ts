import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { User } from '../../modelo/user';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-report-event',
  templateUrl: './report-event.component.html',
  styleUrls: ['./report-event.component.css'],
  providers: [ PeticionesService]
})
export class ReportEventComponent implements OnInit {
  public userId;
  public user;
  public inscriptions;
  constructor(
    private _peticionesService: PeticionesService
  ) { }

  ngOnInit() {
   //   this._peticionesService.getMejorEjecutivo(this.userId).subscribe(
   //      result => {
   //         this.user = result;
   //         console.log(this.user);
   //         //this.inscriptions = this.user.inscriptions;
   //         //console.log(this.inscriptions);
   //      },
   //      error => {
   //         console.log(<any>error);
   //      }
   //   );
    }

}