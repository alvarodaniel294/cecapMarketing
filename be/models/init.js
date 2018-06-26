var mongoose = require('mongoose');
var db = require('./db');

///////////////////////////////////////

var _mkt_offices_stc = {
   name: 'cecap Santa Cruz',
   //nit:'7012323123424',
   ubicacion: 'Beni',
   caja: 1000,
   departament: 'Sta. Cruz',
   company_id: _mkt_company,
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _mkt_offices = [_mkt_offices_stc];
//////////////////////////////////////////////////////////

var _mkt_company0 = {
   name: 'CECAP Company',
   nit: 71231901020,
   caja: 200000,
   cash_flow: [{
      amount: 2000,
      description: ' fundacion company',
      _id: new mongoose.Types.ObjectId
   }],
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _mkt_company = [_mkt_company0];
///////////////////////////////////////////////////////////

//Accounts
var _mkt_rol_admin = {
   name: 'Admin',

   _id: new mongoose.Types.ObjectId
};
var _mkt_rol_ejecutivo = {
   name: 'Ejecutivo',

   _id: new mongoose.Types.ObjectId
};
var _mkt_rol_gerente = {
   name: 'Gerente',
   _id: new mongoose.Types.ObjectId
}
var _mkt_roles = [_mkt_rol_admin, _mkt_rol_ejecutivo, _mkt_rol_gerente];

/////////////////////////////////////////////////////////
var _mkt_user_admin = {
   name: 'a',
   active: true,
   password_hash: 'a',
   token: 'ASD@!C$$#Q@34234C$#CR$#C344354',
   rol: _mkt_rol_admin._id,
   offices: _mkt_offices_stc,
   amount: 1000,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _mkt_user_ejecutivo1 = {
   name: 'e',
   salary: 123,
   active: true,
   password_hash: 'e',
   token: 'ASDWQ#$VHTHEE^EVW324213123c21#2',
   rol: _mkt_rol_ejecutivo._id,
   offices: _mkt_offices_stc,
   amount: 2000,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _mkt_user_ejecutivo2 = {
   name: 'i',
   salary: 123,
   active: true,
   password_hash: 'i',
   token: 'ASDWQ#$VHTHEE^EVW324213123c21#2',
   rol: _mkt_rol_ejecutivo._id,
   offices: _mkt_offices_stc,
   amount: 1500,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _mkt_users = [_mkt_user_admin, _mkt_user_ejecutivo1, _mkt_user_ejecutivo2];

//////////////////////////////////////////////////////////////////////////
var _mkt_facilitator_1 = {
   name: 'Paola Quintanilla',
   job: 'rrhh',
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _mkt_facilitator_2 = {
   name: 'Alvaro Garcia',
   job: 'Seguridad',
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _mkt_facilitators = [_mkt_facilitator_1, _mkt_facilitator_2];

/////////////////////////////////////////////////////////

var _mkt_correlative1 = {
   year: '2018-03-04',
   company_id: _mkt_company._id, //ObjectId
   receipts: [{
      receipt: 010,   //numero recivo
      amount: 1000,      //catidad
      description: 'factura de inscripcion'
   }],
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _mkt_correlative2 = {
   year: '2018-04-01',
   company_id: _mkt_company._id, //ObjectId
   receipts: [{
      receipt: 011,   //numero recivo
      amount: 1000,      //catidad
      description: 'factura de inscripcion'
   }],
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _mkt_correlatives = [_mkt_correlative1, _mkt_correlative2];
////////////////////////CARTERA USER//////////////////////
var _mkt_cartera_user_1 = {
   name: 'cartera1',
   user: _mkt_user_admin,
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _mkt_cartera_user_2 = {
   name: 'cartera2',
   user: _mkt_user_ejecutivo1,
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _mkt_cartera_user_3 = {
   name: 'cartera3',
   user: _mkt_user_ejecutivo2,
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _mkt_carteras = [_mkt_cartera_user_1, _mkt_cartera_user_2, _mkt_cartera_user_3];
//////////////////////////////////////////////////////
var _mkt_program_seguridad = {
   name: 'seguridad industrial',
   details: 'para industrias.',
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _mkt_program_rrhh = {
   name: 'recursos humanos',
   details: 'para empresas.',
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _mkt_programs = [_mkt_program_seguridad, _mkt_program_rrhh];
////////////////////////////////////////////
var _mkt_modulo_1_seguridad = {
   number: 1,
   name: 'modulo 1',
   content: [
      '1. reclutamiento y seleccion',
      '2. induccion',
      '3. capacitacion'
   ],
   programs: _mkt_program_seguridad,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _mkt_modulo_2_seguridad = {
   number: 2,
   name: 'modulo 2',
   content: [
      '1. remuneracion',
      '2. motivacion',
      '3. clima laboral'
   ],
   programs: _mkt_program_seguridad,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}

var _mkt_modulo_1_rrhh = {
   number: 1,
   name: 'modulo 1',
   content: [
      '1. remuneracion1',
      '2. motivacion2',
      '3. clima laboral3'
   ],
   programs: _mkt_program_rrhh,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _mkt_modulo_2_rrhh = {
   number: 2,
   name: 'modulo 2',
   content: [
      '1. remuneracion1',
      '2. motivacion2',
      '3. clima laboral3'
   ],
   programs: _mkt_program_rrhh,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _mkt_modulo_3_rrhh = {
   number: 3,
   name: 'modulo 3',
   content: [
      '1. remuneracion1',
      '2. motivacion2',
      '3. clima laboral3'
   ],
   programs: _mkt_program_rrhh,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _mkt_modulo_4_rrhh = {
   number: 4,
   name: 'modulo 4',
   content: [
      '1. remuneracion1',
      '2. motivacion2',
      '3. clima laboral3'
   ],
   programs: _mkt_program_rrhh,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _mkt_modulo_5_rrhh = {
   number: 5,
   name: 'modulo 5',
   content: [
      '1. remuneracion1',
      '2. motivacion2',
      '3. clima laboral3'
   ],
   programs: _mkt_program_rrhh,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _mkt_modulo_6_rrhh = {
   number: 6,
   name: 'modulo 6',
   content: [
      '1. remuneracion1',
      '2. motivacion2',
      '3. clima laboral3'
   ],
   programs: _mkt_program_rrhh,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _mkt_modulo_7_rrhh = {
   number: 7,
   name: 'modulo 7',
   content: [
      '1. remuneracion1',
      '2. motivacion2',
      '3. clima laboral3'
   ],
   programs: _mkt_program_rrhh,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _mkt_modulo_8_rrhh = {
   number: 8,
   name: 'modulo 8',
   content: [
      '1. remuneracion1',
      '2. motivacion2',
      '3. clima laboral3'
   ],
   programs: _mkt_program_rrhh,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _mkt_modulos = [_mkt_modulo_1_seguridad, _mkt_modulo_2_seguridad, _mkt_modulo_1_rrhh, _mkt_modulo_2_rrhh, _mkt_modulo_3_rrhh, _mkt_modulo_4_rrhh, _mkt_modulo_5_rrhh, _mkt_modulo_6_rrhh, _mkt_modulo_7_rrhh, _mkt_modulo_8_rrhh];

/////////////////////////////////////////////////////////7
var _mkt_person_1 = {
   first_name: 'Jose',
   last_name: 'Gallardo',
   ci: 1234567,
   phone: 4653126,
   cellphone: 76543218,
   email: 'gallardo@gmail.com',
   ocupation: 'Estudiante',//1 = Estudiante, 2=Profesional, 3=particular
   descOcupation: {
      //universitario
      carrera: 'Sistemas',
      universidad: 'umss',
      semestre: '6to',
      //Particular
      areaTrabajo: '',
      //Profesional
      profesion: '',
      empresa: '',
      cargo: '',
   },
   //////////////
   carteras: _mkt_cartera_user_2,
   /////////////
   profile: [{
         programs: _mkt_program_rrhh,
         modulars: [{
            amount: {
               detail: 'String',
               receipt: 1001,
               date: '2018-03-31',
               amount: 150,
            },
            //debt: 150,
            assist: true,
            events: _mkt_event_seg,////////////////////duda???????
            //inscriptions: '',////////////////////duda??????
            modules: _mkt_modulo_1_rrhh,
            print_certificate: false,
         }],
         final_work: {
            stade: 2,  // entregado = 1, no entrego = 2
            observations: 'aun no entrego el proyecto',
         },
         requirements: {
            photograpy: true,
            photocopy_ci: true,
            photocopy_titule: false
         },
         total_price: 1200,
         payed: 1000, //cancelado
         debt: 200,  // deuda
         print_diploma: false
      }],
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _mkt_person_2 = {
   first_name: 'laura',
   last_name: 'estrada',
   ci: 1234566,
   phone: 431241514,
   cellphone: 79452311,
   email: 'laura@laura.com',
   ocupation: 'Profesional',
   descOcupation: {
      //universitario
      carrera: '',
      universidad: '',
      semestre: '',
      //Particular
      areaTrabajo: '',
      //Profesional
      profesion: 'Ingeniero',
      empresa: 'digitalHarbor',
      cargo: 'rrhh',
   },
   //////////////
   carteras: _mkt_cartera_user_2,
   /////////////
   profile: {
      programs: [{
         program: _mkt_program_rrhh,
         modulars: [{
            amount: {
               detail: 'modulo 1 rrhh',
               receipt: 1001,
               date: '2018-03-31',
               amount: 150,
            },
            //debt: 150,
            assist: true,
            events: _mkt_event_seg,////////////////////duda???????
            //inscriptions: '',////////////////////duda??????
            modules: _mkt_modulo_1_rrhh,
            print_certificate: false,
         }],
         final_work: {
            stade: 2,  // entregado = 1, no entrego = 2
            observations: 'aun no entrego el proyecto',
         },
         requirements: {
            photograpy: true,
            photocopy_ci: true,
            photocopy_titule: true
         },
         total_price: 2000,
         payed: 2000, //cancelado
         debt: 0,  // deuda
         print_diploma: false
      }]
   },
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _mkt_person_3 = {
   first_name: 'juan',
   last_name: 'perez',
   ci: 712337757,
   phone: 49879878,
   cellphone: 60121234,
   email: 'juan@juan.com',
   ocupation: 'Particular',
   descOcupation: {
      //universitario
      carrera: '',
      universidad: '',
      semestre: '',
      //Particular
      areaTrabajo: 'carpinteria',
      //Profesional
      profesion: '',
      empresa: '',
      cargo: '',
   },
   //////////////
   carteras: _mkt_cartera_user_2,
   /////////////
   profile: {
      programs: [{
         programs: _mkt_program_rrhh,
         modulars: [{
            amount: {
               detail: 'modulo 1 rrhh',
               receipt: 1001,
               date: '2018-03-31',
               amount: 150,
            },
            //debt: 150,
            assist: true,
            events: _mkt_event_seg,////////////////////duad???????
            //inscriptions: '',////////////////////dudaÇ??????
            modules: _mkt_modulo_1_rrhh,
            print_certificate: false,
         }],
         final_work: {
            stade: 2,  // entregado = 1, no entrego = 2
            observations: 'aun no entrego el proyecto',
         },
         requirements: {
            photograpy: true,
            photocopy_ci: true,
            photocopy_titule: false
         },
         total_price: 1500,
         payed: 1000, //cancelado
         debt: 500,  // deuda
         print_diploma: false
      }]
   },
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _mkt_person_4 = {
   first_name: 'lucia',
   last_name: 'galarza',
   //birthday: new Date(1992, 1, 1),
   ci: '5342425',
   phone: 41234314,
   cellphone: 79121232,
   email: 'lucia@lucia.com',
   ocupation: 'Estudiante',
   descOcupation: {
      //universitario
      carrera: 'Ing Sistemas',
      universidad: 'UMSS',
      semestre: '4to',
      //Particular
      areaTrabajo: '',
      //Profesional
      profesion: '',
      empresa: '',
      cargo: '',
   },
   //////////////
   carteras: _mkt_cartera_user_2,
   /////////////
   profile: {
      programs: [{
         programs: _mkt_program_rrhh,//modificado de program a programs
         modulars: [{
            amount: {
               detail: 'modulo 1 rrhh',
               receipt: 1001,
               date: '2018-03-31',
               amount: 150,
            },
            //debt: 150,
            assist: true,
            events: _mkt_event_seg,////////////////////duad???????
            //inscriptions: '',////////////////////dudaÇ??????
            modules: _mkt_modulo_1_rrhh,
            print_certificate: false,
         }],
         final_work: {
            stade: 2,  // entregado = 1, no entrego = 2
            observations: 'aun no entrego el proyecto',
         },
         requirements: {
            photograpy: false,
            photocopy_ci: false,
            photocopy_titule: false
         },
         total_price: 1200,
         payed: 1000, //cancelado
         debt: 200,  // deuda
         print_diploma: false
      }]
   },
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}; 
var _mkt_persons = [_mkt_person_1, _mkt_person_2, _mkt_person_3, _mkt_person_4];
////////////////////////////////////////////
var _mkt_event_seg = {
   name: 'seguridad imformatica y redes sociales',
   description: 'solo para ejecutivos',
   date_start: '2018-03-25',
        // interes:[{
        //     events: _person_1,
        //     record_date: new Date()
        // }],
   modulars: [{
      date_start: '2018-03-25',
      date_end: '2018-04-25',
      facilitators: _mkt_facilitator_1._id,
      modules: _mkt_modulo_1_seguridad._id,
      lists: [],
      _id: new mongoose.Types.ObjectId()
   }],
   inscriptions: [
      {
         total_price: 600,
         module_price: 150,
         bolivianos_price: 3,
         dolares_price: 300,
         canceled_price: 300,
         price_event: 2000,
         receipt: '4567',
         name: _mkt_person_1.name,
         ci: _mkt_person_1.ci,
         cellphone: _mkt_person_1.cellphone,
         persons: _mkt_person_1._id,
         users: _mkt_user_admin._id
      },
      {
         total_price: 600,
         module_price: 150,
         bolivianos_price: 0,
         dolares_price: 300,
         canceled_price: 300,
         price_event: 1400,
         receipt: '4568',
         name: _mkt_person_2.name,
         ci: _mkt_person_2.ci,
         cellphone: _mkt_person_2.cellphone,
         persons: _mkt_person_2._id,
         users: _mkt_user_ejecutivo1._id
      },
      {
         total_price: 600,
         module_price: 150,
         bolivianos_price: 300,
         dolares_price: 0,
         canceled_price: 300,
         price_event: 2000,
         receipt: '4569',
         name: _mkt_person_3.name,
         ci: _mkt_person_3.ci,
         cellphone: _mkt_person_3.cellphone,
         persons: _mkt_person_3._id,
         users: _mkt_user_admin._id
      }
   ],
   total: 30,
   programs: _mkt_program_seguridad._id,
   offices:_mkt_offices_stc,
   interes:[{}],
   date_end:'',
   active:true,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};

var _mkt_events = [_mkt_event_seg];

////////////////////////////////////////////////////////////////////////////////

var _mkt_list_1 = {
   amount: 300,
   receipt: 101,
   assist: true,
   type: 1, //nuevo // nivelacion
   persons: _mkt_person_1._id,
   events: _mkt_event_seg._id,
   modulars: _mkt_event_seg.modulars[0]._id,
   
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _mkt_list_2 = {
   amount: 300,
   receipt: 102,
   assist: true,
   type: 1, //nuevo // nivelacion
   person: _mkt_person_2._id,
   events: _mkt_event_seg._id,
   modulars: _mkt_event_seg.modulars[0]._id,
   
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}

var _mkt_lists = [_mkt_list_1, _mkt_list_2];
_mkt_event_seg.modulars[0].lists.push(_mkt_list_1);
_mkt_event_seg.modulars[0].lists.push(_mkt_list_2);
////////////////////////////////////////////////////////////////////////////////
var _mkt_listExtra1 = [{
  university:[{
    nombre: 'universidad mayor de san simon'
  }],
  carrera:[{
    nombre: 'ing sistemas'
  }]
}];
///////////////////////////////////////////////////////////////////////////////
function saveData(collection, schema) {
   for (var i = 0; i < collection.length; i++) {
      collection[i].record_date = new Date();
   }

   collection.forEach(function (data) { (new schema(data)).save(); });

   schema.find(function (err, data) {
      if (err) return console.error(err);
      console.log(data);
   });
}

function clearCollections(schema) {
   schema.collection.drop();
}


module.exports = {
  initializer: function () {
     saveData(_mkt_roles, db.mkt_roles);
     saveData(_mkt_users, db.mkt_users);
     saveData(_mkt_company, db.mkt_company);
     saveData(_mkt_correlatives, db.mkt_correlatives);
     saveData(_mkt_carteras, db.mkt_carteras);
     saveData(_mkt_programs, db.mkt_programs);
     saveData(_mkt_modulos, db.mkt_modules);
     saveData(_mkt_facilitators, db.mkt_facilitators);
     saveData(_mkt_offices, db.mkt_offices);
     saveData(_mkt_events, db.mkt_events);
     saveData(_mkt_persons, db.mkt_persons);
     saveData(_mkt_lists, db.mkt_lists);
    //  saveData(_mkt_cashFlowOffices,db.mkt_cashFlowOffices);
     saveData(_mkt_listExtra1, db.mkt_listExtra);

  },

  clearCollections: function () {
     clearCollections(db.mkt_roles);
     clearCollections(db.mkt_users);
     clearCollections(db.mkt_carteras);
     clearCollections(db.mkt_programs);
     clearCollections(db.mkt_events);
     clearCollections(db.mkt_persons);
     clearCollections(db.mkt_modules);
     clearCollections(db.mkt_company);
     clearCollections(db.mkt_facilitators);
     clearCollections(db.mkt_correlatives);
     clearCollections(db.mkt_lists);
    //  clearCollections(db.mkt_cashFlowOffices);
     clearCollections(db.mkt_listExtra);
  }
};