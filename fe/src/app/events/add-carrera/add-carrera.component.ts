import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-add-carrera',
  templateUrl: './add-carrera.component.html',
  styleUrls: ['./add-carrera.component.css'],
  providers: [ PeticionesService]  
})
export class AddCarreraComponent implements OnInit {
  public model;
  constructor(
    private _peticionesService: PeticionesService,
    private route: ActivatedRoute,
    private router: Router
  ) { this.model = new Carrera("") }

  submitted = false;
  ngOnInit() {
  
  }
  save(){
    this._peticionesService.addCarrera(this.model).subscribe(res=>{
      var resul = res;
    })
    this.router.navigate(['/home/events'])
    
  }
  cancelar(){
    this.router.navigate(['/home/events'])
  }
}
export class Carrera{
  constructor(
      public carrera:string,
     ){}
}