import { Injectable } from '@angular/core';
import { HttpModule, Http, Response, Headers } from '@angular/http';
import { GLOBAL } from './global';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CATCH_ERROR_VAR } from "@angular/compiler/src/output/abstract_emitter";

//import { Router } from '@angular/router';
//import { AsyncLocalStorage } from 'angular-async-local-storage';

@Injectable()
export class SucursalService {
    public url: string = GLOBAL.url;

   constructor(
      //private _router: Router,
      //protected localStorage: AsyncLocalStorage,
      private _http: HttpClient
   ) { }
   getSucursales(){
        return this._http.get(this.url + 'Mkt_offices').map((res: Response) => res);
    }
    getSucursal(id){
        return this._http.get(this.url + 'Mkt_offices/' + id).map((res: Response) => res);
    }
   addOffice(office) {
    let body = JSON.stringify(office);
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.post(this.url + 'Mkt_offices/add', body, { headers: headers }).map((res: Response) => res);
   }
   getCompanys(){
     return this._http.get(this.url + 'Mkt_company').map((res: Response) => res);
   }
}