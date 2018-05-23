import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PeticionesService } from '../../../services/peticiones.service';

@Component({
   selector: 'app-bar-event',
   templateUrl: './bar-event.component.html',
   styleUrls: ['./bar-event.component.css']
})
export class BarEventComponent implements OnInit {
   public eventId;
   public users;
   // public inscriptions;
   public data;
   public barChartOptions: any = {
      scaleShowVerticalLines: false,
      responsive: true
   };
   public barChartLabels: string[] = ['Ejecutivo 1', 'Ejecutivo 2', 'Ejecutivo 3', 'Ejecutivo 4'];
   public barChartType: string = 'bar';
   public barChartLegend: boolean = true;

   public barChartData: any[] = [
      { data: [{ events: [1, 5] }], label: 'Evento 1' }
   ];

   // events
   public chartClicked(e: any): void {
      console.log(e);
   }

   public chartHovered(e: any): void {
      console.log(e);
   }

   // console.log('randomizando')
   public setGraphic(data): void {
      this.barChartData[0].data = data;
   }

   constructor(
      private route: ActivatedRoute,
      private _peticionesService: PeticionesService
   ) { }

   ngOnInit() {
      this.route.params.subscribe(params => {
         this.eventId = params.id.split('-')[0];
         this.barChartData[0].label = params.id.split('-')[1];
      });
      this._peticionesService.getMejorEjecutivo(this.eventId).subscribe(
         result => {
            this.data = result;
            this.barChartLabels = this.data.map(u => u.name);
            this.setGraphic(this.data.map(u => u.total));
         },
         error => {
            console.log(<any>error);
         }
      );
   }


}