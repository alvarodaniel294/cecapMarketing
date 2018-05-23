import { Component, OnInit, ElementRef,ViewChild, Input, EventEmitter} from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { ActivatedRoute,Router } from "@angular/router";
import { User} from '../../modelo/user';
import { Cartera } from "../../modelo/cartera";
import { Identity } from "../../services/global";

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
  public carteraActual;
  public sucursales;
  public roles;
  public ejecutivoName;
  public ejecutivoLastName;
  public ejecutivoCell;
  public ejecutivoCorreo;
  public ejecutivoRol;
  public ejecutivoOffice;
  public ejecutivoCartera;
  
  

  public carteraSeleccionada;
  public carteraObject;

  constructor(
    private _peticionesService: PeticionesService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this._peticionesService.getCarterasLibres().subscribe(response=>{
      this.carteras=response;
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
    
    this.queryEjecutivoId();
    this.findEjecutivo();
  }

  queryEjecutivoId(){
      this.route.params.subscribe(params => {
      this.ejecutivoId=params.active;

      this.findCarteraFromEjecutivo();

     
   });
  }

  findEjecutivo(){
     this._peticionesService.getOneUser(this.ejecutivoId).subscribe(
        result =>{
          this.ejecutivo=result;
          console.log(this.ejecutivo);
          this.ejecutivoActive=this.ejecutivo.active;
          this.ejecutivoName=this.ejecutivo.name;
          this.ejecutivoLastName=this.ejecutivo.lastname;
          this.ejecutivoCell=this.ejecutivo.cell;
          this.ejecutivoCorreo=this.ejecutivo.correo;
          this.ejecutivoOffice=this.ejecutivo.offices;
          this.ejecutivoRol=this.ejecutivo.rol;
        },
        error =>{
          console.log(<any>error);
        });
  }

  saveEjecutivo(){
    // console.log(this.ejecutivo);
    this.ejecutivo.active=this.ejecutivoActive;
    this.ejecutivo.name=this.ejecutivoName;
    this.ejecutivo.lastname=this.ejecutivoLastName;
    this.ejecutivo.cell=this.ejecutivoCell;
    this.ejecutivo.correo=this.ejecutivoCorreo;
    this.ejecutivo.offices=this.ejecutivoOffice;
    this.ejecutivo.rol=this.ejecutivoRol;
    
    
    console.log(this.ejecutivo);
    
    
    this._peticionesService.updateUser(this.ejecutivo).subscribe(
      result=>{
        var res=result;
        console.log(res)
        this.findCartera();
        this.router.navigate(['home/ejecutivo']);
        alert('Se guardo correctamente el nuevo estado');
      },
      error=>{
        console.log(<any>error);
        alert('Error al guardar');
      });


  }

  findCartera(){
    this.carteraSeleccionada=this.ejecutivoCartera;
    console.log(this.carteraSeleccionada);
    this._peticionesService.getCartera(this.carteraSeleccionada).subscribe(
       result =>{
         this.carteraObject=result;
        this.asignarCartera(); 

        
       },
       error =>{
         var errorMessage=<any>error;
         console.log(errorMessage);
       }

    )


 }
  asignarCartera(){
    this.carteraObject.user=this.ejecutivo._id;
    this._peticionesService.updateCartera(this.carteraObject).subscribe(
      result=>{

        var res=result;
      

      },error=>{
        var errorMessage=<any>error;
        console.log(errorMessage);
      }
    )

  }



  findCarteraFromEjecutivo(){
      this._peticionesService.getCarteraFromUserId(this.ejecutivoId).subscribe(result=>{
          this.carteraActual=result;
          this.carteras.push(this.carteraActual);

          this.ejecutivoCartera=result;

          console.log(this.carteras);
      })
  
   }
  onSubmit() { 
   this.saveEjecutivo();
  }
  cancel(){

    this.router.navigate(['home/ejecutivo']);
  }

  
}