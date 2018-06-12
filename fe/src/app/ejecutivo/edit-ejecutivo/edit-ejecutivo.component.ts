import { Component, OnInit, ElementRef,ViewChild, Input, EventEmitter} from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { ActivatedRoute,Router } from "@angular/router";
import { User} from '../../modelo/user';
import { Cartera } from "../../modelo/cartera";
import { Identity } from "../../services/global";
import { ResourceLoader } from '@angular/compiler';
import { Ejecutivo } from '../../modelo/Ejecutivo';

@Component({
  selector: 'app-edit-ejecutivo',
  templateUrl: './edit-ejecutivo.component.html',
  styleUrls: ['./edit-ejecutivo.component.css'],
  providers: [ PeticionesService ]
})
export class EditEjecutivoComponent implements OnInit {
  public ejecutivo;
  public ejecutivoId;
  public ejecutivoActive;
  public carteras;
  public listacarteras=[];
  public sucursales;
  public roles;
  public ejecutivoName;
  public ejecutivoLastName;
  public ejecutivoCell;
  public ejecutivoCorreo;
  public ejecutivoRol;
  public ejecutivoOffice;
  public ejecutivoCartera;

  public carteraAnti;
  public carteraActual;
  

  public carteraSeleccionada;
  public carteraObject;

  constructor(
    private _peticionesService: PeticionesService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.ejecutivoId=params.active;
    this.findEjecutivo2();
      
      // this.findCarteraFromEjecutivo(); 
   });

    this._peticionesService.getCarterasLibres().subscribe(response=>{
      this.carteras=response;
      this.listacarteras=this.carteras;
      console.log(this.carteras);
    });
    this._peticionesService.getSucursales().subscribe(response=>{
      this.sucursales=response;
      // console.log(this.sucursales)
    });
    this._peticionesService.getRoles().subscribe(response=>{
      this.roles=response;
      console.log(this.roles);
    });
    
  }

     
  findEjecutivo2(){

    this._peticionesService.getEjecutivoToEdit(this.ejecutivoId).subscribe(response=>{
      this.ejecutivo=response;
      this.ejecutivoActive=this.ejecutivo.active;
      this.ejecutivoName=this.ejecutivo.name;
      this.ejecutivoLastName=this.ejecutivo.lastname;
      this.ejecutivoCell=this.ejecutivo.cell;
      this.ejecutivoCorreo=this.ejecutivo.correo;
      this.ejecutivoOffice=this.ejecutivo.offices;
      this.ejecutivoRol=this.ejecutivo.rol;
      this.ejecutivoCartera=this.ejecutivo.cartera._id;
      this.carteraAnti=this.ejecutivo.cartera._id;
      this.listacarteras.push(this.ejecutivo.cartera)
      console.log(this.ejecutivo.cartera.name);
      console.log(this.ejecutivo)

    })
  }

  // findEjecutivo(){
  //    this._peticionesService.getOneUser(this.ejecutivoId).subscribe(
  //       result =>{
  //         this.ejecutivo=result;
  //         console.log(this.ejecutivo);
  //         this.ejecutivoActive=this.ejecutivo.active;
  //         this.ejecutivoName=this.ejecutivo.name;
  //         this.ejecutivoLastName=this.ejecutivo.lastname;
  //         this.ejecutivoCell=this.ejecutivo.cell;
  //         this.ejecutivoCorreo=this.ejecutivo.correo;
  //         this.ejecutivoOffice=this.ejecutivo.offices;
  //         this.ejecutivoRol=this.ejecutivo.rol;
  //         this._peticionesService.getCarteraFromUserId(this.ejecutivoId).subscribe(result=>{
  //           this.carteraActual=result;
    
  //           this.ejecutivoCartera=this.carteraActual;
  //           this.listacarteras.push(this.carteraActual);

  //           console.log(this.carteras);
  //       })
          
  //       },
  //       error =>{
  //         console.log(<any>error);
  //       });
 
  // }
  cambiarActive(i :boolean){
    this.ejecutivoActive=i;
  }

  saveEjecutivo(){
    // console.log(this.ejecutivo);
    this.ejecutivo.active=this.ejecutivoActive;
    this.ejecutivo.name=this.ejecutivoName;
    this.ejecutivo.lastname=this.ejecutivoLastName;
    this.ejecutivo.cartera=this.ejecutivoCartera;
    this.carteraActual=this.ejecutivoCartera;
    this.ejecutivo.cell=this.ejecutivoCell;
    this.ejecutivo.correo=this.ejecutivoCorreo;
    this.ejecutivo.offices=this.ejecutivoOffice;
    this.ejecutivo.rol=this.ejecutivoRol;
    
    
    console.log(this.ejecutivo);
    
    
    this._peticionesService.updateUser(this.ejecutivo).subscribe(
      result=>{
        var res=result;
        console.log(res)
        this.reasignarCartera();
        // this.findCartera();
        this.router.navigate(['home/ejecutivo']);
        alert('Se guardo correctamente el nuevo estado');
      },
      error=>{
        console.log(<any>error);
        alert('Error al guardar');
      });


  }

  reasignarCartera(){
    let carteraObjEjecutivo={} as CarteraObjEjecutivo
    console.log(this.carteraAnti);
    carteraObjEjecutivo.carteraAntigua=this.carteraAnti;
    carteraObjEjecutivo.cartera=this.carteraActual;
    carteraObjEjecutivo.ejecutivo=this.ejecutivoId;
    console.log(carteraObjEjecutivo);

    this._peticionesService.reasignarCartera(carteraObjEjecutivo).subscribe(res=>{
      
    })
  }
//   findCarteraFromEjecutivo(){
//     this._peticionesService.getCarteraFromUserId(this.ejecutivoId).subscribe(result=>{
//         this.carteraActual=result;
//         this.carteras.push(this.carteraActual);
//         console.log(this.carteraActual)
//         this.ejecutivoCartera=result;

//         console.log(this.carteras);
//     })

//  }
 
  onSubmit() { 
   this.saveEjecutivo();
  }
  cancel(){

    this.router.navigate(['home/ejecutivo']);
  }

  
}
export interface CarteraObjEjecutivo{
  carteraAntigua:string,
  cartera:string,
  ejecutivo:string,

}