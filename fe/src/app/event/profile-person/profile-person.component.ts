import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeticionesService } from '../../services/peticiones.service';

@Component({
  selector: 'app-profile-person',
  templateUrl: './profile-person.component.html',
  styleUrls: ['./profile-person.component.css'],
  providers: [ PeticionesService]
})
export class ProfilePersonComponent implements OnInit {
  public person;
  public personId;
  public date;
  public carteras;
  public carteraReturned;
  public ocupation;
  public ocupations;
  public programs;
  public tracing;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _peticionesService: PeticionesService
  ) { this.date = new Date(); }

  ngOnInit() {
    this.queryPersonId();
    this.findPerson();
  }
  queryPersonId() {
    this.route.params.subscribe(params => {
      this.personId = params.id;
    });
  }
  findPerson() {
    // console.log(this.personId)
    this._peticionesService.getPerson(this.personId).subscribe(
      result => {
        this.person = result;
        console.log(this.person)
        this.findCartera();
        
        this.ocupation = this.person.ocupation;
        //  console.log(this.ocupation)
        this.ocupations = this.person.descOcupation;
        //  console.log(this.ocupations)
        this.tracing = this.person.profile.tracing;
        // console.log(this.tracing)

        // for (let i = 0; i < this.person.profile.length; i++) {
        //   for (let j = 0; j < this.person.programDetails.length; j++) {
        //     // console.log(this.person.profile[i].programs)
        //     // console.log(this.person.programDetails[j].name)
        //     if (this.person.profile[i].programs == this.person.programDetails[j]._id) {
        //       this.person.profile[i].name = this.person.programDetails[j].name;
        //     }
        //   }
        // }
      },
      error => {
        console.log(<any>error);
      });
  }
  findCartera() {
    this._peticionesService.getCartera(this.person.carteras).subscribe(
      result => {
        this.carteraReturned = result;
        // console.log(this.carteraReturned)
      },
      error => {
        console.log(<any>error);
      });
  }
  addTracing(){
    this.router.navigate(['/home/tracing/add', this.personId]);
  }
  cancelar(){
    window.history.back();
  }
}