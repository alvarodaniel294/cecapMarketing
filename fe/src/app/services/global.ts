import { User } from '../modelo/user';
import { Rol } from '../modelo/rol';
import { Cartera} from '../modelo/cartera';

export var GLOBAL = {
   url: 'http://localhost:3000/'
}
// export var LogIn = {
//    token: ''
// }
export var Identity: User = {
   _id: '',
   name: '',
   active: null,
   password_hash: '',
   rol: '',
};
export var Roles: Array<Rol> = [
   {
      _id: '5aea1b1f60896154cd282fb4',
      name: 'Admin'
   },
   {
      _id: '5aea1b1f60896154cd282fb5',
      name: 'Ejecutivo'
   },
   {
        _id:'5aea36445f00ed76e827868b',
        name:'Gerente'

   }
];
export var CarteraS:Cartera={

    name:'',
    user:''
};