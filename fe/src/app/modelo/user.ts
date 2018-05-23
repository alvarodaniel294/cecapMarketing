// export class User{
//     constructor(
//        public _id:string,
//        public nombre:string,
//        public apellido:string,
//        public correo:string,
//        public password:string,
//        public role:string,
//        public image: string
//     ){}
// }
export class User{
   constructor(
      public _id:string,
      public name:string,
      public active:boolean,
      public password_hash:string,
      public rol:string,
   ){}
}