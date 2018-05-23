import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Identity, } from "../../services/global";
import { PeticionesService } from '../../services/peticiones.service';


@Component({
  selector: 'app-confirm-close-cash',
  templateUrl: './confirm-close-cash.component.html',
  styleUrls: ['./confirm-close-cash.component.css'],
  providers: [ PeticionesService]

})
export class ConfirmCloseCashComponent implements OnInit {

  @ViewChild("close", {read: ElementRef}) close: ElementRef;
  public cash;
  constructor(
    private route: ActivatedRoute,
     private router: Router,
     private _peticionesService: PeticionesService,

  ) { }

  ngOnInit() {
  }

  confirmar(){
    
      this._peticionesService.closeCashFlowUser(Identity._id).subscribe(response=>{
  
        this.cash=response;

        this.close.nativeElement.click();
        // this.router.navigate(['/home/caja/vistacaja']);
        // this.router.navigate(['/home/caja/vistacaja']);
        // this.router.navigate(['/home/caja/vistacaja']);
        // this.router.navigateByUrl(['/home/caja/vistacaja']);
        this.router.navigateByUrl('/home/caja/vistacaja', {skipLocationChange: true})


      })
  


  }
  cancelar(){

    this.close.nativeElement.click();
    
  }
}
