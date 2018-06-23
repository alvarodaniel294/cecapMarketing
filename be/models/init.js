var mongoose = require('mongoose');
var db = require('./db');

///////////////////////////////////////

var _offices_stc = {
   name: 'cecap Santa Cruz',
   //nit:'7012323123424',
   ubicacion: 'Beni',
   caja: 1000,
   departament: 'Sta. Cruz',
   company_id: _company,
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _offices = [_offices_stc];
//////////////////////////////////////////////////////////

var _company0 = {
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
var _company = [_company0];
///////////////////////////////////////////////////////////

//Accounts
var _rol_admin = {
   name: 'Admin',

   _id: new mongoose.Types.ObjectId
};
var _rol_ejecutivo = {
   name: 'Ejecutivo',

   _id: new mongoose.Types.ObjectId
};
var _rol_gerente = {
   name: 'Gerente',
   _id: new mongoose.Types.ObjectId
}
var _roles = [_rol_admin, _rol_ejecutivo, _rol_gerente];

/////////////////////////////////////////////////////////
var _user_admin = {
   name: 'a',
   active: true,
   password_hash: 'a',
   token: 'ASD@!C$$#Q@34234C$#CR$#C344354',
   rol: _rol_admin._id,
   offices: _offices_stc,
   amount: 1000,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _user_ejecutivo1 = {
   name: 'e',
   salary: 123,
   active: true,
   password_hash: 'e',
   token: 'ASDWQ#$VHTHEE^EVW324213123c21#2',
   rol: _rol_ejecutivo._id,
   offices: _offices_stc,
   amount: 2000,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _user_ejecutivo2 = {
   name: 'i',
   salary: 123,
   active: true,
   password_hash: 'i',
   token: 'ASDWQ#$VHTHEE^EVW324213123c21#2',
   rol: _rol_ejecutivo._id,
   offices: _offices_stc,
   amount: 1500,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _users = [_user_admin, _user_ejecutivo1, _user_ejecutivo2];

//////////////////////////////////////////////////////////////////////////
var _facilitator_1 = {
   name: 'Paola Quintanilla',
   job: 'rrhh',
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _facilitator_2 = {
   name: 'Alvaro Garcia',
   job: 'Seguridad',
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _facilitators = [_facilitator_1, _facilitator_2];
/////////////////CashFlowUser//////////////////////////
var _cashFlowUser1 = {
   date_start: '2018-03-25',
   date_end: '2018-04-25',
   amount: 1000,
   amount_delivered: 1000,
      details: [{
         receipt: 1,
         description: 'ingresos por inscripcion',
         amount: 1000,
         input:true,
         date_detail:'2018-03-25',
         events:_event_seg
      }],
      active:false,
      state:-1,
      user: _user_ejecutivo1,
      _id: new mongoose.Types.ObjectId,
    record_date: new Date()
};
var _cashFlowUser2 = {
    date_start: '2018-05-25',
      date_end: '',
      amount: 500,
      amount_delivered: 0,
      details: [{
         receipt: 1,
         description: 'ingresos por inscripcion',
         amount: 200,
         input:true,
         date_detail:'2018-05-25',
         title:'inscripcion',
         events:_event_seg
      },
      {
        receipt: 2,
        description: 'ingresos por inscripcion',
        amount: 300,
        input:true,
        date_detail:'2018-05-25',
        title:'inscripcion'
     }
    ],
      active:true,
      state:-1,
      user: _user_ejecutivo2,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _cashFlowUserAdmin = {
  date_start: '2018-03-25',
  date_end: '',
  amount: 1000,
  amount_delivered: 0,
     details: [{
        receipt: 1,
        description: 'ingresos por inscripcion',
        amount: 1000,
        input:true,
        date_detail:'2018-03-25',
        events:_event_seg
     }],
     active:true,
     state:-1,
     user: _user_admin,
     _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _cashFlowUser = [_cashFlowUser1, _cashFlowUser2,_cashFlowUserAdmin];

///////////////////////////////////////////

var _cashFlowOffices_stc={

  date_start: '2018-03-10',
  date_end: '',
  amount: 0,
  amount_delivered: 0,
  input:0,
  output:0,
  details:[{
            cashFlowUsers:_cashFlowUser1,
            dateCloseCash:'2018-04-25',

           },
  ],
  offices: _offices_stc,
  users:_user_admin,
  active:true,
  state:-1,
  

  _id: new mongoose.Types.ObjectId,
  record_date: new Date()
};

var _cashFlowOffices=[_cashFlowOffices_stc];
/////////////////////////////////////////////////////////

var _correlative1 = {
   year: '2018-03-04',
   company_id: _company._id, //ObjectId
   receipts: [{
      receipt: 010,   //numero recivo
      amount: 1000,      //catidad
      description: 'factura de inscripcion'
   }],
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _correlative2 = {
   year: '2018-04-01',
   company_id: _company._id, //ObjectId
   receipts: [{
      receipt: 011,   //numero recivo
      amount: 1000,      //catidad
      description: 'factura de inscripcion'
   }],
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};
var _correlatives = [_correlative1, _correlative2];
////////////////////////CARTERA USER//////////////////////
var _cartera_user_1 = {
   name: 'cartera1',
   user: _user_admin,
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _cartera_user_2 = {
   name: 'cartera2',
   user: _user_ejecutivo1,
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _cartera_user_3 = {
   name: 'cartera3',
   user: _user_ejecutivo2,
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _carteras = [_cartera_user_1, _cartera_user_2, _cartera_user_3];
//////////////////////////////////////////////////////
var _program_seguridad = {
   name: 'seguridad industrial',
   details: 'para industrias.',
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _program_rrhh = {
   name: 'recursos humanos',
   details: 'para empresas.',
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _programs = [_program_seguridad, _program_rrhh];
////////////////////////////////////////////
var _modulo_1_seguridad = {
   number: 1,
   name: 'modulo 1',
   content: [
      '1. reclutamiento y seleccion',
      '2. induccion',
      '3. capacitacion'
   ],
   programs: _program_seguridad,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _modulo_2_seguridad = {
   number: 2,
   name: 'modulo 2',
   content: [
      '1. remuneracion',
      '2. motivacion',
      '3. clima laboral'
   ],
   programs: _program_seguridad,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}

var _modulo_1_rrhh = {
   number: 1,
   name: 'modulo 1',
   content: [
      '1. remuneracion1',
      '2. motivacion2',
      '3. clima laboral3'
   ],
   programs: _program_rrhh,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _modulo_2_rrhh = {
   number: 2,
   name: 'modulo 2',
   content: [
      '1. remuneracion1',
      '2. motivacion2',
      '3. clima laboral3'
   ],
   programs: _program_rrhh,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _modulo_3_rrhh = {
   number: 3,
   name: 'modulo 3',
   content: [
      '1. remuneracion1',
      '2. motivacion2',
      '3. clima laboral3'
   ],
   programs: _program_rrhh,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _modulo_4_rrhh = {
   number: 4,
   name: 'modulo 4',
   content: [
      '1. remuneracion1',
      '2. motivacion2',
      '3. clima laboral3'
   ],
   programs: _program_rrhh,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _modulo_5_rrhh = {
   number: 5,
   name: 'modulo 5',
   content: [
      '1. remuneracion1',
      '2. motivacion2',
      '3. clima laboral3'
   ],
   programs: _program_rrhh,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _modulo_6_rrhh = {
   number: 6,
   name: 'modulo 6',
   content: [
      '1. remuneracion1',
      '2. motivacion2',
      '3. clima laboral3'
   ],
   programs: _program_rrhh,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _modulo_7_rrhh = {
   number: 7,
   name: 'modulo 7',
   content: [
      '1. remuneracion1',
      '2. motivacion2',
      '3. clima laboral3'
   ],
   programs: _program_rrhh,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _modulo_8_rrhh = {
   number: 8,
   name: 'modulo 8',
   content: [
      '1. remuneracion1',
      '2. motivacion2',
      '3. clima laboral3'
   ],
   programs: _program_rrhh,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _modulos = [_modulo_1_seguridad, _modulo_2_seguridad, _modulo_1_rrhh, _modulo_2_rrhh, _modulo_3_rrhh, _modulo_4_rrhh, _modulo_5_rrhh, _modulo_6_rrhh, _modulo_7_rrhh, _modulo_8_rrhh];

/////////////////////////////////////////////////////////7
var _person_1 = {
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
   carteras: _cartera_user_2,
   /////////////
   profile: [{
         programs: _program_rrhh,
         modulars: [{
            amount: {
               detail: 'String',
               receipt: 1001,
               date: '2018-03-31',
               amount: 150,
            },
            //debt: 150,
            assist: true,
            events: _event_seg,////////////////////duda???????
            //inscriptions: '',////////////////////duda??????
            modules: _modulo_1_rrhh,
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
var _person_2 = {
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
   carteras: _cartera_user_2,
   /////////////
   profile: {
      programs: [{
         program: _program_rrhh,
         modulars: [{
            amount: {
               detail: 'modulo 1 rrhh',
               receipt: 1001,
               date: '2018-03-31',
               amount: 150,
            },
            //debt: 150,
            assist: true,
            events: _event_seg,////////////////////duda???????
            //inscriptions: '',////////////////////duda??????
            modules: _modulo_1_rrhh,
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
var _person_3 = {
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
   carteras: _cartera_user_2,
   /////////////
   profile: {
      programs: [{
         programs: _program_rrhh,
         modulars: [{
            amount: {
               detail: 'modulo 1 rrhh',
               receipt: 1001,
               date: '2018-03-31',
               amount: 150,
            },
            //debt: 150,
            assist: true,
            events: _event_seg,////////////////////duad???????
            //inscriptions: '',////////////////////dudaÇ??????
            modules: _modulo_1_rrhh,
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
var _person_4 = {
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
   carteras: _cartera_user_2,
   /////////////
   profile: {
      programs: [{
         programs: _program_rrhh,//modificado de program a programs
         modulars: [{
            amount: {
               detail: 'modulo 1 rrhh',
               receipt: 1001,
               date: '2018-03-31',
               amount: 150,
            },
            //debt: 150,
            assist: true,
            events: _event_seg,////////////////////duad???????
            //inscriptions: '',////////////////////dudaÇ??????
            modules: _modulo_1_rrhh,
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
var _persons = [_person_1, _person_2, _person_3, _person_4];
////////////////////////////////////////////
var _event_seg = {
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
      facilitators: _facilitator_1._id,
      modules: _modulo_1_seguridad._id,
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
         name: _person_1.name,
         ci: _person_1.ci,
         cellphone: _person_1.cellphone,
         persons: _person_1._id,
         users: _user_admin._id
      },
      {
         total_price: 600,
         module_price: 150,
         bolivianos_price: 0,
         dolares_price: 300,
         canceled_price: 300,
         price_event: 1400,
         receipt: '4568',
         name: _person_2.name,
         ci: _person_2.ci,
         cellphone: _person_2.cellphone,
         persons: _person_2._id,
         users: _user_ejecutivo1._id
      },
      {
         total_price: 600,
         module_price: 150,
         bolivianos_price: 300,
         dolares_price: 0,
         canceled_price: 300,
         price_event: 2000,
         receipt: '4569',
         name: _person_3.name,
         ci: _person_3.ci,
         cellphone: _person_3.cellphone,
         persons: _person_3._id,
         users: _user_admin._id
      }
   ],
   total: 30,
   programs: _program_seguridad._id,

   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
};

var _events = [_event_seg];

////////////////////////////////////////////////////////////////////////////////

var _list_1 = {
   amount: 300,
   receipt: 101,
   assist: true,
   type: 1, //nuevo // nivelacion
   persons: _person_1._id,
   events: _event_seg._id,
   modulars: _event_seg.modulars[0]._id,
   
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}
var _list_2 = {
   amount: 300,
   receipt: 102,
   assist: true,
   type: 1, //nuevo // nivelacion
   person: _person_2._id,
   events: _event_seg._id,
   modulars: _event_seg.modulars[0]._id,
   
   _id: new mongoose.Types.ObjectId,
   record_date: new Date()
}

var _lists = [_list_1, _list_2];
_event_seg.modulars[0].lists.push(_list_1);
_event_seg.modulars[0].lists.push(_list_2);
////////////////////////////////////////////////////////////////////////////////
var _listExtra1 = [{
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
     saveData(_roles, db.roles);
     saveData(_users, db.users);
     saveData(_company, db.company);
     saveData(_correlatives, db.correlatives);
     saveData(_carteras, db.carteras);
     saveData(_programs, db.programs);
     saveData(_modulos, db.modules);
     saveData(_facilitators, db.facilitators);
     saveData(_cashFlowUser, db.cashFlowUsers);
     saveData(_offices, db.offices);
     saveData(_events, db.events);
     saveData(_persons, db.persons);
     saveData(_lists, db.lists);
     saveData(_cashFlowOffices,db.cashFlowOffices);
     saveData(_listExtra1, db.listExtra);

  },

  clearCollections: function () {
     clearCollections(db.roles);
     clearCollections(db.users);
     clearCollections(db.carteras);
     clearCollections(db.programs);
     clearCollections(db.events);
     clearCollections(db.persons);
     clearCollections(db.modules);
     clearCollections(db.offices);
     clearCollections(db.cashFlowUsers);
     clearCollections(db.company);
     clearCollections(db.facilitators);
     clearCollections(db.correlatives);
     clearCollections(db.lists);
     clearCollections(db.cashFlowOffices);
     clearCollections(db.listExtra);
  }
};