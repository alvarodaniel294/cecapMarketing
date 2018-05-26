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
  }

  incomingfile(event) 
  {
  this.file= event.target.files[0]; 
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

  }

  uploadFileToActivity() {
    this._peticionesService.postFile(this.fileToUpload,this.cartera).subscribe(data => {
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
