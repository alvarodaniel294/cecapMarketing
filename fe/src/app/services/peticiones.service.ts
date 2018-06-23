import { Injectable } from "@angular/core";
import { HttpModule, Http, Response, Headers } from "@angular/http";
import { GLOBAL } from './global';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CATCH_ERROR_VAR } from "@angular/compiler/src/output/abstract_emitter";

@Injectable()
export class PeticionesService {
    public url: string = GLOBAL.url;

    constructor(
        // private _httpClient: HttpClient,
        private _http: HttpClient

    ) {
        // this.url = "https://jsonplaceholder.typicode.com/users";

    }
    getEvents() {
        return this._http.get(this.url + 'events').map((res: Response) => res);
    }
    getEvent(id) {
        return this._http.get(this.url + 'events/' + id).map((res: Response) => res);
    }
    //prueba
    getEventInscriptions(id) {
        return this._http.get(this.url + 'events/inscriptions/' + id).map((res: Response) => res);
    }
    getTrimestral() {
        return this._http.get(this.url + 'events/trimestral').map((res: Response) => res);
    }
    addProgram(program) {
        let body = JSON.stringify(program);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'programs/add', body, { headers: headers }).map((res: Response) => res);
    }
    getPrograms() {

        return this._http.get(this.url + 'programs').map((res: Response) => res);
    }
    getProgram(_id) {
        return this._http.get(this.url + 'programs/' + _id).map((res: Response) => res);
    }
    addModulo(modulo) {
        let body = JSON.stringify(modulo);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'modules/add', body, { headers: headers }).map((res: Response) => res);
    }
    getModulos(idProgram) {
        console.log(idProgram)
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'modules/lista/' + idProgram, { headers: headers }).map((res: Response) => res);
    }
    getEventModuls(eventId) {
        console.log(eventId)
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'modules/eventoModuls/' + eventId, { headers: headers }).map((res: Response) => res);
    }
    getModulo(_id) {
        return this._http.get(this.url + 'modules/' + _id).map((res: Response) => res);
    }
    //    getIdProgram(nomProgram){
    //     let body = JSON.stringify(nomProgram);
    //      var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    //       return this._http.post(this.url + 'programs/id', body, { headers: headers }).map((res: Response) => res);
    //    }
    addEvent(event) {
        let body = JSON.stringify(event);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'events', body, { headers: headers }).map((res: Response) => res);
    }
    addPerson(person) {
        let body = JSON.stringify(person);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'persons', body, { headers: headers }).map((res: Response) => res);
    }
    addInscriptPerson(registro) {
        let body = JSON.stringify(registro);
        var idEvent = registro.idEvent;
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'events/inscriptPerson/' + idEvent, body, { headers: headers }).map((res: Response) => res);
    }
    getPerson(_id) {
        return this._http.get(this.url + 'persons/' + _id).map((res: Response) => res);
    }
    getCi(ci) {
        return this._http.get(this.url + 'persons/existCi/' + ci).map((res: Response) => res);
    }
    getPersons() {
        return this._http.get(this.url + 'persons').map((res: Response) => res);
    }
    getEventConfirmed(id) {
        return this._http.get(this.url + 'events/' + id).map((res: Response) => res);
    }
    getCarteras() {
        return this._http.get(this.url + 'carteras').map((res: Response) => res);
    }
    getCartera(_id) {
        return this._http.get(this.url + 'carteras/' + _id).map((res: Response) => res);
    }
    getCarterasLibres() {
        return this._http.get(this.url + 'carteras/libres').map((res: Response) => res);
    }
    crearCartera(cartera) {
        let body = JSON.stringify(cartera);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'carteras/guardar', body, { headers: headers }).map((res: Response) => res);
    }
    getFacilitadores() {
        return this._http.get(this.url + 'facilitators').map((res: Response) => res);
    }
    getFacilitador(id) {
        return this._http.get(this.url + 'facilitators/' + id).map((res: Response) => res);
    }
    addFacilitador(user) {
        let body = JSON.stringify(user);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'facilitators/register', body, { headers: headers }).map((res: Response) => res);
    }
    updateFacilitador(facilitador_object) {
        console.log(facilitador_object);
        let body = JSON.stringify(facilitador_object);
        var idfacilitador = facilitador_object._id;
        // console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.put(this.url + 'facilitators/update/' + idfacilitador, body, { headers: headers }).map((res: Response) => res);
    }
    addUser(user) {
        let body = JSON.stringify(user);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'users/register', body, { headers: headers }).map((res: Response) => res);
    }
    getUser() {
        return this._http.get(this.url + 'users').map((res: Response) => res);
    }
    getOneUser(_id) {
        return this._http.get(this.url + 'users/' + _id).map((res: Response) => res);
    }
    deleteUser(_id) {

        return this._http.delete(this.url + 'users/' + _id).map((res: Response) => res);
    }
    getMejorEjecutivo(_id) {
        return this._http.get(this.url + 'events/mejorEjecutivo/' + _id).map((res: Response) => res);
    }

    updatePerson(person) {
        let body = JSON.stringify(person);
        var idPerson = person._id;
        // console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.put(this.url + 'persons/' + idPerson, body, { headers: headers }).map((res: Response) => res);
    }
    //return this._http.post(this.url + 'events/edit',body,{headers : headers}).map((res:Response)=>res);
    //.catch(this.handleError);
    updatePersonOcupation(descOcupation, id) {
        let body = JSON.stringify(descOcupation);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.put(this.url + 'persons/ocupation/' + id, body, { headers: headers }).map((res: Response) => res);
    }
    getPersonCartera(_id) {

        // console.log(_id+"desde peticionesservice")
        return this._http.get(this.url + 'carteras/persons/' + _id).map((res: Response) => res);
        //  return this._http.get(this.url+'cartera/listPersonsCartera/'+_id).map((res: Response)=> res);

    }
    getCarteraFromUserId(id) {
        // console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'carteras/otro/' + id, { headers: headers }).map((res: Response) => res);
    }


    // updateUsers (user: User): Observable<null> {
    //   return this.http.put(this.usersUrl, user, httpOptions).pipe(
    //     tap(_ => this.log(`updated user id=${user.id}`)),
    //     catchError(this.handleError<any>('updateUser'))
    //   );
    // }

    updateCartera(cartera_object) {
        console.log(cartera_object);
        let body = JSON.stringify(cartera_object);
        var idCartera = cartera_object._id;
        // console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.put(this.url + 'carteras/' + idCartera, body, { headers: headers }).map((res: Response) => res);
    }
    addCartera(cartera) {
        let body = JSON.stringify(cartera);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'carteras/register', body, { headers: headers }).map((res: Response) => res);
    }
    getRole(id) {
        return this._http.get(this.url + 'users/rolName/' + id).map((res: Response) => res);
    }
    updateUser(user_object) {
        console.log(user_object);
        let body = JSON.stringify(user_object);
        var idUser = user_object._id;
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.put(this.url + 'users/' + idUser, body, { headers: headers }).map((res: Response) => res);
    }
    updateProgram(program_object) {
        //   console.log(program_object, 'test');
        let body = JSON.stringify(program_object);
        var idProgram = program_object._id;
        // console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.put(this.url + 'programs/edit/' + idProgram, body, { headers: headers }).map((res: Response) => res);
    }
    updateModulo(modulo_object) {
        console.log(modulo_object);
        let body = JSON.stringify(modulo_object);
        var idModulo = modulo_object._id;
        // console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.put(this.url + 'modules/edit/' + idModulo, body, { headers: headers }).map((res: Response) => res);
    }
    getSucursales() {
        return this._http.get(this.url + 'offices').map((res: Response) => res);
    }
    addCorrelative(correlative) {
        let body = JSON.stringify(correlative);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'correlatives/add', body, { headers: headers }).map((res: Response) => res);
    }
    getSucursal(id) {

        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'offices/' + id, { headers: headers }).map((res: Response) => res);
    }
    getRoles() {
        return this._http.get(this.url + 'roles').map((res: Response) => res);
    }

    addCashFlowUserIngreso(ingreso) {
        //console.log(ingreso);
        let body = JSON.stringify(ingreso);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'cajaUsuario/ingreso', body, { headers: headers }).map((res: Response) => res);
    }

    addCashFlowUserEgreso(egreso) {
        // console.log(egreso);
        let body = JSON.stringify(egreso);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'cajaUsuario/egreso', body, { headers: headers }).map((res: Response) => res);
    }

    getCashFlowUser(id) {

        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'cajaUsuario/' + id, { headers: headers }).map((res: Response) => res);


    }
    getCashFlowUserByUser(id) {

        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'cajaUsuario/ByUser/' + id, { headers: headers }).map((res: Response) => res);


    }
    getCashFlowUsers() {
        return this._http.get(this.url + 'cajaUsuario').map((res: Response) => res);
    }
    getCashFlowUsersPending() {
        return this._http.get(this.url + 'cajaUsuario/pending').map((res: Response) => res);
    }


    closeCashFlowUser(id) {

        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'cajaUsuario/close/' + id, { headers: headers }).map((res: Response) => res);

    }
    confirmCashFlowUser(id) {
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'cajaUsuario/confirm/' + id, { headers: headers }).map((res: Response) => res);

    }

    addDetailCashFlowOffice(detail) {

        // console.log(egreso);
        let body = JSON.stringify(detail);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'cajaSucursal/addDetail', body, { headers: headers }).map((res: Response) => res);

    }

    getCurrentCashFlowOffice(id) {
        // console.log(id);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'cajaSucursal/current/' + id, { headers: headers }).map((res: Response) => res);


    }
    setAmountDeliveredCashFlowUser(cash) {

        let body = JSON.stringify(cash);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'cajaUsuario/setAmountDelivered', body, { headers: headers }).map((res: Response) => res);

    }
    getCashFlowOffices() {
        return this._http.get(this.url + 'cajaSucursal/allActive').map((res: Response) => res);
    }

    closeCashFlowUserFromManager(id) {

        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'cajaUsuario/closeFromManager/' + id, { headers: headers }).map((res: Response) => res);

    }
    closeCashFlowOffice(id) {

        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'cajaSucursal/close/' + id, { headers: headers }).map((res: Response) => res);

    }
    addNewCashFlowOffice(idUser) {
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'cajaSucursal/new/' + idUser, { headers: headers }).map((res: Response) => res);
    }
    ///////////////////////////////////////////////////////////////////////////7
    addAssitance(lists) {
        let body = JSON.stringify(lists);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'lists', body, { headers: headers }).map((res: Response) => res);
    }
    getList(id) {
        return this._http.get(this.url + 'lists/person/' + id).map((res: Response) => res);
    }
    ////////////////////////////////////////////// sistema MARKETING////////////////////////
    addPersonFromWhatsapp(person) {
        let body = JSON.stringify(person);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'persons/addFromWhatsapp', body, { headers: headers }).map((res: Response) => res);
    }

    postFile(fileToUpload: File, cartera, interes): Observable<boolean> {
        const endpoint = this.url + 'persons/upload';
        const formData: FormData = new FormData();
        formData.append('fileKey', fileToUpload, fileToUpload.name);
        formData.append('body', JSON.stringify({ cartera: cartera, interes: interes }));
        let headers = new HttpHeaders();
        /** In Angular 5, including the header Content-Type can invalidate your request */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        // var body={formData:formData,test:'aaaaaaaaaaa'};
        // let options = new RequestOptions({ headers: headers });
        return this._http
            .post(endpoint, formData, { headers: headers })
            .map(() => { return true; })
        // .catch((e) => Observable.throw(e))
        // .subscribe();
    }

    getPersonsOfCartera(cartera) {

        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'persons/personsOfCartera/' + cartera, { headers: headers }).map((res: Response) => res);

    }


    getPersonsOfProgramByUser(ObjID) {

        let body = JSON.stringify(ObjID);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'persons/personsOfProgramByUserId/', body, { headers: headers }).map((res: Response) => res);

    }
    getAllEvents() {
        return this._http.get(this.url + 'events/all').map((res: Response) => res);
    }

    setInteresOfPersonFromEvent(ObjId) {
        let body = JSON.stringify(ObjId);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'persons/setInteres/', body, { headers: headers }).map((res: Response) => res);


    }
    getInteresOfPersonaWithInteres(ObjId) {
        let body = JSON.stringify(ObjId);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'persons/getInteres/', body, { headers: headers }).map((res: Response) => res);


    }
    getInteresOfPerson(ObjID) {
        let body = JSON.stringify(ObjID);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'persons/getInteres/', body, { headers: headers }).map((res: Response) => res);

    }
    addInteresToEvents(ObjID) {
        let body = JSON.stringify(ObjID);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'events/addInteresToEvents/', body, { headers: headers }).map((res: Response) => res);

    }
    saveBatchWhatsappNumbers(Obj) {

        let body = JSON.stringify(Obj);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'persons/BatchWhatsappNumbers/', body, { headers: headers }).map((res: Response) => res);


    }
    getPersonasInteresWithEvent(idEvent) {
        let body = JSON.stringify(idEvent);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'events/getPersonasInteresWithEvent/', body, { headers: headers }).map((res: Response) => res);


    }
    getPersonFilterInteresWithEvent(eventInteres) {
        let body = JSON.stringify(eventInteres);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'events/getPersonFilterInteresWithEvent/', body, { headers: headers }).map((res: Response) => res);



    }


    getPersonasInteresWithEventByCartera(eventInteres) {
        let body = JSON.stringify(eventInteres);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'events/getPersonasInteresWithEventByCartera/', body, { headers: headers }).map((res: Response) => res);



    }
    getPersonFilterInteresWithEventByCartera(eventInteres) {
        let body = JSON.stringify(eventInteres);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'events/getPersonFilterInteresWithEventByCartera/', body, { headers: headers }).map((res: Response) => res);



    }

    getCurrentRol(idendity) {

        let body = JSON.stringify(idendity);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'roles/current/', body, { headers: headers }).map((res: Response) => res);


    }
    ///////////////////////////////////////////////////////////////////////////////////////////

    // addTracing(personId, trac) {
        
    //     let body = JSON.stringify(trac);
    //     var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    //     return this._http.put(this.url + 'persons/tracing/' + personId, body, { headers: headers }).map((res: Response) => res);
      
    // }

    addNewTracing(personId, trac) {
        let body = JSON.stringify(trac);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.put(this.url + 'persons/newTracing/' + personId, body, { headers: headers }).map((res: Response) => res);
    }
    ///////////////////////////////////////////////////////////////////////////////

    filterUniversidadMedio(obj){
        let body = JSON.stringify(obj);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'persons/filterUniversidadMedio/', body, { headers: headers }).map((res: Response) => res);




    }

    getAllEjecutivosOfSucursal(identity){

        let body = JSON.stringify(identity);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'users/getAllEjecutivosOfSucursal/', body, { headers: headers }).map((res: Response) => res);


    }
    getPersonsShareCarteraEvent(objt){
        let body = JSON.stringify(objt);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'persons/getPersonsShareCarteraEvent/', body, { headers: headers }).map((res: Response) => res);



    }

    addNewPerson(registro){
        let body = JSON.stringify(registro);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'persons/addNewPerson/', body, { headers: headers }).map((res: Response) => res);

    }

    reporteTrimestralEjecutivos(objt){
        let body = JSON.stringify(objt);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'users/reporteTrimestralEjecutivos/', body, { headers: headers }).map((res: Response) => res);

    }

    reporteTrimestralInscritosEjecutivos(objt){
        let body = JSON.stringify(objt);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'users/reporteTrimestralInscritosEjecutivos/', body, { headers: headers }).map((res: Response) => res);


    }

    getEjecutivoToEdit(ejecutivoId){
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'users/getEjecutivoToEdit/' + ejecutivoId, { headers: headers }).map((res: Response) => res);
    
      }

      addUniversidad(uni){
        let body = JSON.stringify(uni);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'list/add/university', body, { headers: headers }).map((res: Response) => res);
      } 
      addCarrera(carr){
        let body = JSON.stringify(carr);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'list/add/carrera', body, { headers: headers }).map((res: Response) => res);
      }  
  reasignarCartera(ObjId){

    let body = JSON.stringify(ObjId);	
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');		
    return this._http.post(this.url + 'carteras/reasignarCartera/', body, { headers: headers }).map((res: Response) => res);		
	
  }
  getEventsOfSucursal(identityId){

    
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'events/getEventsOfSucursal/' + identityId, { headers: headers }).map((res: Response) => res);	

  }

  getEventsFilterByDates(fechas){

    let body = JSON.stringify(fechas);
    console.log(body);	
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');		
    return this._http.post(this.url + 'events/getEventsFilterByDates/', body, { headers: headers }).map((res: Response) => res);	
  }

  getReportEvent(eventId){

    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'events/getReportEvent/' + eventId, { headers: headers }).map((res: Response) => res);
  }


}