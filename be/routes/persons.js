var express = require('express');
var mongoose = require('mongoose');

var db = require('../models/db');
var router = express.Router();

////////////////////////////////
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


///////////other//////////

var XLSX = require('xlsx')

///////////////////////////


router
   .get('/', function (req, res) {
      db.persons.find({}, function (err, persons) {
         if (err) return res.status(400).send(err);

         return res.status(200).send(persons);
      });
   })

   .get('/:id', function (req, res) {
      db.persons.findOne({ _id: req.params.id }, function (err, person) {
         if (err) return res.status(400).send(err);
         if (person == null) return res.status(404).send();

         return res.status(200).send(person);
      });
   })
   .get('/personsOfCartera/:cartera',function(req,res){
        var cartera=req.params.cartera;
        db.persons.find({carteras:cartera},function(err,listaPersonas){
            if (err) return res.status(400).send(err);
            
            return res.status(200).send(listaPersonas);


        })

    })
    // .get('/personsOfProgramByUserId/:userId',function(req,res){


    //     var ver=req.params.body.body;
    //     console.log(ver);
    //     // var userId=req.params.userId;
    //     // db.carteras.findOne({user:userId},function(err,cartera){
    //     //     if (err) return res.status(400).send(err);
    //     //     db.persons.find({carteras})


    //     // })
    // })
    .post('/personsOfProgramByUserId',function(req,res){


        console.log(req.body);
        let userId=req.body.userId;
        let programId=req.body.programId;
        let interesState=req.body.state;
        let personasIntersadasPorPrograma=[];
        db.carteras.findOne({user:userId},function(err,cartera){
            if (err) return res.status(400).send(err);
            db.persons.find({carteras:cartera},function(err,personas){
                if (err) return res.status(400).send(err);
                for(let p of personas){
                    let interes=p.interes;
                    for(let int of interes){
                        if(int.programId==programId && int.state==interesState){

                            personasIntersadasPorPrograma.push(p);
                        }
                    }
                }
                return res.status(200).send(personasIntersadasPorPrograma);

            })

        })

    })
    .post('/getInteres',function(req,res){

        let personId=req.body.personId;
        let eventId=req.body.eventId;
        


    })
    .post('/setInteres',function(req,res){

        console.log(req.body);
        let state=req.body.state;
        let personId=req.body.personId;
        let eventId=req.body.eventId;
        let programId;
        db.events.findOne({_id:eventId},function(err,event){
            if(err)return res.status(400).send(err);
             programId=event.programs;
            for(let inter of event.interes){
                if(inter.persons==personId){
                    console.log('entra a persona')
                    inter.state=state;
                    // console.log(event);
                }
            }
            // console.log(event.interes);
            event.save();

            db.persons.findOne({_id:personId},function(err,person){
                if(err)return res.status(400).send(err);
                
                for(let i of person.interes){
                    console.log(i.programId);
                    console.log(programId+"  de evente")
                    if(i.programId.equals(programId)){
                        console.log("wntra aqui")
                        console.log(i.state);
                        i.state=state;
                       
                    }

                }
                console.log(person.interes);
                person.save(function(err,person){

                    if(err)return res.status(400).send(err);
                    return res.status(200).send(person);
                })

            })
        })
    })

   .post('/upload', multipartMiddleware, function (req, res) {
            // console.log(req.body, req.files);
            // console.log(req.files.fileKey.path);
            console.log(typeof req.body);
            console.log(typeof req.body.body);
            console.log((req.body.body.split(',')[1]).split(':')[1]);
            let carteraId=(req.body.body.split(',')[1]).split(':')[1];
            
            console.log(req.files);
            var workbook = XLSX.readFile(req.files.fileKey.path);
            var sheet_name_list = workbook.SheetNames;
            var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

            let carteraIdMongoose=carteraId.substring(1,carteraId.length-1);
            console.log(carteraIdMongoose);
            let newId = new mongoose.mongo.ObjectId(carteraIdMongoose);
            
            for(let contact of xlData){
                let newPerson=new db.persons(req.body);
                newPerson.carteras=carteraId;
                if(contact.Mobile!=undefined){
                    newPerson.first_name=contact.Firstname;
                    if(contact.Lastname!=null){
                        newPerson.last_name=contact.Lastname;
                    }else{
                        newPerson.last_name='';
                    }
                    newPerson.ci=0;
                    newPerson.phone=0;
                    let numero='s'+contact.Mobile;
                    if(numero.length==9){
                        newPerson.cellphone=numero.substring(1,9);
                    }else{
                        newPerson.cellphone=numero.substring(6,numero.length);
                    }
                    newPerson.whatsapp_group='Importados del celular';
                    newPerson.city='';
                    newPerson.email='';
                    newPerson.ocupation='Particular';
                    newPerson.descOcupation={carrera:'',
                                            universidad:'',
                                            semestre:'',
                                            areaTrabajo:'Otro',
                                            profesion:'',
                                            empresa:'',
                                            cargao:''};

                    newPerson.carteras=newId;
                    newPerson.save(function(err,person){
                        if (err) return res.status(400).send(err);


                        return res.status(200).send();
                    })

                }        
           }
   })  
   
  


   .post('/addFromWhatsapp',function(req,res){
        var person=new db.persons(req.body);
        console.log(person);
        db.persons.findOne({cellphone:person.cellphone},function(err,existe){

            if(err){
                    return res.status(400).send(err);

            }else{
                    if(existe==null){
                        console.log(existe);
                        person.save(function(err,persona){
                                if (err){
                                    console.log(err);
                                    return res.status(400).send(err);
                    
                                }else{

                                    let interesPersona=persona.interes;
                                    for(let pi of interesPersona){

                                        db.events.find({programs:pi.programId},function(err,eventos){
                                            if(err)return res.status(400).send(err);
                                            for(let e of eventos){
                                                let int={
                                                    persons:persona,
                                                    state:0,
                                                     ////////////
                                                    //  0 interesados
                                                    //  1 en duda
                                                    //  2 confirmados
                                                    //  3 isncritos
                                                    //  4 enlinea
                                                    //  5 proximo evento 
                                                    //  6 sin interes
                                                    //////// 
                                                };
                                                e.interes.push(int);
                                                e.save();
                                            }    

                                        })
                                    }

                                    return res.status(200).send(persona);
                                    console.log(person);

                    
                                }                  
                        })

                    }else{
                        if (err) return res.status(400).send(err);
                        console.log('el celular ya existe')      

                    }
            }
        })
   
    })

   .post('/', function (req, res, next) {
      db.persons.findOne({ ci: req.body.persona.ci }, function (err, ciExist) {
         if (err) return res.status(400).send(err);
         if (ciExist == null) { req.body.found = false; validCell(); }
         else { req.body.found = true; req.body.persona = ciExist; next(); }
      })
      function validCell() {
         db.persons.findOne({ cellphone: req.body.persona.cellphone }, function (err, celExist) {
            if (err) return res.status(400).send(err);
            if (celExist == null) { req.body.found = false; next(); }
            else { req.body.found = true; req.body.persona = celExist; next(); }
         })
      }
   })
   .post('/', function (req, res) {
      if (req.body.found) return res.status(404).send('Persona Existente');
      var person = new db.persons(req.body.persona);
      person.save(function (err, person) {
         if (err) { return res.status(400).send(err); }
         return res.status(200).send(person);
         // addInscription(person, req.body.inscription, req.body.eventId);
      });
   })
   
   .get('/existCi/:id', function (req, res) {
      db.persons.findOne({ ci: req.params.id }, { first_name: 1, last_name: 1 }, function (err, user) {
         if (err) return console.log(err);
         if (user == null) return res.sendStatus(404);
         return res.status(200).send(user);
      });
   })
