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
        return this._http.get(this.url + 'Mkt_events').map((res: Response) => res);
    }
    getEvent(id) {
        return this._http.get(this.url + 'Mkt_events/' + id).map((res: Response) => res);
    }
    //prueba
    getEventInscriptions(id) {
        return this._http.get(this.url + 'Mkt_events/inscriptions/' + id).map((res: Response) => res);
    }
    getTrimestral() {
        return this._http.get(this.url + 'Mkt_events/trimestral').map((res: Response) => res);
    }
    addProgram(program) {
        let body = JSON.stringify(program);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_programs/add', body, { headers: headers }).map((res: Response) => res);
    }
    getPrograms() {

        return this._http.get(this.url + 'Mkt_programs').map((res: Response) => res);
    }
    getProgram(_id) {
        return this._http.get(this.url + 'Mkt_programs/' + _id).map((res: Response) => res);
    }
    addModulo(modulo) {
        let body = JSON.stringify(modulo);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_modules/add', body, { headers: headers }).map((res: Response) => res);
    }
    getModulos(idProgram) {
        console.log(idProgram)
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'Mkt_modules/lista/' + idProgram, { headers: headers }).map((res: Response) => res);
    }
    getEventModuls(eventId) {
        console.log(eventId)
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'Mkt_modules/eventoModuls/' + eventId, { headers: headers }).map((res: Response) => res);
    }
    getModulo(_id) {
        return this._http.get(this.url + 'Mkt_modules/' + _id).map((res: Response) => res);
    }
    //    getIdProgram(nomProgram){
    //     let body = JSON.stringify(nomProgram);
    //      var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    //       return this._http.post(this.url + 'Mkt_programs/id', body, { headers: headers }).map((res: Response) => res);
    //    }
    addEvent(event) {
        let body = JSON.stringify(event);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_events', body, { headers: headers }).map((res: Response) => res);
    }
    addPerson(person) {
        let body = JSON.stringify(person);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_persons', body, { headers: headers }).map((res: Response) => res);
    }
    addInscriptPerson(registro) {
        let body = JSON.stringify(registro);
        var idEvent = registro.idEvent;
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_events/inscriptPerson/' + idEvent, body, { headers: headers }).map((res: Response) => res);
    }
    getPerson(_id) {
        return this._http.get(this.url + 'Mkt_persons/' + _id).map((res: Response) => res);
    }
    getCi(ci) {
        return this._http.get(this.url + 'Mkt_persons/existCi/' + ci).map((res: Response) => res);
    }
    getPersons() {
        return this._http.get(this.url + 'Mkt_persons').map((res: Response) => res);
    }
    getEventConfirmed(id) {
        return this._http.get(this.url + 'Mkt_events/' + id).map((res: Response) => res);
    }
    getCarteras() {
        return this._http.get(this.url + 'Mkt_carteras').map((res: Response) => res);
    }
    getCartera(_id) {
        return this._http.get(this.url + 'Mkt_carteras' + _id).map((res: Response) => res);
    }
    getCarterasLibres() {
        return this._http.get(this.url + 'Mkt_carteras/libres').map((res: Response) => res);
    }
    crearCartera(cartera) {
        let body = JSON.stringify(cartera);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_carteras/guardar', body, { headers: headers }).map((res: Response) => res);
    }
    getFacilitadores() {
        return this._http.get(this.url + 'Mkt_facilitators').map((res: Response) => res);
    }
    getFacilitador(id) {
        return this._http.get(this.url + 'Mkt_facilitators/' + id).map((res: Response) => res);
    }
    addFacilitador(user) {
        let body = JSON.stringify(user);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_facilitators/register', body, { headers: headers }).map((res: Response) => res);
    }
    updateFacilitador(facilitador_object) {
        console.log(facilitador_object);
        let body = JSON.stringify(facilitador_object);
        var idfacilitador = facilitador_object._id;
        // console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.put(this.url + 'Mkt_facilitators/update/' + idfacilitador, body, { headers: headers }).map((res: Response) => res);
    }
    addUser(user) {
        let body = JSON.stringify(user);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_users/register', body, { headers: headers }).map((res: Response) => res);
    }
    getUser() {
        return this._http.get(this.url + 'Mkt_users').map((res: Response) => res);
    }
    getOneUser(_id) {
        return this._http.get(this.url + 'Mkt_users/' + _id).map((res: Response) => res);
    }
    deleteUser(_id) {

        return this._http.delete(this.url + 'Mkt_users/' + _id).map((res: Response) => res);
    }
    getMejorEjecutivo(_id) {
        return this._http.get(this.url + 'Mkt_events/mejorEjecutivo/' + _id).map((res: Response) => res);
    }

    updatePerson(person) {
        let body = JSON.stringify(person);
        var idPerson = person._id;
        // console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.put(this.url + 'Mkt_persons/' + idPerson, body, { headers: headers }).map((res: Response) => res);
    }
    //return this._http.post(this.url + 'Mkt_events/edit',body,{headers : headers}).map((res:Response)=>res);
    //.catch(this.handleError);
    updatePersonOcupation(descOcupation, id) {
        let body = JSON.stringify(descOcupation);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.put(this.url + 'Mkt_persons/ocupation/' + id, body, { headers: headers }).map((res: Response) => res);
    }
    getPersonCartera(_id) {

        // console.log(_id+"desde peticionesservice")
        return this._http.get(this.url + 'Mkt_carteras/persons/' + _id).map((res: Response) => res);
        //  return this._http.get(this.url+'cartera/listPersonsCartera/'+_id).map((res: Response)=> res);

    }
    getCarteraFromUserId(id) {
        // console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'Mkt_carteras/otro/' + id, { headers: headers }).map((res: Response) => res);
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
        return this._http.put(this.url + 'Mkt_carteras/' + idCartera, body, { headers: headers }).map((res: Response) => res);
    }
    addCartera(cartera) {
        let body = JSON.stringify(cartera);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_carteras/register', body, { headers: headers }).map((res: Response) => res);
    }
    getRole(id) {
        return this._http.get(this.url + 'Mkt_users/rolName/' + id).map((res: Response) => res);
    }
    updateUser(user_object) {
        console.log(user_object);
        let body = JSON.stringify(user_object);
        var idUser = user_object._id;
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.put(this.url + 'Mkt_users/' + idUser, body, { headers: headers }).map((res: Response) => res);
    }
    updateProgram(program_object) {
        //   console.log(program_object, 'test');
        let body = JSON.stringify(program_object);
        var idProgram = program_object._id;
        // console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.put(this.url + 'Mkt_programs/edit/' + idProgram, body, { headers: headers }).map((res: Response) => res);
    }
    updateModulo(modulo_object) {
        console.log(modulo_object);
        let body = JSON.stringify(modulo_object);
        var idModulo = modulo_object._id;
        // console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.put(this.url + 'Mkt_modules/edit/' + idModulo, body, { headers: headers }).map((res: Response) => res);
    }
    getSucursales() {
        return this._http.get(this.url + 'Mkt_offices').map((res: Response) => res);
    }
    addCorrelative(correlative) {
        let body = JSON.stringify(correlative);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_correlatives/add', body, { headers: headers }).map((res: Response) => res);
    }
    getSucursal(id) {

        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'Mkt_offices/' + id, { headers: headers }).map((res: Response) => res);
    }
    getRoles() {
        return this._http.get(this.url + 'Mkt_roles').map((res: Response) => res);
    }

    
    
    ///////////////////////////////////////////////////////////////////////////7
    addAssitance(lists) {
        let body = JSON.stringify(lists);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_lists', body, { headers: headers }).map((res: Response) => res);
    }
    getList(id) {
        return this._http.get(this.url + 'Mkt_lists/person/' + id).map((res: Response) => res);
    }
    ////////////////////////////////////////////// sistema MARKETING////////////////////////
    addPersonFromWhatsapp(person) {
        let body = JSON.stringify(person);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_persons/addFromWhatsapp', body, { headers: headers }).map((res: Response) => res);
    }

    postFile(fileToUpload: File, cartera, interes): Observable<boolean> {
        const endpoint = this.url + 'Mkt_persons/upload';
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
        return this._http.get(this.url + 'Mkt_persons/personsOfCartera/' + cartera, { headers: headers }).map((res: Response) => res);

    }


    getPersonsOfProgramByUser(ObjID) {

        let body = JSON.stringify(ObjID);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_persons/personsOfProgramByUserId/', body, { headers: headers }).map((res: Response) => res);

    }
    getAllEvents(id) {
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'Mkt_events/all/' + id, { headers: headers }).map((res: Response) => res);

        // return this._http.get(this.url + 'Mkt_events/all').map((res: Response) => res);
    }
    getAllEventsActive(id){
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'Mkt_events/getAllEventsActive/' + id, { headers: headers }).map((res: Response) => res);

    }

    setInteresOfPersonFromEvent(ObjId) {
        let body = JSON.stringify(ObjId);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_persons/setInteres/', body, { headers: headers }).map((res: Response) => res);


    }
    getInteresOfPersonaWithInteres(ObjId) {
        let body = JSON.stringify(ObjId);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_persons/getInteres/', body, { headers: headers }).map((res: Response) => res);


    }
    getInteresOfPerson(ObjID) {
        let body = JSON.stringify(ObjID);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_persons/getInteres/', body, { headers: headers }).map((res: Response) => res);

    }
    addInteresToEvents(ObjID) {
        let body = JSON.stringify(ObjID);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_events/addInteresToEvents/', body, { headers: headers }).map((res: Response) => res);

    }
    saveBatchWhatsappNumbers(Obj) {

        let body = JSON.stringify(Obj);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_persons/BatchWhatsappNumbers/', body, { headers: headers }).map((res: Response) => res);


    }
    getPersonasInteresWithEvent(idEvent) {
        let body = JSON.stringify(idEvent);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_events/getPersonasInteresWithEvent/', body, { headers: headers }).map((res: Response) => res);


    }
    getPersonFilterInteresWithEvent(eventInteres) {
        let body = JSON.stringify(eventInteres);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_events/getPersonFilterInteresWithEvent/', body, { headers: headers }).map((res: Response) => res);



    }


    getPersonasInteresWithEventByCartera(eventInteres) {
        let body = JSON.stringify(eventInteres);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_events/getPersonasInteresWithEventByCartera/', body, { headers: headers }).map((res: Response) => res);



    }
    getPersonFilterInteresWithEventByCartera(eventInteres) {
        let body = JSON.stringify(eventInteres);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_events/getPersonFilterInteresWithEventByCartera/', body, { headers: headers }).map((res: Response) => res);



    }

    getCurrentRol(idendity) {

        let body = JSON.stringify(idendity);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_roles/current/', body, { headers: headers }).map((res: Response) => res);


    }
    ///////////////////////////////////////////////////////////////////////////////////////////

    // addTracing(personId, trac) {
        
    //     let body = JSON.stringify(trac);
    //     var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    //     return this._http.put(this.url + 'Mkt_persons/tracing/' + personId, body, { headers: headers }).map((res: Response) => res);
      
    // }

    addNewTracing(personId, trac) {
        let body = JSON.stringify(trac);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.put(this.url + 'Mkt_persons/newTracing/' + personId, body, { headers: headers }).map((res: Response) => res);
    }
    ///////////////////////////////////////////////////////////////////////////////

    filterUniversidadMedio(obj){
        let body = JSON.stringify(obj);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_persons/filterUniversidadMedio/', body, { headers: headers }).map((res: Response) => res);




    }

    getAllEjecutivosOfSucursal(identity){

        let body = JSON.stringify(identity);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_users/getAllEjecutivosOfSucursal/', body, { headers: headers }).map((res: Response) => res);


    }
    getPersonsShareCarteraEvent(objt){
        let body = JSON.stringify(objt);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_persons/getPersonsShareCarteraEvent/', body, { headers: headers }).map((res: Response) => res);



    }

    addNewPerson(registro){
        let body = JSON.stringify(registro);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_persons/addNewPerson/', body, { headers: headers }).map((res: Response) => res);

    }

    reporteTrimestralEjecutivos(objt){
        let body = JSON.stringify(objt);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_users/reporteTrimestralEjecutivos/', body, { headers: headers }).map((res: Response) => res);

    }

    reporteTrimestralInscritosEjecutivos(objt){
        let body = JSON.stringify(objt);
        //console.log(body);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_users/reporteTrimestralInscritosEjecutivos/', body, { headers: headers }).map((res: Response) => res);


    }

    getEjecutivoToEdit(ejecutivoId){
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.get(this.url + 'Mkt_users/getEjecutivoToEdit/' + ejecutivoId, { headers: headers }).map((res: Response) => res);
    
      }

      addUniversidad(uni){
        let body = JSON.stringify(uni);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_list/add/university', body, { headers: headers }).map((res: Response) => res);
      } 
      addCarrera(carr){
        let body = JSON.stringify(carr);
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this._http.post(this.url + 'Mkt_list/add/carrera', body, { headers: headers }).map((res: Response) => res);
      }  
  reasignarCartera(ObjId){

    let body = JSON.stringify(ObjId);	
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');		
    return this._http.post(this.url + 'Mkt_carterasreasignarCartera/', body, { headers: headers }).map((res: Response) => res);		
	
  }
  getEventsOfSucursal(identityId){

    
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'Mkt_events/getEventsOfSucursal/' + identityId, { headers: headers }).map((res: Response) => res);	

  }

  getEventsFilterByDates(fechas){

    let body = JSON.stringify(fechas);
    console.log(body);	
    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');		
    return this._http.post(this.url + 'Mkt_events/getEventsFilterByDates/', body, { headers: headers }).map((res: Response) => res);	
  }

  getReportEvent(eventId){

    var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this._http.get(this.url + 'Mkt_events/getReportEvent/' + eventId, { headers: headers }).map((res: Response) => res);
  }

  cerrarEvento(id){
    return this._http.get(this.url + 'Mkt_events/cerrarEvento/' + id).map((res: Response) => res);
    
  }

}