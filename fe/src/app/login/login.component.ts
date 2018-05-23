import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AsyncLocalStorage } from 'angular-async-local-storage';

import { GLOBAL, Identity } from '../services/global';
import { UserService } from '../services/user.service';
import { User } from '../modelo/user';
import { LocationStrategy } from '@angular/common';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css'],
   providers: [UserService]
})
export class LoginComponent implements OnInit {

   public title: string;
   public user: User;
   public identity; //para guardar la identificacion
   public token;
   public status: string;

   constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      protected localStorage: AsyncLocalStorage
   ) {
      this.title = 'CECAP COMPANY';
      this.user = new User('', '',null, '', '');
   }

   ngOnInit() {
      // console.log('login.component cargado');
      // console.log('this._userService.register()');
   }
   onSubmit() {
      // console.log(this.user);//sadas
      this._userService.signin(this.user).subscribe(
         response => {
            this.identity = response;
            if (!this.identity || !this.identity._id) {
               alert('Usuario Incorrecto');
            } else {
               Identity._id = this.identity._id;
               Identity.rol = this.identity.rol;
               Identity.name = this.user.name;
               this.localStorage.setItem('Identity', { _id: this.identity._id }).subscribe(() => { console.log('verifico el usuario') });
               this._router.navigate(['/']);

            }
         },
         error => {
            //console.log(<any>error);
            var errorMessage = <any>error;
            if (errorMessage != null) {
               var body = JSON.parse(error.body);
               this.status = 'error';
            }
         }
      );
   }
  
   //  guardarSesion(){
   //    localStorage.setItem('nombreUser',this.nombreUser);//modifica en el localStorage 
   //    console.log(localStorage.getItem('nombreUser'));//obtiene el dato del localStorage
   //  }
}
