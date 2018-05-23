import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';
import { ActivatedRoute,Router } from "@angular/router";

@Component({
  selector: 'app-edit-facilitador',
  templateUrl: './edit-facilitador.component.html',
  styleUrls: ['./edit-facilitador.component.css'],
  providers: [ PeticionesService]
})
export class EditFacilitadorComponent implements OnInit {
  public facilitadorName;
  public facilitadorjob;
  public facilitador;
  public facilitadorId;
  constructor(
    private _peticionesService: PeticionesService,
    private route: ActivatedRoute,
    public router: Router

  ) { }
  
  ngOnInit() {
      this.queryFacilitador();

  }
  onSubmit() { 
  }
 
  simbolos(nameV){
    console.log("ingreso simbolos");
    var res = false;
    for(var i = 0; i<nameV.length;i++){
      if(nameV[i] == '!' || nameV[i] == '@' || nameV[i] == '#' || nameV[i] == '$' || nameV[i] == '%' || nameV[i] == '^' ){res = true;}
    }
    return res;
  }
  editfacilitador(){

    // console.log(this.facilitador);
    this.facilitador.name=this.facilitadorName;
    
    if(this.facilitadorName==''){

      window.alert("Asegurese que todos los campos esten llenos");
    
    }else{
      if(this.simbolos(this.facilitadorName)){
        console.log("hay simbolos");
        window.alert("asegurese de no introducir simbolos");
      } else{

      this._peticionesService.updateFacilitador(this.facilitador).subscribe(
        result=>{
  
          var res=result;
          console.log(res);
          this.router.navigate(['home/facilitador']);
  
        },error=>{
          var errorMessage=<any>error;
          console.log(errorMessage);
        }
      )
     }
    }
   
  }
  queryFacilitador(){
    this.route.params.subscribe(params => {
      this.facilitadorId = params.id;
      console.log(this.facilitadorId);
     });
    this._peticionesService.getFacilitador(this.facilitadorId).subscribe(
         result => {
            this.facilitador = result;
            console.log(this.facilitador);
         },
         error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
         }
      );
  }
}
