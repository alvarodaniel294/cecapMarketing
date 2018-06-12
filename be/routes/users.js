var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var jwt = require('jsonwebtoken');
var db = require('../models/db');
var router = express.Router();


router
   // .get('/', function (req, res, next) {
   // 	f.validation(res, req.body.token, next);
   //   })
   .get('/', function (req, res) {
      db.users.find({}, { name: 1, active: 1, password_hash: 1, rol: 1 }, function (err, users) {
         if (err) return res.status(400).send(err);
         return res.status(200).send(users);
         //console.log(res.status(200).send(users))
      });
   })

   .post('/getAllEjecutivosOfSucursal',function(req,res){
       let identity=req.body;
       let listToSend=[];
       db.users.findOne({_id:identity._id},function(err,user){
            if(err) return res.status(200).send(err)            
            db.users.find({offices:user.offices},function(err,users){
                db.carteras.find({user:{$in :users}},function(err,carteraslist){
                        if(err) return res.status(200).send(err)
                        for(let u of users){
                            for(let c of carteraslist){
                               
                                if(u._id.equals(c.user)){
                                    let item={};                        
                                    item.userId=u._id;
                                    item.carteraUser=c.user;
                                    item.carteraId=c._id;
                                    item.userName=u.name;
                                    item.carteraName=c.name;
                                    item.checked=false;
                                    // console.log(item)
                                    listToSend.push(item);
                                    
                                }
                            }
                        }
                        // console.log(listToSend);
                        return res.status(200).send(listToSend);

                 })                
            })
    })
    
    


   })


   .post('/reporteTrimestralEjecutivos',function(req,res){
        // console.log(req.body);

        // let user=req.body.ejecutivo;
        let fechaFin=new Date();
        let fechaInicio=new Date(fechaFin.getFullYear(),fechaFin.getMonth()-3,fechaFin.getDay());
        let listaPersonasToReport=[];
        db.persons.find({carteras:req.body.carteraId},{_id:1},function(err,personsOfCartera){
             if (err) return res.status(400).send(err); 
            //  console.log(personsOfCartera)       
            let personasDeEjecutivo=personsOfCartera;
            db.events.find({},function(err,listaEventos){
                if (err) return res.status(400).send(err);
                // console.log(listaEventos)
                for(let event of listaEventos){
                    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                    // console.log(event.interes);

                    for(let itemInteres of event.interes){
                        for(let p of personsOfCartera){
                            // console.log(typeof(p._id));
                            // console.log(typeof(itemInteres.persons))
                            // console.log(new String(p._id).valueOf())
                            
                            if( new String(p._id).valueOf()==new String(itemInteres.persons).valueOf()){
                                if((itemInteres.date_state<fechaFin)&&(itemInteres.date_state>fechaInicio)){
                                    listaPersonasToReport.push(p);
                                    // console.log("estaes la lista para eportar", listaPersonasToReport)
                                }
                            }
                        }
                    }


                  
                }
                return res.status(200).send(listaPersonasToReport);

            })
        })
   })

   .post('/reporteTrimestralInscritosEjecutivos',function(req,res){
    // console.log(req.body);

    let fechaFin=new Date();
    let fechaInicio=new Date(fechaFin.getFullYear(),fechaFin.getMonth()-3,fechaFin.getDay());
    let listaPersonasToReport=[];
    db.persons.find({carteras:req.body.carteraId},{_id:1},function(err,personsOfCartera){
         if (err) return res.status(400).send(err); 
        //  console.log(personsOfCartera)       
        let personasDeEjecutivo=personsOfCartera;
        db.events.find({},function(err,listaEventos){
            if (err) return res.status(400).send(err);
            // console.log(listaEventos)
            for(let event of listaEventos){
                // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                // console.log(event.interes);

                for(let itemInteres of event.interes){
                    for(let p of personsOfCartera){
                        // console.log(typeof(p._id));
                        // console.log(typeof(itemInteres.persons))
                        // console.log(new String(p._id).valueOf())
                        
                        if( new String(p._id).valueOf()==new String(itemInteres.persons).valueOf()){
                            if((itemInteres.date_state<fechaFin)&&(itemInteres.date_state>fechaInicio)&&(itemInteres.state==3)){
                                listaPersonasToReport.push(p);
                                // console.log("estaes la lista para eportar", listaPersonasToReport)
                            }
                        }
                    }
                }


              
            }
            return res.status(200).send(listaPersonasToReport);

        })
    })
})

