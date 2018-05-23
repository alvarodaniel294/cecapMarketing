export class DescOcupation {
    constructor(
        //universitario
        public carrera: String,
        public universidad: String,
        public semestre:String,
        //Particular
        public areaTrabajo: String,
        //Profesional
        public  profesion: String,
        public empresa: String,
        public cargo: String,
    ) { }
 }