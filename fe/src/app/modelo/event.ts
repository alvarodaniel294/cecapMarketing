export class Event {
   constructor(
      public name: string,
      public description: string,
      public date_start: Date,
      // public inscriptions: [{
        //   name: string,
      //    state: number,
      //    person: string,
      //    description: string
      // }],
      public total: number,
      public programs: string,
      //public modulo: string
   ) { }
}