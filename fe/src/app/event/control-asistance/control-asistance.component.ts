import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeticionesService } from '../../services/peticiones.service';

@Component({
  selector: 'app-control-asistance',
  templateUrl: './control-asistance.component.html',
  styleUrls: ['./control-asistance.component.css'],
  providers: [PeticionesService]
})
export class ControlAsistanceComponent implements OnInit {
  public userId;
  public modulos;

  constructor(
    private _peticionesService: PeticionesService,
        private route: ActivatedRoute,
        private router: Router
  ) { }

  ngOnInit() {
    //this.queryModulos();
  }
  // queryModulos(){
  //   this.route.params.subscribe(params => {
  //     this.userId = params.id
  //     console.log(this.userId);
  //  });
  //   this._peticionesService.getEventModuls(this.userId).subscribe(
  //     result => {
  //         this.modulos = result;
  //         //console.log(this.eventos);
  //     },
  //     error => {
  //         var errorMessage = <any>error;
  //         console.log(errorMessage);
  //     });
  // }
}