.get('/getEjecutivoToEdit/:id', function (req, res) {
    db.users.findOne({ _id: req.params.id }, function (err, user) {
       if (err) return res.status(400).send(err);
       if (user == null) return res.status(404).send();
          let eje={};
          eje._id=user._id;
          eje.name=user.name;
          eje.lastname=user.lastname;
          eje.password_hash=user.password_hash;
          eje.active=user.active;
          eje.cell=user.cell;
          eje.correo=user.correo;
          eje.rol=user.rol;
          eje.offices=user.offices;
          db.carteras.findOne({user:user._id},function(err,cart){
              if (err) return res.status(400).send(err);
              eje.cartera=cart;
              console.log(cart);
              return res.status(200).send(eje);
              
          })
         

    });
 })

   .get('/roles', function (req, res) {
      db.roles.find({}, function (err, users) {
         if (err) return res.status(400).send(err);

         return res.status(200).send(users);
      });
   })
   .get('/:id', function (req, res) {
      db.users.findOne({ _id: req.params.id }, function (err, user) {
         if (err) return res.status(400).send(err);
         if (user == null) return res.status(404).send();
         return res.status(200).send(user);
      });
   })

   .delete('/:id', function (req, res) {

      db.users.deleteOne({ _id: req.params.id }, function (err, user) {

         if (err) return res.status(400).send(err);
         if (user == null) return res.status(404).send();
         return res.status(200).send(user);
      })
   })

   .get('/rolName/:id', function (req, res) {

      db.roles.findOne({ _id: req.params.id }, function (err, roleName) {
         if (err) return res.status(400).send(err);
         if (roleName == null) return res.sendStatus(404);

         return res.status(200).send(roleName);
      });
   })
   .post('/auth', function (req, res) {
      if (typeof req.body._id == null) res.send(403);
      db.users.findOne({ _id: req.body._id, active: true }, { password_hash: 0 }, function (err, user) {
         if (err) return console.log(err);
         if (user == null) return res.sendStatus(404);
         return res.status(200).send(user);
      });
   })
   .post('/exist', function (req, res) {
      db.users.findOne({ _id: req.body._id }, { rol: 1, name: 1, active: 1 }, function (err, user) {
         if (err) return console.log(err);
         if (user == null) return res.sendStatus(404);

         return res.status(200).send(user);
      });
   })

   .get('/existName/:id', function (req, res) {
      db.users.findOne({ name: req.params.id }, { name: 1 }, function (err, user) {
         if (err) return console.log(err);
         if (user == null) return res.sendStatus(404);
         return res.status(200).send(true);
      });
   })

   .post('/token', function (req, res) {
      //MORE data
      if (typeof req.body.toke == null) res.send(403);
      db.users.findOne({ token: req.body.toke, active: true }, function (err, user) {
         if (err) return console.log(err);
         if (user == null) return res.sendStatus(404);

         res.status(200).send(user);
      });
   })

   .post('/register', function (req, res, next) {
      var role_id;
      db.roles.findOne({ name: 'Admin' }, function (err, role) {
         if (err) return res.status(400).send(err);
         if (role == null) return res.sendStatus(404);
         role_id = role._id;
         //    console.log(req.body);
         validating();
      })
      function validating() {
         db.users.findOne({ _id: req.body._id, rol: role_id }, function (err, user) {
            if (err) return console.log(err);
            if (user == null) return res.sendStatus(405);
            // console.log(user);
            next();


         });
      }
   })
   .post('/register', function (req, res) {
      req.body._id = undefined;
      var _user = req.body;
      _user.active = true;
      _user.password_hash = _user.name;

      var user_model = new db.users(_user);
      user_model.token = jwt.sign(user_model._id + '' + user_model.record_date, 'AltaPrecision'); //FIX
      user_model.tokens = [user_model.token];
      user_model.save(function (err, user) {
         if (err) return console.log(err);


         var nuevaCaja = new db.cashFlowUsers();
         nuevaCaja.date_start = new Date();
         nuevaCaja.dete_end = '';
         nuevaCaja.amount = 0;
         nuevaCaja.amount_delivered = 0;
         nuevaCaja.active = true;
         nuevaCaja.state = -1;
         nuevaCaja.user = user._id;

         nuevaCaja.save();

         res.status(201).send(user);
      });
   })

   .post('/login', function (req, res) {
      //modificar active
      db.users.findOne({ name: req.body.name, password_hash: req.body.password_hash, active: true }, { rol: 1, _id: 1 }, function (err, user) {
         console.log(user)
         if (err) return console.log(err);
         console.log(user);
         if (user == null) return res.sendStatus(404);

         res.status(200).send(user);
      });
   })
   //    .post('/logins', function (req, res) {
   //       // console.log('test')
   //       console.log(req.body);
   //       //modificar active
   //       db.users.findOne({ name: req.body.name, password_hash: req.body.password_hash}, 
   //             { rol: 1, _id: 1 },//nos devuelve el rol y id de este user
   //            function (err, user) {
   //          if (err) return console.log(err);
   //          if (user == null) return res.sendStatus(404);
   //          res.status(200).send(user);
   //          db.users.update({ _id: req.body._id },
   //             {$set:{ active: true }}
   //          );
   //       });
   //    })

   // .post('/logout', function (req, res) {
   // 	db.users.findOne({phone: req.body.phone, password_hash: req.body.password_hash}, function (err, user_model) {
   // 		if (err) return console.log(err);
   // 		if (user_model == null) return res.sendStatus(404);

   // 		user_model.token = jwt.sign(_user, 'password_hash_key_token'); //FIX
   // 		user_model.tokens = user_model.tokens.push(_user.token);

   // 		user_model.save(function (err, user) {
   // 	    if (err) return console.log(err);

   // 			res.status(200).send(user);
   // 		});
   // 	});
   // })


   .post('/', function (req, res) {
      var users = new db.users(req.body);
      console.log(users);
      // if (person.first_name == '' || person.last_name == '' || person.ci == '' || person.user == '') return res.status(400).send();
      // save person
      users.save(function (err, users) {
         if (err) return res.status(400).send(err);
         return res.status(200).send(users);
      });
      // add vigent events


   })
   .put('/:id', function (req, res) {

      // console.log(req.body.user);
      // db.users.update(
      //    { _id: req.params.id },
      //    {
      //       $set: {
      //          name: req.body.user.name,
      //       //    salary: req.body.user.salary,
      //          active: req.body.user.active,
      //          password_hash: req.body.user.name,
      //          lastname:req.body.user.lastname,
      //          cell:req.body.user.cell,
      //          correo:req.body.user.correo,
      //          rol:req.body.user.rol,
      //          offices:req.body.user.offices

      //       }
      //    }, function (err, user) {
      //       if (err) return res.status(400).send(err);
      //       return res.status(200).send();
      //    });

      db.users.findOne({ _id: req.params.id }, function (err, user) {
         if (err) return res.status(400).send(err);
         if (user == null) return res.status(404).send();

         for (i in req.body) {
            user[i] = req.body[i];
            console.log(user[i]);
         }
         user.save(function (err, user) {
            if (err) return res.status(400).send(err);

            return res.status(200).send(user);
         });
      });
   });

module.exports = router;
