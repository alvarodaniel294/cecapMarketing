import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PeticionesService } from '../../../services/peticiones.service';
import { Tracing} from '../../../modelo/tracing';

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.css'],
  providers: [PeticionesService]
})
export class TracingComponent implements OnInit {
  public personId;
  public model: Tracing;
  public states;

  constructor(
    private _peticionesService: PeticionesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.model = new Tracing(null, "", "");
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.personId = params.id;

      // this.model.personId = this.personId;
    });
  }
  onSubmit() {
    console.log(this.model);
  }
  save() {
    if ((this.model.details == '')) {
      window.alert("Asegúrese de llenar todos los campos")
    } else {
        console.log(this.model);
        // this._peticionesService.addTracing(this.personId, this.model).subscribe(response => {
        //     var esperado = response;
        //     console.log(esperado);
        //     alert("El seguimiento se creó correctamente");
        //     window.history.back()
        //     },
        //     error => {
        //       console.log(<any>error);
        // });
      }
  }
  cancel() {
    window.history.back();
  }
}