import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeticionesService } from '../../../services/peticiones.service';

@Component({
  selector: 'app-filtro-universidad-medio',
  templateUrl: './filtro-universidad-medio.component.html',
  styleUrls: ['./filtro-universidad-medio.component.css'],
  providers: [PeticionesService]
  
})
export class FiltroUniversidadMedioComponent implements OnInit {

  public universidadFilter;
  public listaUniversidades=[];
  public listaMediosContacto=[];
  public listado_personas=[];

  constructor(

    private _peticionesService: PeticionesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.llenarUniversidades();
    this.llenarMediosContacto();

  }



  onSubmit(){


  }

  filterPerson(){

    let u={}as ObjeSearch;
    u.uni='Universiad Mayor de San Simon';

    this._peticionesService.filterUniversidadMedio(u).subscribe(response=>{

      let personas=response;
    })
  }
  llenarUniversidades(){

    let umss={}as ItemUniversidad;
    umss.checked=false;
    umss.id=1;
    umss.name='Universidad Mayor de San Simon';
    this.listaUniversidades.push(umss);
    let umss2={}as ItemUniversidad;
    umss2.checked=false;
    umss2.id=1;
    umss2.name='Universidad Mayor de San Simon2';
    this.listaUniversidades.push(umss2);
    let umss3={}as ItemUniversidad;
    umss3.checked=false;
    umss3.id=1;
    umss3.name='Universidad Mayor de San Simon3';
    this.listaUniversidades.push(umss3);
  }


  llenarMediosContacto(){

    let afiche={} as ItemMedioContacto;
    afiche.name='afiche';
    afiche.id=1;
    afiche.checked=false;
    this.listaMediosContacto.push(afiche);

    let afiche2={} as ItemMedioContacto;
    afiche2.name='afiche2';
    afiche2.id=1;
    afiche2.checked=false;
    this.listaMediosContacto.push(afiche2);

    let afiche3={} as ItemMedioContacto;
    afiche3.name='afiche3';
    afiche3.id=1;
    afiche3.checked=false;
    this.listaMediosContacto.push(afiche3);

  }

  cancel(){


  }



}
export interface ObjeSearch{

  uni:string;

}



export interface ItemUniversidad{

  name:string,
  checked:boolean,
  id:number,
}


export interface ItemMedioContacto{
  name:string
  checked:boolean,
  id:number,

}