import { Component, OnInit, ElementRef,ViewChild,Output,EventEmitter } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import {PeticionesService } from '../../services/peticiones.service';
import {Cartera} from '../../modelo/cartera';
import { Identity, } from "../../services/global";
// import {User} from '../../modelo/user';
import { Offices } from "../../modelo/offices";
import { Ejecutivo } from "../../modelo/Ejecutivo";

@Component({
  selector: 'app-add-ejecutivo',
  templateUrl: './add-ejecutivo.component.html',
  styleUrls: ['./add-ejecutivo.component.css'],
  providers:[PeticionesService]
})
export class AddEjecutivoComponent implements OnInit {
  public carteras;
  public sucursales;
  public carteraSeleccionada;
  public carteraObject;
  public  rolid;
  public newUser;
  public roles;
  
  constructor(
    private _peticionesService:PeticionesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  /////////////////////////////////////////////////
  
 
  model = new Ejecutivo(Identity._id,"","","",true,undefined,"","","","");
  // model=new Ejecutivo();
  get diagnostic() { return JSON.stringify(this.model); }
/////////////////////////////////////////////////
  submitted = false;

 
  ngOnInit() {
    this._peticionesService.getCarterasLibres().subscribe(response=>{
      this.carteras=response;
      console.log(this.carteras);
    });
    this._peticionesService.getSucursales().subscribe(response=>{
      this.sucursales=response;
      console.log(this.sucursales)
    });
    this._peticionesService.getRoles().subscribe(response=>{
      this.roles=response;
      console.log(this.roles);
    });
    
    
  }
  onSubmit() { this.submitted = true;
    console.log(this.model);
    this._peticionesService.addUser(this.model).subscribe(response=>{
            this.newUser=response;
            console.log(this.newUser);
            this.findCartera();
            // this.MessageEvent.emit();
            this.router.navigate(['/home/ejecutivo/']); 
            

      },error=>{

        var errorMessage=<any>error;
        console.log(errorMessage);
      })

      

  }
 

  findCartera(){
    this.carteraSeleccionada=this.model.cartera;
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
    this.carteraObject.user=this.newUser._id;
    this._peticionesService.updateCartera(this.carteraObject).subscribe(
      result=>{

        var res=result;
      

      },error=>{
        var errorMessage=<any>error;
        console.log(errorMessage);
      }
    )

  }
  cancel(){

    this.router.navigate(['home/ejecutivo']);
  }

}

