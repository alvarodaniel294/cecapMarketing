var express = require('express');
var db = require('../models/db');
var router = express.Router();
var mongoose = require('mongoose');

router
      .get('/', function (req, res) {
            var d = new Date();
            db.events.find({ date_start: { $gt: d } }, { name: 1, description: 1, date_start: 1, modulars: 1, inscriptions: 1, total: 1, programs: 1 }, function (err, events) {
                  if (err) return res.status(400).send(err);
                  // let programs = [];
                  //let modulos = [];
                  //    var j = 0;
                  //    let insert = true;
                  //    var today = new Date;
                  //    for (let i = 0; i < events.length; i++) {
                  //       j = 0;
                  //       insert = true;

                  //       do {
                  //          if (programs.length == 0) { insert = false; programs.push(events[i].program); }
                  //          else if (JSON.stringify(programs[j]) == JSON.stringify(events[i].program)) insert = false;
                  //          if (today > events[i].date_start) { insert = false; }
                  //          j++;
                  //       } while (j < programs.length);
                  //       if (insert) programs.push(events[i].program);
                  //    }
                  //    getPrograms(programs, events);
                  return res.status(200).send(events);
            });
            // function getPrograms(programs, events) {
            //    db.programs.find({ _id: { $in: programs } }, { name: 1 }, function (err, programs) {
            //       if (err) return res.status(400).send(err);
            //       console.log(programs)
            //       events.forEach(event => {
            //          programs.forEach(program => {
            //             if (JSON.stringify(event.program) == JSON.stringify(program._id)) {
            //                event.name = program.name;
            //             }
            //          });
            //       });
            //       return res.status(200).send(events);
            //    });
            // }
            // db.events.find({},function(err,events){
            //    return res.status(200).send(events);
            // });
      })
      .post('/getPersonasInteresWithEvent', function (req, res) {
            let event = req.body;
            console.log(event);
            let lista = [];
            let nuevaLista = [];

            for (let p of event.interes) {
                  lista.push(p.persons);

            }
            db.persons.find({ _id: { $in: lista } }, function (err, persons) {
                  for (let personItem of persons) {
                        let newPerson = {};
                        newPerson._id = personItem._id;
                        newPerson.first_name = personItem.first_name;
                        newPerson.last_name = personItem.last_name;
                        newPerson.cellphone = personItem.cellphone;
                        newPerson.city = personItem.city;

                        for (let pid of event.interes) {
                              if (pid.persons == personItem._id) {
                                    newPerson.state = pid.state;
                                    if (newPerson.state == 0) newPerson.stateName = 'Interesado';
                                    if (newPerson.state == 1) newPerson.stateName = 'En Duda';
                                    if (newPerson.state == 2) newPerson.stateName = 'Confirmado';
                                    if (newPerson.state == 3) newPerson.stateName = 'Inscrito';
                                    if (newPerson.state == 5) newPerson.stateName = 'En Linea';
                                    // if (_id.state == 2) newPerson.stateName = 'Confirmado';
                                    if (newPerson.state == 5) newPerson.stateName = 'Proximo Evento';
                                    if (newPerson.state == 6) newPerson.stateName = 'Sin Interes';
                                    // event.interes.pop(pid);
                                    nuevaLista.push(newPerson);
                              }
                        }
                  }
                  console.log(nuevaLista);
                  return res.status(200).send(nuevaLista);
            })
      })
      .post('/getPersonFilterInteresWithEvent', function (req, res) {
            let event = req.body.event;
            let interesnumber = req.body.interes;
            console.log(event);
            let lista = [];
            let nuevaLista = [];

            for (let p of event.interes) {
                  lista.push(p.persons);

            }
            db.persons.find({ _id: { $in: lista } }, function (err, persons) {
                  for (let personItem of persons) {
                        let newPerson = {};
                        newPerson._id = personItem._id;
                        newPerson.first_name = personItem.first_name;
                        newPerson.last_name = personItem.last_name;
                        newPerson.cellphone = personItem.cellphone;
                        newPerson.city = personItem.city;

                        for (let pid of event.interes) {
                              if (pid.persons == personItem._id) {
                                    newPerson.state = pid.state;
                                    if (newPerson.state == 0) newPerson.stateName = 'Interesado';
                                    if (newPerson.state == 1) newPerson.stateName = 'En Duda';
                                    if (newPerson.state == 2) newPerson.stateName = 'Confirmado';
                                    if (newPerson.state == 3) newPerson.stateName = 'Inscrito';
                                    if (newPerson.state == 5) newPerson.stateName = 'En Linea';
                                    // if (_id.state == 2) newPerson.stateName = 'Confirmado';
                                    if (newPerson.state == 5) newPerson.stateName = 'Proximo Evento';
                                    if (newPerson.state == 6) newPerson.stateName = 'Sin Interes';
                                    if (newPerson.state == interesnumber) {
                                          nuevaLista.push(newPerson);

                                    }
                              }
                        }
                  }
                  console.log(nuevaLista);
                  return res.status(200).send(nuevaLista);
            })



      })
      .post('/getPersonFilterInteresWithEventByCartera', function (req, res) {
            let event = req.body.event;
            let interesnumber = req.body.interes;
            // console.log(event);
            let lista = [];
            let nuevaLista = [];

            db.carteras.findOne({ user: req.body.identity._id }, function (err, cartera) {

                  for (let p of event.interes) {
                        lista.push(p.persons);

                  }
                  db.persons.find({ _id: { $in: lista }, carteras: cartera }, function (err, persons) {
                        for (let personItem of persons) {
                              let newPerson = {};
                              newPerson._id = personItem._id;
                              newPerson.first_name = personItem.first_name;
                              newPerson.last_name = personItem.last_name;
                              newPerson.cellphone = personItem.cellphone;
                              newPerson.city = personItem.city;

                              for (let pid of event.interes) {
                                    if (pid.persons == personItem._id) {
                                          newPerson.state = pid.state;
                                          if (newPerson.state == 0) newPerson.stateName = 'Interesado';
                                          if (newPerson.state == 1) newPerson.stateName = 'En Duda';
                                          if (newPerson.state == 2) newPerson.stateName = 'Confirmado';
                                          if (newPerson.state == 3) newPerson.stateName = 'Inscrito';
                                          if (newPerson.state == 5) newPerson.stateName = 'En Linea';
                                          // if (_id.state == 2) newPerson.stateName = 'Confirmado';
                                          if (newPerson.state == 5) newPerson.stateName = 'Proximo Evento';
                                          if (newPerson.state == 6) newPerson.stateName = 'Sin Interes';
                                          if (newPerson.state == interesnumber) {
                                                nuevaLista.push(newPerson);

                                          }
                                    }
                              }
                        }
                        // console.log(nuevaLista);
                        return res.status(200).send(nuevaLista);
                  })

            })




      })


      .post('/getPersonasInteresWithEventByCartera', function (req, res) {

            // console.log(req.body)
            let event = req.body.event;
            // console.log(req.body.identity)
            // console.log(event);
            let lista = [];
            let nuevaLista = [];
            db.carteras.findOne({ user: req.body.identity._id }, function (err, cartera) {
                  // console.log(cartera)
                  for (let p of event.interes) {
                        lista.push(p.persons);
                  }
                  db.persons.find({ _id: { $in: lista }, carteras: cartera }, function (err, persons) {
                        // console.log(persons)
                        for (let personItem of persons) {
                              let newPerson = {};
                              newPerson._id = personItem._id;
                              newPerson.first_name = personItem.first_name;
                              newPerson.last_name = personItem.last_name;
                              newPerson.cellphone = personItem.cellphone;
                              newPerson.city = personItem.city;
                              for (let pid of event.interes) {
                                    if (pid.persons == personItem._id) {
                                          newPerson.state = pid.state;
                                          if (newPerson.state == 0) newPerson.stateName = 'Interesado';
                                          if (newPerson.state == 1) newPerson.stateName = 'En Duda';
                                          if (newPerson.state == 2) newPerson.stateName = 'Confirmado';
                                          if (newPerson.state == 3) newPerson.stateName = 'Inscrito';
                                          if (newPerson.state == 5) newPerson.stateName = 'En Linea';
                                          // if (_id.state == 2) newPerson.stateName = 'Confirmado';
                                          if (newPerson.state == 5) newPerson.stateName = 'Proximo Evento';
                                          if (newPerson.state == 6) newPerson.stateName = 'Sin Interes';
                                          // event.interes.pop(pid);
                                          nuevaLista.push(newPerson);
                                    }
                              }
                        }
                        return res.status(200).send(nuevaLista);
                  })
            })
      })

      .get('/all', function (req, res) {

            db.events.find({}, function (err, events) {
                  if (err) return res.status(400).send(err);
                  return res.status(200).send(events);


            })
      })
      .get('/lists', function (req, res) {
            db.lists.find({}, function (err, lists) {
                  return res.status(200).send(lists);
            })
      })

      .post('/addInteresToEvents', function (req, res) {
            console.log(req.body);
            let personId = req.body.personId;
            let programId = req.body.programId;

            db.events.find({ programs: programId }, function (err, events) {
                  if (err) return res.status(400).send(err);
                  for (let event of events) {
                        db.events.findOne({ _id: event._id }, function (err, ev) {
                              if (err) return res.status(400).send(err);
                              // console.log('11111111111111111111')
                              console.log(ev.interes);
                              if (ev.interes.length == 0) {
                                    let inter = {}
                                    inter.persons = personId;
                                    inter.state = 0;
                                    ev.interes.push(inter);
                                    // console.log('entra estando vacio')

                              } else {
                                    let existe = false;
                                    for (let iItem of ev.interes) {
                                          console.log(iItem);
                                          if (iItem.persons == personId) {
                                                //      console.log('entra cuando asdfasdfasdflkasdlfjal')
                                                existe = true;
                                          }
                                    }
                                    if (existe == false) {
                                          let inter = {}
                                          inter.persons = personId;
                                          inter.state = 0;
                                          ev.interes.push(inter);

                                          // console.log('yeah')

                                    }
                              }

                              //  console.log("asdfasdfasdfasd")
                              console.log(ev.interes);
                              ev.save(function (err, ev) {
                                    if (err) return res.status(400).send(err);

                              });

                        })

                  }
                  return res.status(200).send(events);



            })





      })


      .get('/trimestral', function (req, res) {
            var d = new Date();
            var d1 = new Date(d.getFullYear(), d.getMonth() - 3, d.getDate()); //menos 3 meses
            console.log(d1);
            db.events.aggregate([
                  { $match: { date_start: { $gt: d1, $lt: d } } },
                  { $project: { program: 1, inscriptions: 1 } },
                  { $unwind: '$inscriptions' },
                  { $match: { 'inscriptions.state': { $eq: 1 } } },
                  // { $group: { _id: { event: '$_id', user: '$inscriptions.user' }, total: { $sum: 1 }, program: { $last: "$program" } } },
                  { $group: { _id: { event: '$_id', user: '$inscriptions.user', program: '$program' }, total: { $sum: 1 } } },
                  { $project: { _id: { program: '$_id.program', event: '$_id.event' }, user: { _id: '$_id.user', total: '$total' } } },
                  { $group: { _id: { program: '$_id.program', event: '$_id.event' }, users: { $push: { _id: '$user._id', total: '$user.total' } } } }
            ], function (err, events) {
                  if (err) return res.status(400).send(err);
                  let programs = [];
                  var j = 0;
                  let insert = true;
                  for (let i = 0; i < events.length; i++) {
                        j = 0;
                        insert = true;
                        do {
                              if (programs.length == 0) { insert = false; programs.push(events[i]._id.program); }
                              else if (JSON.stringify(programs[j]) == JSON.stringify(events[i]._id.program)) insert = false;
                              j++;
                        } while (j < programs.length);
                        if (insert) programs.push(events[i]._id.program);
                  }
                  getPrograms(programs, events);
            });
            function getPrograms(programs, events) {
                  // console.log(programs, events);
                  db.programs.find({ _id: { $in: programs } }, { name: 1 }, function (err, programs) {
                        if (err) return res.status(400).send(err);
                        events.forEach(event => {
                              programs.forEach(program => {
                                    if (JSON.stringify(event.program) == JSON.stringify(program._id)) {
                                          event.programName = program.name;
                                    }
                              })
                        });
                        getUsers(events);
                        // return res.status(200).send(events);
                  });
            }
            function getUsers(events) {
                  console.log(events);
                  var ids = events.map(e => e.users.map(u => u._id));
                  var i = []
                  ids.forEach(id => {
                        id.forEach(ia => i.push(ia))
                  })
                  db.users.find({ _id: { $in: i } }, { name: 1 }, function (err, users) {
                        if (err) return res.status(400).send(err);
                        events.forEach(event => {
                              event.users.forEach(eu => {
                                    users.forEach(users => {
                                          if (JSON.stringify(eu._id) == JSON.stringify(users._id)) {
                                                eu.name = users.name;
                                          }
                                    })
                              })
                        });
                        return res.status(200).send(events);
                  })
            }
      })
      .get('/mejorEjecutivo/:id', function (req, res) {
            db.events.aggregate([
                  { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
                  { $unwind: '$inscriptions' },
                  { $match: { 'inscriptions.state': { $eq: 1 } } },
                  // { $project: { 'total': { '$size': '$inscriptions'}} }
                  { $group: { _id: '$inscriptions.user', total: { $sum: 1 } } }
            ], function (err, events) {
                  if (err) return res.status(400).send(err);
                  // Persons(persons);
                  getUsers(events);
            });
            function getUsers(events) {
                  let ids = events.map(e => e._id);
                  db.users.find({ _id: { $in: ids } }, { name: 1 }, function (err, users) {
                        if (err) return res.status(400).send(err);
                        events.forEach(event => {
                              users.forEach(users => {
                                    if (JSON.stringify(event._id) == JSON.stringify(users._id)) {
                                          event.name = users.name;
                                    }
                              })
                        });
                        return res.status(200).send(events);
                  })
            }
      })
      //////////get personas por evento
      .get('/inscriptions/:id', function (req, res) {
            db.events.findOne({ _id: req.params.id }, function (err, event) {
                  if (err) return res.status(400).send(err);
                  if (event == null) return res.status(404).send();
                  // return res.status(200).send(event);
                  // getProgram(event);
                  var persons = event.inscriptions.map(i => i.persons);
                  getPerson(persons, event);
            });
            // function getProgram(event){
            //    db.programs.findOne({ _id: event.programs }, { name: 1 }, function (err, program) {
            //       if (err) return res.status(400).send(err);
            //       event.name = program.name;
            //       // return res.status(200).send(event);
            //       var persons = event.inscriptions.map(i => i.person);
            //       getPerson(persons, event);
            //    });
            // }
            function getPerson(persons, event) {
                  db.persons.find({ _id: { $in: persons } }, function (err, persons) {
                        if (err) return res.status(400).send(err);
                        // console.log(persons)
                        event.inscriptions.forEach(i => {
                              persons.forEach(person => {
                                    if (JSON.stringify(i.persons) == JSON.stringify(person._id)) {
                                          i.name = person.first_name + ' ' + person.last_name;
                                          i.phone = person.phone;
                                          i.cellphone = person.cellphone;
                                    }
                              });
                        });
                        //console.log(event);
                        return res.status(200).send(event);
                  });
            }
      })
      ///////////////////////////////////
      .get('/:id', function (req, res) {
            db.events.findOne({ _id: req.params.id }, function (err, event) {
                  if (err) return res.status(400).send(err);
                  if (event == null) return res.status(404).send();
                  // return res.status(200).send(event);
                  getProgram(event);
            });
            function getProgram(event) {
                  db.programs.findOne({ _id: event.programs }, { name: 1 }, function (err, program) {
                        if (err) return res.status(400).send(err);
                        console.log(program)
                        event.name = program.name;
                        // return res.status(200).send(event);
                        var persons = event.inscriptions.map(i => i.person);
                        getPerson(persons, event);
                  });
            }
            function getPerson(persons, event) {
                  db.persons.find({ _id: { $in: persons } }, function (err, persons) {
                        if (err) return res.status(400).send(err);
                        // console.log(persons)
                        event.inscriptions.forEach(i => {
                              persons.forEach(person => {
                                    if (JSON.stringify(i.person) == JSON.stringify(person._id)) {
                                          i.persons = person.first_name + ' ' + person.last_name;
                                    }
                              });
                        });
                        // console.log(event);
                        return res.status(200).send(event);
                  });
            }

      })
      .get('/listPersons/:id', function (req, res) {
            db.events.findOne({ _id: req.params.id }, { inscriptions: 1 }, function (err, event) {
                  if (err) return res.status(400).send(err);
                  if (event == null) return res.status(404).send();
                  if (event.inscriptions.length > 0) return res.status(404).send();
                  var persons = event.inscriptions.map((p) => p.person)
                  Persons(persons);
                  // return res.status(200).send(event);
            })
            function Persons(p) {
                  db.persons.find({ _id: { $in: p } }, function (err, persons) {
                        if (err) return res.status(400).send(err);

                        return res.status(200).send(persons);
                  })
            }

      })
      ///inscripcion de personas antes y en el evento
      .post('/inscriptPerson/:id', function (req, res) {
            ///GUARDAR EN LISTS PRIMERO
            db.persons.findOne({ ci: req.body.persona.ci }, function (err, person) {
                  if (person == null) {
                        console.log('consulta de persona');
                        db.events.findOne({ _id: rer.body.eventId }, { date_start: 1 }, function (err, date) {
                              if (err) { return res.status(400).send(err); }
                              var asistencia = false;
                              if (date == new Date()) { asistencia = true; }
                              //Generando lista
                              var list = {
                                    bolivianos: req.body.inscription.canceled_price,
                                    dolares: req.body.inscription.canceled_price / (6.96),
                                    receipt: req.body.inscription.receipt, // varios recibos
                                    assist: asistencia, //controlar por fecha de inscription ****************
                                    type: 1, //nuevo // nivelacion
                                    person: person._id,
                                    events: req.body.eventId,
                                    //modulars: ObjectId
                              };
                              var lists = new db.lists(list);
                              lists.save(function (err, lists) {
                                    console.log('lista guardada');
                                    if (err) { return res.status(400).send(err); }
                                    addInscription(person, req.body.inscription, req.body.eventId);
                                    //**controlar fecha y modulars*/
                              });
                              function addInscription(person, inscri, idEvent) {
                                    db.events.findOne({ _id: idEvent }, function (err, events) {
                                          console.log(events);
                                          db.modules.find({ programs: events.programs }).count().exec(function (err, moduls) {
                                                console.log(moduls);
                                                console.log('llegue al la cantidad de modulos');
                                                var modulPrice = inscri.price_event / moduls;///////DIVISION
                                                console.log(modulPrice);
                                                var inscription = {
                                                      // segun al numero de asistencias sacar el precio total q tiene q pagar
                                                      total_price: 0,//sumatorio por asistencia de cada modulo
                                                      module_price: modulPrice,
                                                      bolivianos_price: inscri.canceled_price,
                                                      dolares_price: inscri.canceled_price / (6.96),
                                                      canceled_price: inscri.canceled_price,
                                                      price_event: inscri.price_event,
                                                      receipt: inscri.receipt,
                                                      name: person.name,
                                                      ci: person.ci,
                                                      cellphone: person.cellphone,
                                                      persons: person._id,
                                                      users: inscri.users
                                                };
                                                var d = new Date();
                                                ///////////
                                                db.events.update({ _id: idEvent },
                                                      {
                                                            $push: {
                                                                  inscriptions: inscription
                                                            }
                                                      }, {
                                                            multi: true
                                                      }, function (err, events) {
                                                            if (err) return res.status(400).send(err);
                                                            console.log(events);
                                                            // if (events == null) return res.status(404).send();
                                                            return res.status(200).send(person);
                                                      });
                                          });//fin module
                                    });//fin Event
                              }
                        });//F Qevents
                  } else { }
            })
      })

      //post person event 
      .post('/:id', function (req, res) {
            db.events.findOne({ _id: req.params.id }, function (err, event) {
                  if (err) return res.status(400).send(err);
                  if (event == null) return res.status(404).send();
                  // return res.status(200).send(event);
                  getProgram(event);
            });
            function getProgram(event) {
                  db.programs.findOne({ _id: event.program }, { name: 1 }, function (err, program) {
                        if (err) return res.status(400).send(err);
                        event.name = program.name;
                        // return res.status(200).send(event);
                        var persons = event.inscriptions.map(i => i.person);
                        getPerson(persons, event);
                  })
            }
            function getPerson(persons, event) {
                  db.persons.find({ _id: { $in: persons } }, function (err, persons) {
                        if (err) return res.status(400).send(err);
                        // console.log(persons)
                        event.inscriptions.forEach(i => {
                              persons.forEach(person => {
                                    if (JSON.stringify(i.person) == JSON.stringify(person._id)) {
                                          i.name = person.first_name + ' ' + person.last_name;

                                    }
                              });
                        });
                        // console.log(event);
                        return res.status(200).send(event);
                  });
            }

      })
      .post('/filter/:id', function (req, res) {
            // db.events.findOne({ _id: req.params.id }, { inscriptions: 1 }, function (err, event) {
            //    if (err) return res.status(400).send(err);
            //    if (event == null) return res.status(404).send();
            //    if (event.inscriptions.length > 0) return res.status(404).send();
            //    var persons = event.inscriptions.map((p)=>p.person)
            //    Persons(persons);
            //    // return res.status(200).send(event);
            // });
            db.events.aggregate([
                  { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
                  { $unwind: '$inscriptions' },
                  { $match: { 'inscriptions.state': { $eq: req.body.filter } } },
                  { $group: { _id: '$_id', persons: { $push: '$inscriptions.person' } } }
            ], function (err, events) {
                  if (err) return res.status(400).send(err);
                  var persons = events.map((p) => p.persons);
                  Persons(persons);
            })
            function Persons(p) {
                  db.persons.find({ _id: { $in: p } }, function (err, persons) {
                        if (err) return res.status(400).send(err);

                        return res.status(200).send(persons);
                  });
            }
      })

      .post('/', function (req, res) {
            var event = new db.events(req.body);
            var d = new Date();
            console.log(event);
            if ((event.date_start == undefined || event.date_start < d) || event.description == '' || event.total == '' || event.programs == '') return res.status(400).send();

            addInterested();
            function addInterested() {
                  db.persons.aggregate([
                        // { $match: { date_start: { $gt: d1, $lt: d } } },
                        { $project: { interes: 1 } },
                        { $unwind: '$interes' },
                        { $match: { 'interes.programId': mongoose.Types.ObjectId(event.programs), $or: [{ 'interes.state': 0 }, { 'interes.state': 2 }, { 'interes.state': 5 }] } },
                        // { $project: { _id: 1 } },
                        // { $match: { 'interes.state': 2 } },
                        // { $match: { 'interes.state': 5 } },
                  ], function (err, persons) {
                        if (err) return res.status(400).send(err);
                        var interes = [];
                        persons.forEach(p => {
                              interes.push({ persons: p._id, state: p.interes.state })
                        });
                        event.interes = interes;
                        event.save(function (err, event) {
                              if (err) return res.status(400).send(err);
                              return res.status(201).send(event);
                        });
                  });
            }
      })

      .post('/edit', function (req, res) {
            // console.log('test')
            console.log('ESTE ES EL BODY DE QUERY');
            //modificar active
            //db.users.findOne({ name: req.body.name, password_hash: req.body.password_hash, active: true }, { rol: 1, _id: 1 }, function (err, user) {
            if (err) return console.log(err);
            //if (err) return res.status(400).send(err);

            //if (user == null) return res.sendStatus(404);

            // res.status(200).send(user);
            //});
      })
      //update inscription person that interesed to a event
      .put('/:id', function (req, res) {
            console.log(req.body);
            console.log('esto es una prueba' + req.body.name);
            db.events.update({ _id: req.body.name, 'inscriptions.person': req.body.person },
                  {
                        $set: { 'inscriptions.$.state': req.body.state, 'inscriptions.$.description': req.body.description }
                  }).exec(function (err, off) {
                        if (err) return res.status(400).send(err);
                        //db.events.find({ _id: req.body.name, _id: { $in: req.body.person } }, function (err, event) {
                        db.events.find({ _id: req.body.name }, function (err, event) {
                              if (err) return res.status(401).send(err);
                              return res.status(201).send(event);
                        });
                        //	if (off.nModified == 0) return res.status(406).send();
                  });
      })

      .delete('/:id', function (req, res) {
            db.events.remove({ _id: req.params.id }, function (err, event) {
                  if (err) return res.status(400).send(err);

                  return res.status(200).send(event);
            });
      });
//  .put('/:id', function (req, res) {
//   console.log(req.body);
//   db.events.findOne({ _id: req.params.id }, function (err, event) {
//        if (err) return res.status(400).send(err);
//        if (event == null) return res.status(404).send();

//        for (i in req.body) {
//           event[i] = req.body[i];
//        }
//        event.save(function (err, event) {
//           if (err) return res.status(400).send(err);

//           return res.status(200).send(event);
//        });
//     });

module.exports = router;