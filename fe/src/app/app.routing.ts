import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import components
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './event/event.component';
import { ProfilePersonComponent } from './event/profile-person/profile-person.component';
import { ReportsComponent } from './graphicReports/reports/reports.component';
import { ReportTrimestralComponent } from './graphicReports/report-trimestral/report-trimestral.component';
import { ReportEventComponent } from './graphicReports/report-event/report-event.component';
import { CarteraComponent } from "./cartera/cartera.component";
import { AddCarteraComponent } from './cartera/add-cartera/add-cartera.component';
import { InfoCarteraComponent } from "./cartera/info-cartera/info-cartera.component";
import { EditCarteraComponent } from "./cartera/edit-cartera/edit-cartera.component";
import { EjecutivoComponent } from "./ejecutivo/ejecutivo.component";
import { EditEjecutivoComponent } from './ejecutivo/edit-ejecutivo/edit-ejecutivo.component';
import { PersonaComponent } from "./event/persona/persona.component";
import { AddPersonComponent } from './event/persona/addPerson/addPerson.component';
import { EditComponent } from "./event/persona/edit/edit.component";
import { SucursalComponent } from './sucursal/sucursal.component';
import { AddSucursalComponent } from './sucursal/addSucursal/addsucursal.component';
import { HeroFormComponent } from "./hero-form/hero-form.component";
import { DetalleCajaComponent } from './sucursal/detalle-caja/detalle-caja.component';
import { DetallePersonalComponent } from './sucursal/detalle-personal/detalle-personal.component';
import { AddEjecutivoComponent } from "./ejecutivo/add-ejecutivo/add-ejecutivo.component";

import { Programa } from './modelo/programa';
import { ProgramaComponent } from './programa/programa.component';
import { EditProgramaComponent } from './programa/edit-programa/edit-programa.component';
import { AddProgramaComponent } from './programa/add-programa/add-programa.component';
import { ModuloComponent } from './modulo/modulo.component';
import { EditModuloComponent } from './modulo/edit-modulo/edit-modulo.component';
import { AddModuloComponent } from './modulo/add-modulo/add-modulo.component';

import { InfoEjecutivoComponent } from "./ejecutivo/info-ejecutivo/info-ejecutivo.component";
import { VistaCajaComponent } from "./caja/vista-caja/vista-caja.component";

import { IngresoComponent } from "./caja/ingreso/ingreso.component";
import { EgresoComponent } from './caja/egreso/egreso.component';
import { facilitadorComponent } from './facilitador/facilitador.component';
import { AddFacilitadorComponent } from './facilitador/add-facilitador/add-facilitador.component';
import { EditFacilitadorComponent } from './facilitador/edit-facilitador/edit-facilitador.component';
import { AddCorrelativeComponent } from './correlative/add-correlative/add-correlative.component';
import { AddEventComponent } from './events/addEvent/addEvent.component';
import { PendingCashComponent } from "./pending-cash/pending-cash.component";
import { ControlAsistanceComponent } from './event/control-asistance/control-asistance.component';

import { InfoPendingCashComponent } from "./pending-cash/info-pending-cash/info-pending-cash.component";
import { OfficesCashComponent } from "./offices-cash/offices-cash.component";
//import { AlertComponent } from './events/alert/alert.component';
import { AsistenciaComponent } from './event/asistencia/asistencia.component';
import { InscriptionComponent } from './event/inscription/inscription.component';




const appRoutes: Routes = [
   { path: '', component: HomeComponent },//ruta basica
   { path: 'login', component: LoginComponent },
   {
      path: 'home', component: HomeComponent,
      children: [
         { path: 'home', redirectTo: 'home', pathMatch: 'full' },
         { path: 'events', component: EventsComponent },
         //{ path: 'events/alert', component: AlertComponent },
         { path: 'events/add', component: AddEventComponent },
         { path: 'event/:id', component: EventComponent },
         { path: 'event/asistencia/:id', component: AsistenciaComponent },
         { path: 'profilePerson/:id', component: ProfilePersonComponent },
         { path: 'reports', component: ReportsComponent },
         { path: 'trimestral', component: ReportTrimestralComponent },
         { path: 'reportEvent/:id', component: ReportEventComponent },
         { path: 'persons', component: PersonaComponent },
         { path: 'persons/add', component: AddPersonComponent },
         { path: 'persons/edit/:id', component: EditComponent },
         { path: 'persons/asistencia/:id', component: AsistenciaComponent },
         { path: 'cartera', component: CarteraComponent },
         { path: 'cartera/add', component: AddCarteraComponent },
         { path: 'cartera/:id', component: InfoCarteraComponent },
         { path: 'cartera/edit/:name', component: EditCarteraComponent },
         { path: 'ejecutivo', component: EjecutivoComponent },
         { path: 'ejecutivo/add', component: AddEjecutivoComponent },
         { path: 'ejecutivo/:id', component: InfoEjecutivoComponent },
         { path: 'ejecutivo/edit/:active', component: EditEjecutivoComponent },
         { path: 'sucursal', component: SucursalComponent },
         { path: 'sucursal/add', component: AddSucursalComponent },
         { path: 'sucursal/detalleCaja', component: DetalleCajaComponent },
         { path: 'sucursal/detalleCaja/:id', component: DetalleCajaComponent },
         { path: 'sucursal/personal', component: DetallePersonalComponent },
         { path: 'formulariobase', component: HeroFormComponent },
         { path: 'programs', component: ProgramaComponent },
         { path: 'program/edit/:id', component: EditProgramaComponent },
         { path: 'program/add', component: AddProgramaComponent },
         { path: 'modulos/:id', component: ModuloComponent },
         { path: 'modulo/edit/:id', component: EditModuloComponent },
         { path: 'modulo/add/:id', component: AddModuloComponent },
         { path: 'caja/vistacaja', component: VistaCajaComponent },
         { path: 'caja/ingreso', component: IngresoComponent },
         { path: 'caja/egreso', component: EgresoComponent },
         { path: 'facilitador', component: facilitadorComponent },
         { path: 'facilitador/add', component: AddFacilitadorComponent },
         { path: 'facilitador/edit/:id', component: EditFacilitadorComponent },
         { path: 'correlative/add', component: AddCorrelativeComponent },
         { path: 'pendientes', component: PendingCashComponent },
         { path: 'pendientes/info/:id', component: InfoPendingCashComponent },
         { path: 'officesCash', component: OfficesCashComponent },
         { path: 'inscription/:id', component: InscriptionComponent },

      ]
   },

   //{path: '', component: LoginFormComponent}
   { path: '**', component: HomeComponent }//ruta redir

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);