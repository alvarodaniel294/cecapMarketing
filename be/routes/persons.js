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
    .get('/personsOfCartera/:cartera', function (req, res) {
        var cartera = req.params.cartera;
        db.persons.find({ carteras: cartera }, function (err, listaPersonas) {
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
    .post('/personsOfProgramByUserId', function (req, res) {


        console.log(req.body);
        let userId = req.body.userId;
        let programId = req.body.programId;
        let interesState = req.body.state;
        let personasIntersadasPorPrograma = [];
        db.carteras.findOne({ user: userId }, function (err, cartera) {
            if (err) return res.status(400).send(err);
            db.persons.find({ carteras: cartera }, function (err, personas) {
                if (err) return res.status(400).send(err);
                for (let p of personas) {
                    let interes = p.interes;
                    for (let int of interes) {
                        if (int.programId == programId && int.state == interesState) {

                            personasIntersadasPorPrograma.push(p);
                        }
                    }
                }
                return res.status(200).send(personasIntersadasPorPrograma);

            })

        })

    })
    .post('/getInteres', function (req, res) {

        let personId = req.body.personId;
        let eventId = req.body.eventId;
        db.events.findOne({ _id: eventId }, function (err, event) {
            for (let i of event.interes) {
                if (i.persons == personId) {
                    return res.status(200).send(i);
                }
            }
        })



    })
    .post('/setInteres', function (req, res) {

        // console.log(req.body);
        let details = req.body.details;
        let state = req.body.state;
        let personId = req.body.personId;
        let eventId = req.body.eventId;
        let programId;
        db.events.update({ _id: eventId, 'interes.persons': personId }, {
            $set: {
                'interes.$.state': state,
                'interes.$.details': details,
            }
        }).exec(function (err, event) {
            // console.log(programId);
            db.events.findOne({ _id: eventId }, { programs: 1 }, function (err, event) {
                db.persons.update({
                    _id: personId,
                    'interes.programId': event.programs
                }, {
                        $set: {
                            'interes.$.state': state
                        }
                    }, function (err, person) {
                        if (err) return res.status(400).send(err);
                        return res.status(200).send();
                    })
            });
        })
    })

    .post('/upload', multipartMiddleware, function (req, res) {
        // var x = new Object(req.body.body);

        let respuestaVacia = {};
        try {
            var interes = [];
            var l = (req.body.body.split('interes')[1].split('programId')).length;
            for (let i = 1; i < l; i++) {
                // console.log((req.body.body.split('interes')[1].split('programId'))[i].split('"')[2])
                interes.push({
                    programId: (req.body.body.split('interes')[1].split('programId'))[i].split('"')[2],
                    state: 0
                })
            }
            let carteraId = (req.body.body.split(','))[0].split(':')[2];
            var workbook = XLSX.readFile(req.files.fileKey.path);
            var sheet_name_list = workbook.SheetNames;
            var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            let carteraIdMongoose = carteraId.substring(1, carteraId.length - 1);
            let newId = new mongoose.mongo.ObjectId(carteraIdMongoose);

            for (let contact of xlData) {
                let newPerson = new db.persons(req.body);
                newPerson.carteras = carteraId;
                newPerson.whatsapp_group = 'Importados del Celular';
                newPerson.city = '';
                newPerson.first_name = '';
                newPerson.last_name = '';
                newPerson.email = '';
                newPerson.ocupation = 'Particular';
                newPerson.descOcupation = {
                    carrera: '',
                    universidad: '',
                    semestre: '',
                    areaTrabajo: 'Otro',
                    profesion: '',
                    empresa: '',
                    cargao: ''
                };
                // console.log('todo bien')

                newPerson.carteras = newId;
                newPerson.interes = interes;
                console.log('/////////////////////////////////////////////////');

                // console.log(contact);
                // console.log(contact['Móvil']);
                // console.log(contact.Nombre);
                // console.log(contact.Apellidos);
                // console.log(contact.Mobile);
                // console.log(contact.first_name);



                if (contact['Móvil'] != undefined) {

                    if (contact['Móvil'].split(' ')[1] != null) {
                        newPerson.cellphone = contact['Móvil'].split(' ')[1];
                    } else {
                        newPerson.cellphone = contact['Móvil'];

                    }
                    if (contact.Nombre != undefined) {
                        newPerson.first_name = contact.Nombre;

                    } else { newPerson.last_name = ''; }
                    if (contact.Apellidos != undefined) {
                        newPerson.last_name = contact.Apellido;
                    } else { newPerson.last_name = ''; }
                    console.log('se guardo la posrsonaaaaaaaaaaaaaaaaaaaaaa')
                    savePerson();
                } else if (contact.Mobile != undefined) {
                    if (contact.Mobile.split(' ')[1] != null) {
                        newPerson.cellphone = contact.Mobile.split(' ')[1];
                    } else {
                        newPerson.cellphone = contact.Mobile;
                    }
                    if (contact.first_name != undefined) {
                        newPerson.first_name = contact.Firstname;
                    } else { newPerson.first_name = ''; }
                    if (contact.last_name != undefined) {
                        newPerson.last_name = contact.Lastname;
                    } else { newPerson.last_name = ''; }
                    savePerson();
                } else if (contact.mobile != undefined) {
                    if (contact.mobile.split(' ')[1] != null) {
                        newPerson.cellphone = contact.mobile.split(' ')[1];
                    } else {
                        newPerson.cellphone = contact.mobile;
                    }
                    if (contact.first_name != undefined) {
                        newPerson.first_name = contact.Firstname;
                    } else { newPerson.first_name = ''; }
                    if (contact.last_name != undefined) {
                        newPerson.last_name = contact.Lastname;
                    } else { newPerson.last_name = ''; }
                    savePerson();
                }
                function savePerson() {
                    db.persons.findOne({ cellphone: newPerson.cellphone }, function (err, person) {
                        if (person == null) {
                            newPerson.save(function (err, p) {
                                if (err) console.log(err);
                                console.log(p)
                            });
                            // console.log(newPerson);
                            // console.log('se guardarala persoana');
                        }
                        else console.log('el celular existe')
                    })
                }
            }
        } catch (error) {
            // console.log('todo bien')
            console.log('error al guardar numero', error)
            // return res.status(400).send(respuestaVacia);
        }
        finally {
            // console.log('todo bien',2)
            return res.status(200).send(respuestaVacia);
        }

    })





    .post('/addFromWhatsapp', function (req, res) {/////////////////////////////NO SE ESETA USANDO///////////////////
        var person = new db.persons(req.body);
        console.log(person);
        db.persons.findOne({ cellphone: person.cellphone }, function (err, existe) {

            if (err) {
                return res.status(400).send(err);

            } else {
                if (existe == null) {
                    console.log(existe);
                    person.save(function (err, persona) {
                        if (err) {
                            console.log(err);
                            return res.status(400).send(err);

                        } else {

                            let interesPersona = persona.interes;
                            for (let pi of interesPersona) {

                                db.events.find({ programs: pi.programId }, function (err, eventos) {
                                    if (err) return res.status(400).send(err);
                                    for (let e of eventos) {
                                        let int = {
                                            persons: persona,
                                            state: 0,
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

                } else {
                    if (err) return res.status(400).send(err);
                    console.log('el celular ya existe')

                }
            }
        })

    })

    .post('/BatchWhatsappNumbers', function (req, res) {
        // console.log(req.body);
        let listaNumeros = req.body.listaNumeros;
        let whatsapp_group = req.body.whatsapp_group;
        let cellphone = req.body.cellphone;
        let city = req.body.city;
        let interes = req.body.interes;
        let carteras = req.body.carteras;
        let universida =req.body.universidad;
        let carrer = req.body.carrera;
        var i = 0;
        for (let num of listaNumeros) {

            db.persons.findOne({ cellphone: num }, function (err, person) {
                if (person == null) {
                    let newPerson = new db.persons(req.body);
                    newPerson.descOcupation = {};
                    newPerson.first_name = whatsapp_group + ' ' + i;
                    newPerson.last_name = '';
                    newPerson.ci = '';
                    newPerson.carteras = carteras;
                    newPerson.phone = 0;
                    newPerson.cellphone = num;
                    newPerson.email = '';
                    newPerson.interes = interes;
                    newPerson.ocupation = 'estudiante';
                    newPerson.descOcupation = {
                        carrera: carrer,
                        universidad: universida,
                        semestre: '',
                        areaTrabajo: 'Otro',
                        profesion: '',
                        empresa: '',
                        cargao: ''
                    };
                    // console.log(newPerson);
                    // db.persons.findOne({ cellphone: newPerson.cellphone }, function (err, person) {

                    // if (person == null) {
                    newPerson.save(function (err, np) {
                        if (err) console.log(err);
                        for (let program of interes) {
                            // console.log(program);
                            db.events.find({ programs: program.programId }, function (err, eventos) {
                                for (let e of eventos) {
                                    let inte = {};
                                    inte.persons = np;
                                    inte.state = 0;
                                    e.interes.push(inte);
                                    e.save();
                                }
                            })
                        }

                    });
                    // }
                    // })

                }
                i++;
            })
        }
        return res.status(200).send(req.body);


    })


    .post('/filterUniversidadMedio',function(req,res){

        console.log(req.body);
        let listaUniversidades=req.body.listaUniChecked;
        let listaMedios=req.body.listaMedChecked;
        let identity=req.body.identity;
        let listaCarteras=[];
        let personasFiltradas=[];
        let personasFiltroSelectivo=[];
        

        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        db.users.findOne({_id:identity._id},function(err,user){
            if(err) return res.status(200).send(err)            
            db.users.find({offices:user.offices},{_id:1},function(err,users){
                // console.log(users);
                db.carteras.find({user:{$in :users}},{_id:1},function(err,carteraslist){
                        if(err) return res.status(200).send(err)
                        listaCarteras=carteraslist;   
                        db.persons.find({carteras:{$in:carteraslist}},function(err,personas){
                            // console.log(personas)
                            for(let p of personas){
                                for(let ItemUnivers of listaUniversidades){
                                    if(p.descOcupation.universidad==ItemUnivers.id){
                                        personasFiltradas.push(p);
                                        // console.log(p);
                                    }
                                }
                                for(let ItemMedio of listaMedios){
                                    console.log(ItemMedio.id ,p.contact_medium);

                                    if(p.contact_medium==ItemMedio.id){
                                        // console.log(p)
                                        if(personasFiltradas.includes(p)){
                                            personasFiltroSelectivo.push(p);
                                        }
                                        else{
                                            personasFiltradas.push(p)   
                                        }
                                    }
                                }
                            }
                            console.log(personasFiltradas);
                            console.log(listaMedios.length , listaUniversidades.length)
                            if((listaMedios.length>0) && (listaUniversidades.length>0)){
                                console.log("imprime filetro selectivo")
                                return res.status(200).send(personasFiltroSelectivo)
                            }else{
                                return res.status(200).send(personasFiltradas);
                            }
                        })                    
                })                
            })
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

    ////////////////////////////////////////////////////////////////////////////////

    .put('/tracing/:id', function (req, res) {
        db.persons.update({ _id: req.params.id},
          {
            $push: {
              'profile.tracing': req.body,
           }
        }).exec(function (err, off) {
            if (err) return res.status(400).send(err);
            console.log(off)                
            return res.status(200).send(off)
        });
    })
      
    ///////////////////////////////////////////////////////////////////////////////////

    .delete('/:id', function (req, res) {
        db.persons.remove({ _id: req.params.id }, function (err, person) {
            if (err) return res.status(400).send(err);

            return res.status(200).send(person);
        });
    });

module.exports = router;