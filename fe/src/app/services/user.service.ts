import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { GLOBAL, Roles, Identity } from './global';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Injectable()
export class UserService {
   public url: string;

   constructor(
      private _router: Router,
      protected localStorage: AsyncLocalStorage,
      private _http: Http
   ) {
      this.url = GLOBAL.url;
   }
   register() {
      return "texto desde el servicio usuario";

   }
   //metodo para autenticar el usuario
   signup(user_to_login, gettoken = null) {
      if (gettoken != null)//sacamos el token y preguntamos
      {
         user_to_login.gettoken = gettoken;
      }
      let params = JSON.stringify(user_to_login);
      let headers = new Headers({ 'Content-Type': 'application/json' });

      return this._http.post(this.url + 'login', params, { headers: headers })
         .map(res => res.json());
   }
   signin(user_to_login) {

      let body = JSON.stringify(user_to_login);//get interface
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.post(this.url + 'users/login', body, { headers: headers })
         .map(res => res.json() );
   }
   initApp() {
      this._http.get(this.url + 'users/roles')
         .map((response: Response) => response.json())
         .subscribe(
            response => {
               response.forEach(rol => {
                  if (rol.name == 'Admin') { Roles[0]._id = rol._id; }
                  else if (rol.name == 'Ejecutivo') { Roles[1]._id = rol._id; }
               });
            }
         )

      this.localStorage.getItem('Identity').subscribe((id) => {
         if (id != null) {
            // console.log(id)
            let body = JSON.stringify(id)
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this._http.post(this.url + 'users/auth', body, { headers: headers })
               .map((response: Response) => response.json())
               .subscribe(
                  response => {
                     // console.log(Identity, response)
                     Identity._id = response._id;
                     Identity.rol = response.rol;
                     Identity.name = response.name;
                     this._router.navigate(['/']);
                  }
               )
         } else console.log('sin _id en localStorage')
      });
   }
}