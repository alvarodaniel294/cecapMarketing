import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { PeticionesService } from '../../services/peticiones.service';

@Component({
  selector: 'app-detalle-personal',
  templateUrl: './detalle-personal.component.html',
  styleUrls: ['./detalle-personal.component.css'],
  providers: [ PeticionesService]
})
export class DetallePersonalComponent implements OnInit {

  public users;
  constructor(
    private _peticionesService: PeticionesService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.queryUsers();
  }
  queryUsers(){
    this._peticionesService.getUser().subscribe(
      result => {
        this.users = result;
        // this._peticionesService.getRole(users.).subscribe(
        //   result => {
        //     this.users = result;
        //   },
        //   error => {
        //     var errorMessage = <any>error;
        //     console.log(errorMessage);
        //     alert('Error ');
        //   }
        // );
       console.log(this.users);
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        alert('Error ');
      }
    );
  }
}
