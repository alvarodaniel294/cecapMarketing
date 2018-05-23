import { Component, OnInit ,Input} from '@angular/core';
import { DetalleCajaComponent } from '../../sucursal/detalle-caja/detalle-caja.component';

@Component({
  selector: 'app-confirm-pending-cash',
  templateUrl: './confirm-pending-cash.component.html',
  styleUrls: ['./confirm-pending-cash.component.css']
})
export class ConfirmPendingCashComponent implements OnInit {

  constructor() { }

  @Input("estado") est:number; 

  ngOnInit() {
  }

  confirmar(){


  }
  cancelar(){


  }

}
