import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeticionesService } from '../../../services/peticiones.service';
import { Identity } from '../../../services/global';


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
  public listaUniversidadesChecked=[];
  public listaMediosContactoChecked=[];
  public listaPersonas;

  constructor(

    private _peticionesService: PeticionesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.filterPerson();
    this.llenarUniversidades();
    this.llenarMediosContacto();

  }



  onSubmit(){
    for(let u of this.listaUniversidades){
        if(u.checked){
        this.listaUniversidadesChecked.push(u);
        }  


    }
    // console.log(this.listaUniversidadesChecked)
    
    for(let m of this.listaMediosContacto){
        if(m.checked){
          this.listaMediosContactoChecked.push(m);
        }
    }
    // console.log(this.listaMediosContactoChecked)

    this.filterPerson();
    


  }

  filterPerson(){

    let u={}as ObjeSearch;
    u.uni='Universidad Mayor de San Simon';

    let ots={}as ObjectToSearch;
    ots.listaUniChecked=this.listaUniversidadesChecked;
    ots.listaMedChecked=this.listaMediosContactoChecked;
    ots.identity=Identity;

    this._peticionesService.filterUniversidadMedio(ots).subscribe(response=>{

      this.listaPersonas=response;
      this.listado_personas=this.listaPersonas;
      console.log(this.listado_personas);
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
    umss2.name='U. Catolica';
    this.listaUniversidades.push(umss2);
    let umss3={}as ItemUniversidad;
    umss3.checked=false;
    umss3.id=1;
    umss3.name='U. Latinoamericana';
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

    for(let itemU of this.listaUniversidades){
      itemU.checked=false;
    }
    this.listaUniversidadesChecked=[];
    for(let itemM of this.listaMediosContacto){
      itemM.checked=false;
    }
    this.listaMediosContactoChecked=[];
    this.listado_personas=[];
  }



}
export interface ObjeSearch{

  uni:string;

}
export interface ObjectToSearch{

  listaUniChecked:{},
  listaMedChecked:{},
  identity:{},
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