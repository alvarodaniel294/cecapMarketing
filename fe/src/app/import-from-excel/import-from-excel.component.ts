import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Identity } from './../services/global';

import { PeticionesService } from '../services/peticiones.service';



@Component({
  selector: 'app-import-from-excel',
  templateUrl: './import-from-excel.component.html',
  styleUrls: ['./import-from-excel.component.css'],
  providers: [PeticionesService]

})
export class ImportFromExcelComponent implements OnInit {


  public programs;
  public newProgramsCheck = [];
  public fileToUpload;
  public file;
  public cartera;

  constructor(

    private _peticionesService: PeticionesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.queryCartera();
    this.queryPrograms();
  }
  llenarProgramsCheckbox() {
    for (let p of this.programs) {
      let programItem = {} as ProgramCheckBox;
      programItem.checked = false;
      programItem.programId = p._id;
      programItem.programName = p.name;
      programItem.state = 0;
      this.newProgramsCheck.push(programItem);

    }
    // this.fixProgramCheckbox()

  }
  queryPrograms() {
    this._peticionesService.getPrograms().subscribe(response => {
      this.programs = response;
      this.llenarProgramsCheckbox();
      console.log(this.programs);
      console.log("hi")
    },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
      }
    );
  }

  incomingfile(event) {
    this.file = event.target.files[0];
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

  }

  uploadFileToActivity() {
    var newInteres = [];
    for (let npc of this.newProgramsCheck) {
      if (npc.checked) {
        newInteres.push(npc);
      }
    }
    console.log(newInteres);
    // this.person.interes = newInteres;
    this._peticionesService.postFile(this.fileToUpload, this.cartera, newInteres).subscribe(data => {
      console.log(data, 'si se puede, si se puede')

      this.router.navigate(['home/persons']);

      // do something, if upload success
    }, error => {
      console.log(error);
    });
  }

  queryCartera() {
    //console.log(Identity._id)
    this._peticionesService.getCarteraFromUserId(Identity._id).subscribe(
      result => {
        this.cartera = result;

      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
      }
    );
  }





}

export interface ProgramCheckBox {
  programId: string,
  programName: string,
  checked: boolean,
  state: number,
}