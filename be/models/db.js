//import { isObject } from 'util';

// import { mongo } from 'mongoose';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
process.env.TZ = 'America/La_Paz';

module.exports = {
      ///Account
      mkt_roles: mongoose.model('mkt_roles', new Schema({
            name: String,

            _id: { type: ObjectId, default: function () { return new mongoose.Types.ObjectId } },
      })),

      ////////////////////////////////////////////////////////////////////////////

      mkt_users: mongoose.model('mkt_users', new Schema({
            name: String,
            lastname: String,
            cell: Number,
            correo: String,

            active: Boolean,
            password_hash: String,

            // token: String,
            rol: ObjectId,
            offices: ObjectId,
            amount: Number,

            _id: { type: ObjectId, default: function () { return new mongoose.Types.ObjectId } },
            record_date: { type: Date, default: function () { return new Date() } },
      })),

      ////////////////////////////////////////////////////////////////////////////


    
      mkt_carteras: mongoose.model('mkt_carteras', new Schema({
            name: String,
            user: ObjectId,
            active: Boolean,


            _id: { type: ObjectId, default: function () { return new mongoose.Types.ObjectId } },
            record_date: { type: Date, default: function () { return new Date } }

      })),

      //////////////////////////////////////////////////

      mkt_persons: mongoose.model('mkt_persons', new Schema({
            first_name: String,
            last_name: String,
            ci: Number,
            phone: Number,
            cellphone: Number,
            whatsapp_group: String,
            contact_medium: Number,
            //////////////
            //  1:wathsapp 2:afiches 3:faceb 4:recomend 
            //  5:vistasAula 6:visitasEmpresa
            ///////////
            city: String,
            email: String,
            ocupation: String,//1 = universitario, 2=Profesional, 3=particular
            descOcupation: {
                  //universitario
                  carrera: String,
                  universidad: Number,
                  ///////
                  /// 1 Universidad Mayor de San Simon
                  /// 2 U. Catolica
                  /// 3 U.latinoamericana
                  //////
                  semestre: String,
                  //Particular
                  areaTrabajo: String,
                  //Profesional
                  profesion: String,
                  empresa: String,
                  cargo: String,
            },
            //////////////
            carteras: ObjectId,
            /////////////<<<<<< HEAD
            profile: {
                  programs: ObjectId,
                  // modulars: [{
                  //       amount: {  // observation
                  //             detail: String,
                  //             receipt: String,// nro factura
                  //             date: Date,
                  //             amount: Number,
                  //       },
                  //       assist: Boolean, //cambio
                  //       events: ObjectId,
                  //       //    inscription: ObjectId,
                  //       modules: ObjectId,
                  //       print_certificate: Boolean,
                  // }],
                  final_work: {
                        stade: Number, // entregado=1, no entrego=2
                        observations: String,
                  },
                  requirements: { // true=entrego, false=no entrego
                        photograpy: Boolean,
                        photocopy_ci: Boolean,
                        photocopy_titule: Boolean
                  },
                  total_price: Number,
                  payed: Number, //cancelado
                  debt: Number,  // deuda
                  print_diploma: Boolean
            },
            /////////////////para interes en programas////
            interes: [
                  {
                        programId: ObjectId,
                        programName: String,
                        checked: Boolean,
                        state: Number,
                        date_state:Date,
                        ////////////
                        //  0 interesados
                        //  1 en duda     
                        //  2 confirmados
                        //  3 isncritos
                        //  4 enlinea
                        //  5 proximo evento 
                        //  6 sin interes
                        //////// 
                        tracing: [{
                              details: String,
                              state: Number, // posibles estados
                              ////////////////
                              /// 0 programar llamada
                              /// 1 no contesto llamada
                              /// 2 contesto llamada
                              ////////////////
                              _id: { type: ObjectId, default: function () { return new mongoose.Types.ObjectId } },
                              record_date: { type: Date, default: function () { return new Date() } },
                        }]
                  }
            ],

            /////////////////////////////////////////////////




            // user: ObjectId,
            _id: { type: ObjectId, default: function () { return new mongoose.Types.ObjectId } },
            record_date: { type: Date, default: function () { return new Date() } },
      })),

      ////////////////////////////////////////////////////////////////////////////

      mkt_facilitators: mongoose.model('mkt_facilitators', new Schema({
            name: String,
            job: String,


            _id: { type: ObjectId, default: function () { return new mongoose.Types.ObjectId } },
            record_date: { type: Date, default: function () { return new Date() } },
      })),
      ////////////////////////////////////////////////////////////////////////////
      mkt_listExtra: mongoose.model('mkt_listExtra', new Schema({
            university: [{nombre:String
                        }],
            carrera: [{nombre:String}],
            // job: String,


            _id: { type: ObjectId, default: function () { return new mongoose.Types.ObjectId } },
            record_date: { type: Date, default: function () { return new Date() } },
      })),

      ////////////////////////////////////////////////////////////////////////////

      mkt_events: mongoose.model('mkt_events', new Schema({
            name: String,
            description: String,
            date_start: Date,
            modulars: [{
                  date_start: Date,
                  date_end: Date,
                  facilitators: ObjectId,
                  modules: ObjectId,
                  lists: [ObjectId],////existe Modulars en Lists!!!!
                  _id: ObjectId////
            }],
            inscriptions: [{
                  // segun al numero de asistencias sacar el precio total q tiene q pagar
                  total_price: Number, //total a pagar segun asistencia
                  module_price: Number,
                  bolivianos_price: Number,
                  dolares_price: Number,
                  canceled_price: Number,
                  price_event: Number,
                  receipt: String,
                  //////
                  name: String,
                  ci: String,
                  cellphone: Number,
                  persons: ObjectId,
                  users: ObjectId
            }],
            total: Number,
            programs: ObjectId,
            interes: [
                  {
                        persons: ObjectId,
                        details: String,
                        state: Number,
                        date_state:Date,
                        ////////////
                        //  0 interesados
                        //  1 en duda
                        //  2 confirmados
                        //  3 isncritos
                        //  4 enlinea
                        //  5 proximo evento 
                        //  6 sin interes
                        //////// 
                        tracing: [{
                              details: String,
                              state: Number,
                              ////////////////
                              /// 0 programar llamada
                              /// 1 no contesto llamada
                              /// 2 contesto llamada
                              ////////////////
                              _id: { type: ObjectId, default: function () { return new mongoose.Types.ObjectId } },
                              record_date: { type: Date, default: function () { return new Date() } },
                        }]

                  }

            ],
            offices: ObjectId,
            date_end:Date,
            active:Boolean,
            //modulo: [ObjectId],

            _id: { type: ObjectId, default: function () { return new mongoose.Types.ObjectId } },
            record_date: { type: Date, default: function () { return new Date() } },
      })),

      ////////////////////////////////////////////////////////
      mkt_lists: mongoose.model('mkt_lists', new Schema({
            bolivianos: Number,
            dolares: Number,
            receipt: String, // varios recibos
            assist: Boolean,
            type: Number, //nuevo // nivelacion
            person: ObjectId,
            events: ObjectId,
            modulars: ObjectId,

            _id: { type: ObjectId, default: function () { return new mongoose.Types.ObjectId } },
            record_date: { type: Date, default: function () { return new Date() } },
      })),

      ////////////////////////////////////////////////////////

      mkt_programs: mongoose.model('mkt_programs', new Schema({
            name: String,
            //modules: [String],
            details: String,

            _id: { type: ObjectId, default: function () { return new mongoose.Types.ObjectId } },
            record_date: { type: Date, default: function () { return new Date() } },
      })),

      mkt_modules: mongoose.model('mkt_modules', new Schema({
            number: Number,
            name: String,
            content: [String],
            programs: ObjectId,

            _id: { type: ObjectId, default: function () { return new mongoose.Types.ObjectId } },
            record_date: { type: Date, default: function () { return new Date() } },
      })),

      //////////////////////////////////////////////////////////////////

      mkt_offices: mongoose.model('mkt_offices', new Schema({
            name: String,
            // nit:String,
            ubicacion: String,
            caja: Number,
            departament: String,
            company_id: ObjectId,

            _id: { type: ObjectId, default: function () { return new mongoose.Types.ObjectId } },
            record_date: { type: Date, default: function () { return new Date() } }
      })),

      //////////////////////////////////////////////////////////////////

      mkt_company: mongoose.model('mkt_company', new Schema({
            name: String,
            nit: String,
            caja: Number,
            cash_flow: [{
                  amount: Number,
                  description: String,
                  _id: ObjectId
            }],
            _id: { type: ObjectId, default: function () { return new mongoose.Types.ObjectId } },
            record_date: { type: Date, default: function () { return new Date() } }
      })),

      //////////////////////////////////////////////////////////////////

      mkt_correlatives: mongoose.model('mkt_correlatives', new Schema({
            year: Date,
            company_id: ObjectId,
            //user_id: ObjectId,
            receipts: [{
                  receipt: Number,
                  amount: Number,
                  description: String
            }],

            _id: { type: ObjectId, default: function () { return new mongoose.Types.ObjectId } },
            record_date: { type: Date, default: function () { return new Date() } }
      })),

      // registers: mongoose.model('mkt_registers', new Schema({
      //    name: String,
      //    datails: String,
      //    state: Number,
      //    // state of number 

      //    _id: { type: ObjectId, default: function () { return new mongoose.Types.ObjectId } },
      //    record_date: { type: Date, default: function () { return new Date() } },
      // })),

      //Connection
      connection: function () {
            var db = mongoose.connect('mongodb://localhost:27017/CecapMarketing',
                  function (err) {
                        if (err) return console.log(err);
                        console.log("MongoDB: connection to database succesful!");
                  }).connection;
      },

      endMongoConnection: function () {
            mongoose.connection.close(function () {
                  // console.log
                  process.exit(0);
            });
      }
};
// var types = {
// 	available: 0,
// 	send: 1,
// 	sold: 2
// }