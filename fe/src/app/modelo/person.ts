import { DescOcupation } from "./descOcupation";

export class Person {
   constructor(
      public first_name: string,
      public last_name: string,
      public ci: number,
      public phone: number,
      public cellphone:number,
      public whatsapp_group:string,
      public city:string,
      public email:string,
      public ocupation: string,  //1 = universitario, 2=Profecional, 3=particular
      public descOcupation: DescOcupation,
     // public user: string,
      public carteras:string
   ) { }
}
