import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../../../services/peticiones.service';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {
  public events;
  public inscriptions;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [{events:this.inscriptions},'', '', ''], label: 'Evento'},
    {data: [{events:name}, '', '', ''], label: 'Evento 2'}
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }
 
  constructor(
    private _peticionesService: PeticionesService
  ) { }

  ngOnInit() {
    this._peticionesService.getEvents().subscribe(
      result => {
         this.events = result;
        //  console.log(result)
         this.events.map(event => {
          // var sum = 0;
          event.inscriptions = event.inscriptions.filter(e => {console.log(e.state == 1); return e.state == 1});
          // console.log(e)
          // event.inscritos = sum;
       });
       console.log(this.events)
         this.inscriptions = this.events.inscritos;
      },
      error => {
         console.log(<any>error)
      }
   );
  }
  
}
