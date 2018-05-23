import { Component, OnInit } from '@angular/core';
import { Identity } from '../../../services/global';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {
  public nameUser;
  public prueba= 'add';
  constructor() { }

  ngOnInit() {
    this.nameUser= Identity.name;
  }

}