//    .post('/', function (req, res) {
//       var person = new db.persons(req.body.persona);
//       console.log(req.body);
//       db.persons.findOne({ ci: req.body.persona.ci, cellphone: req.body.persona.cellphone }, function (err, existeCellphone) {
//          if (existeCellphone == null) {
//             console.log('llegue aqui');
//             //if(person.first_name == '' || person.last_name == '' || person.ci == '' || person.carteras == '') 
//             //return res.status(400).send(); 
//             // save person
//             person.save(function (err, person) {
//                console.log('persona guardada');
//                if (err) { return res.status(400).send(err); }
//                addInscription(person, req.body.inscription, req.body.eventId);
//             });
//             function addInscription(person, inscri, idEvent) {
//                db.events.findOne({ _id: idEvent }, function (err, events) {
//                   console.log(events);
//                   db.modules.find({ programs: events.programs }).count().exec(function (err, moduls) {
//                      console.log(moduls);
//                      console.log('llegue al la cantidad de modulos');
//                      var modulPrice = inscri.price_event / moduls;///////DIVISION
//                      console.log(modulPrice);
//                      var inscription = {
//                         // segun al numero de asistencias sacar el precio total q tiene q pagar
//                         total_price: 0,//sumatorio por asistencia de cada modulo
//                         module_price: modulPrice,
//                         bolivianos_price: inscri.canceled_price,
//                         dolares_price: 0,
//                         canceled_price: inscri.canceled_price,
//                         price_event: inscri.price_event,
//                         receipt: inscri.receipt,
//                         name: person.name,
//                         ci: person.ci,
//                         cellphone: person.cellphone,
//                         persons: person._id,
//                         users: inscri.users
//                      };
//                      var d = new Date();
//                      //////////////////////
//                      // db.events.update({ _id: idEvent, 'inscriptions.person': req.body.person },
//                      //       {
//                      //             $set: { 'inscriptions.$.state': req.body.state, 'inscriptions.$.description': req.body.description }
//                      //       }).exec(function (err, off) {
//                      //             if (err) return res.status(400).send(err);
//                      //             //db.events.find({ _id: req.body.name, _id: { $in: req.body.person } }, function (err, event) {
//                      //             db.events.find({ _id: req.body.name }, function (err, event) {
//                      //                   if (err) return res.status(401).send(err);
//                      //             return res.status(201).send(event);
//                      //             });
//                      //             //	if (off.nModified == 0) return res.status(406).send();
//                      //       });
//                      db.events.update({ _id: idEvent },
//                         {
//                            $push: {
//                               inscriptions: inscription
//                            }
//                         }, {
//                            multi: true
//                         }, function (err, events) {
//                            if (err) return res.status(400).send(err);
//                            console.log(events);
//                            // if (events == null) return res.status(404).send();
//                            return res.status(200).send(person);
//                         });
//                   });//fin module
//                });//fin Event
//             }
//          } else {
//             if (err) return res.status(400).send(err);
//             console.log('La Persona ya existe');
//          }
//       });
//       //       }else{
//       //             if (err) return res.status(400).send(err);
//       //             console.log('El numero de CI de la Persona ya existe')
//       //       }
//       //    });      
//    })

   .put('/:id', function (req, res) {
      console.log("exito");
      console.log(req.params.id);
      db.persons.findOne({ _id: req.params.id }, function (err, person) {
         if (err) return res.status(400).send(err);
         if (person == null) return res.status(404).send();

         for (i in req.body) {
            person[i] = req.body[i];
         }
         person.save(function (err, person) {
            if (err) return res.status(400).send(err);

            return res.status(200).send(person);
         });
      });
   })
   .put('/ocupation/:id', function (req, res) {
      console.log(req.body);
      db.persons.update({ _id: req.params.id },
         {
            $set: {//Universitario
               'descOcupation.carrera': req.body.carrera,
               'descOcupation.universidad': req.body.universidad,
               'descOcupation.semestre': req.body.semestre,
               //Particular
               'descOcupation.areaTrabajo': req.body.areaTrabajo,
               //Profesional
               'descOcupation.profesion': req.body.profesion,
               'descOcupation.empresa': req.body.empresa,
               'descOcupation.cargo': req.body.cargo,
            }
         }).exec(function (err, off) {
            if (err) return res.status(400).send(err);
         })
      // db.events.update({ _id: req.body.name, 'inscriptions.person': req.body.person },
      //    {
      //       $set: { 'inscriptions.$.state': req.body.state, 'inscriptions.$.description': req.body.description }
      //    }).exec(function (err, off) {
      //       if (err) return res.status(400).send(err);
      //       db.events.find({ _id: req.body.name, _id: { $in: req.body.person } }, function (err, event) {
      //          if (err) return res.status(401).send(err);
      //          return res.status(201).send(event);
      //       });
      //       //	if (off.nModified == 0) return res.status(406).send();
      //    });
   })

   .delete('/:id', function (req, res) {
      db.persons.remove({ _id: req.params.id }, function (err, person) {
         if (err) return res.status(400).send(err);

         return res.status(200).send(person);
      });
   });

module.exports = router;