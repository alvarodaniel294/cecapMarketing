import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { PeticionesService } from '../services/peticiones.service';
import { ActivatedRoute, Router } from "@angular/router";
import { List } from '../modelo/list';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css'],
  providers: [ PeticionesService]
})
export class ListasComponent implements OnInit {

  @ViewChild("close", {read: ElementRef}) close: ElementRef;
  public model;
  constructor(
    private _peticionesService: PeticionesService,
    private route: ActivatedRoute,
    private router: Router
  ) { this.model = new List("")}
  submitted = false;
  ngOnInit() {
  }
  crearUniversidad(){

  }
  save(){
    this._peticionesService.addUniversidad(this.model).subscribe(res=> {
      var result = res;
    })
    this.router.navigate(['/home/events'])
    
  }
  cancelar(){
    this.router.navigate(['/home/events'])
    
  }
}
