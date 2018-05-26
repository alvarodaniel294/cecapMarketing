import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeticionesService } from '../services/peticiones.service';
import { User } from '../modelo/user';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-ejecutivo',
  templateUrl: './ejecutivo.component.html',
  styleUrls: ['./ejecutivo.component.css'],
  providers: [ PeticionesService ]
})
export class EjecutivoComponent implements OnInit {
  public ejecutivos;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _peticionesService: PeticionesService
  ) { }

  ngOnInit() {
    this._peticionesService.getUser().subscribe(
      result => {
         this.ejecutivos = result;
         console.log(this.ejecutivos); 
      },
    error => {
      console.log(<any>error)
    });
 }
  editEjecutivo(_active:boolean){
  //console.log("EjecutivoComponent");
  this.router.navigate(['/home/ejecutivo/edit',_active]);
  //console.log("router.navigate");
  }
  addEjecutivo(){

    this.router.navigate(['/home/ejecutivo/add']);

  }
  infoEjecutivo(_id:string){
    // console.log(_id);
    this.router.navigate(['/home/ejecutivo',_id]);
  }
  personsOfEjecutivo(_id:string){

    this.router.navigate(['/home/personsOfEjecutivo',_id]);
  }
  // deleteEjecutivo(_id:string){
  //   this._peticionesService.deleteUser().subscribe(
  //     result => {
  //        console.log(result); 
  //     },
  //   error => {
  //     console.log(<any>error)
  //   });

  // }
}