import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { PeticionesService} from '../services/peticiones.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Pipe, PipeTransform } from '@angular/core';
import { all } from 'q';
// import { FilterPipe } from "./filter.pipe";

@Component({
  selector: 'app-segmentation',
  templateUrl: './segmentation.component.html',
  styleUrls: ['./segmentation.component.css'],
  providers:[PersonaService,PeticionesService]

})
export class SegmentationComponent implements OnInit {

  public programs;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _personaService: PersonaService,
    private _peticionesService: PeticionesService
   


  ) { }

  ngOnInit() {
    this._peticionesService.getPrograms().subscribe(
      result => {
         this.programs = result;
         console.log(result)
      },
      error => {
         console.log(<any>error);
      });
  }
 listPersonInteresados(_id:string){
  //  var idInteresados=_id+'-'+'0';
  // this.router.navigate(['home/segmentacion/list/', idInteresados]);

  this.router.navigate(['home/segmentacion/list/',_id]);
 }
}

////////////
//  0 interesados
//  1 en duda
//  2 confirmados
//  3 isncritos
//  4 enlinea
//  5 proximo evento 
//  6 sin interes
//////// 
