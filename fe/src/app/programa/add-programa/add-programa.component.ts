import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { PeticionesService } from '../../services/peticiones.service';
import { Programa } from '../../modelo/programa';

@Component({
  selector: 'app-add-programa',
  templateUrl: './add-programa.component.html',
  styleUrls: ['./add-programa.component.css'],
  providers: [PeticionesService]
})
export class AddProgramaComponent implements OnInit {
  public program: Programa;

  constructor(
    private _peticionesService: PeticionesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.program = new Programa('', '');//name, details
  }

  ngOnInit() {
    this.query();
  }
  onSubmit() {
    console.log(this.program);
    this._peticionesService.addProgram(this.program).subscribe(
      result => {
        var esperado = result;
        console.log(esperado);
        alert('El Programa se Creo correctamente');
        this.router.navigate(['home/programs']);
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        alert('Error al Crear Programa verifique los datos');

      }
    );
  }
  query() { }
  cancel() {
    this.router.navigate(['home/programs']);
  }
}
