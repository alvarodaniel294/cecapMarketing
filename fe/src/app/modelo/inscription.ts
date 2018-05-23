export class Inscription {
   constructor(
      public total_price: Number,
      public module_price: Number,
      public bolivianos_price: Number,
      public dolares_price: Number,
      public canceled_price: Number,
      public price_event: Number,
      public receipt: string,
     // public persons: string,
      public users:string
   ) { }
}