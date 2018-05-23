import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Identity } from '../../../services/global';
@Component({
   selector: 'app-appheader',
   templateUrl: './appheader.component.html',
   styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {
    public nameUser;

   constructor(
      protected localStorage: AsyncLocalStorage,
      private _router: Router) { }

   ngOnInit() {
       this.nameUser = Identity.name;
   }
   logOut() {
      this.localStorage.removeItem('Identity').subscribe(() => { });
      Identity._id = '';
      Identity.rol = '';
      Identity.name = '';
      this._router.navigate(['/login']);
   }

}
