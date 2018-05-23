import { Injectable } from '@angular/core';


@Injectable()

export class PersonaService{
    public nombre_persona='nombre de la persona';
    
    prueba(nombre_persona){
        return nombre_persona;
    }
    
}