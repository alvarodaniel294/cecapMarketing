import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../../../services/peticiones.service';

@Component({
   selector: 'app-bar',
   templateUrl: './bar.component.html',
   styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
   public d = new Date();
   // public d = new Date(2018,2,3);
   public month: Array<string> = [];
   private events;
   private users;
   months() {
      this.month[0] = "January";
      this.month[1] = "February";
      this.month[2] = "March";
      this.month[3] = "April";
      this.month[4] = "May";
      this.month[5] = "June";
      this.month[6] = "July";
      this.month[7] = "August";
      this.month[8] = "September";
      this.month[9] = "October";
      this.month[10] = "November";
      this.month[11] = "December";
   }


   // events
   public chartClicked(e: any): void {
      console.log(e);
   }

   public chartHovered(e: any): void {
      console.log(e);
   }

   // public setGraphic(data): void {
   //    this.barChartData[0].data = data;
   // }

   public barChartOptions: any = {
      scaleShowVerticalLines: false,
      responsive: true
   };
   public barChartLabels: number[] = [this.d.getMonth() - 3, this.d.getMonth() - 2, this.d.getMonth() - 1];
   public barChartType: string = 'bar';
   public barChartLegend: boolean = true;

   public barChartData: any[] = [
      { data: [{ events: name }, '', '',], label: 'Evento 1' },
      { data: [{ events: name }, '', '',], label: 'Evento 2' },
      { data: [{ events: name }, '', '',], label: 'Evento 3' },
   ];
   // public barChartData = [];
   constructor(
      private _peticionesService: PeticionesService) { }

   ngOnInit() {
      this._peticionesService.getTrimestral().subscribe(
         result => {
            this.events = result;
            console.log("sssssssssssss"+this.events)
            // this.events.map(event => {
            //    event.inscriptions = event.inscriptions.filter(e => e.state == 1);;
            // });

            // this.barChartData = [];
            // this.events.forEach(e => {
            //    this.barChartData.push({ data: [], label: e.programName }); //= params.id.split('-')[1];
            // });

            // this.barChartLabels = this.events.map(u => u.name);
            // this.setGraphic(this.events.map(u => u.total));
         },
         error => {
            console.log(<any>error)
         }
      );
   }

}
