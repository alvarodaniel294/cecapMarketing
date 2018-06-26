// import { BADFAMILY } from 'dns';

var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var jwt = require('jsonwebtoken');
var db = require('../models/db');
var router = express.Router();

router
   .get('/', function (req, res) {
      db.carteras.find({}, function (err, carteras) {
         if (err) return res.status(400).send(err);

         return res.status(200).send(carteras);
      });
   })

   .get('/libres/', function (req, res) {
    db.carteras.find({active:false}, function (err, carteras) {
       if (err) return res.status(400).send(err);

       return res.status(200).send(carteras);
    });
 })
  
//    .post('/', function (req, res) {
//     var cartera = new db.carteras(req.body);
//     var d = new Date();
//     // if ((event.date_start == undefined || event.date_start < d) ||event.description == '' || event.total == '' || event.program == '') return res.status(400).send();
//     db.carteras.find({}, function (err, persons) {
//        if (err) return res.status(400).send(err);
//        saveCartera(cartera);
//     });
//     function saveCartera(cartera) {
      
//        event.save(function (err, event) {
//           if (err) return res.status(400).send(err);

//           return res.status(201).send(event);
//        });
//     }


.post('/reasignarCartera',function(req,res){
    console.log(req.body)
    db.carteras.findOne({_id:req.body.cartera},function(err,cart){
        if (err) return res.status(400).send(err);

        if(req.body.cartera!=req.body.carteraAntigua){
        
            cart.user=req.body.ejecutivo;
            cart.active=true;
            cart.save();
                
            db.carteras.findOne({_id:req.body.carteraAntigua},function(err,carter){
                if (err) return res.status(400).send(err);
                carter.user=undefined;
                carter.active=false;
                carter.save(function(err,ca){
                    if (err) return res.status(400).send(err);
                    return res.status(200).send(cart);
                });



            })
        }else{
            return res.status(200).send(cart);
            
        }
       
    })
    
})


.get('/persons/:_id', function (req, res) {
    
    
    db.carteras.findOne({_id: req.params._id},function(err,cartera){
        if(err)return res.status().send(err);
        if(cartera==null)return res.status(404).send();
        // console.log(cartera);
       getPersonas(cartera);
       
        
    }

    );

    function getPersonas(cartera){
        // let carteraObj=moongose.Types.ObjectId(cartera);
        db.persons.find({carteras:cartera},function(err,persons){
            if(err)return res.status(400).send(err);
            // console.log(persons);
            if (persons == null) return res.status(404).send();
            
           return res.status(200).send(persons);
        });
    }
    
 })
.get('/otro/:id', function (req, res) {
    db.carteras.findOne({user: req.params.id},function(err,cartera){
        if(err)return res.status().send(err);
        if(cartera==null)return res.status(404).send();
      //   console.log('hola desde get cartera user');
      //   console.log(cartera); 
       // getPersonas(cartera);
       return res.status(200).send(cartera);
    });

   
 })
 .get('/:id', function (req, res) {
    db.carteras.findOne({ _id: req.params.id }, function (err, cartera) {
       if (err) return res.status(400).send(err);
       if (cartera == null) return res.status(404).send();

       return res.status(200).send(cartera);
    });
 })

//  .post('/register', function (req, res, next) {
//     var role_id;
//     db.roles.findOne({ name: 'Admin' }, function (err, role) {
//        if (err) return res.status(400).send(err);
//        if (role == null) return res.sendStatus(404);
//        role_id = role._id;
//        validating();
//     })
//     function validating() {
//        db.users.findOne({ _id: req.body._id, rol: role_id }, function (err, user) {
//           if (err) return console.log(err);
//           if (user == null) return res.sendStatus(404);
//           console.log(user);
//           next();
          
          
//        });
//     }
//  })

.put('/:id', function (req, res) {
    db.carteras.findOne({ _id: req.params.id }, function (err, cartera) {
       if (err) return res.status(400).send(err);
       if (cartera == null) return res.status(404).send();

       for (i in req.body) {
          cartera[i] = req.body[i];
         //  console.log(cartera[i]);  
       }
       cartera.active=true;
       cartera.save(function (err, cartera) {
          if (err) return res.status(400).send(err);

          return res.status(200).send(cartera);
       });
    });
 })
 .post('/guardar',function(req,res){
    var cartera = new db.carteras(req.body);
    cartera.active=false;
     console.log(cartera);
     cartera.save();
 })
 .post('/register', function (req, res) {
    var cartera=new db.carteras(req.body);
   //  console.log(cartera);
    if(cartera.name=='')return res.status(400)
        cartera.active=false;
    cartera.save(function(err,cartera){

        if(err) return console.log(err);

        res.status(200).send(cartera);
    })
  
 });

 
 





//function PUT
//  .put('/:id', function (req, res) {
//     console.log(req.body);
//     db.carteras.find({user: req.params.id},function(err,cartera){
//         if(err)return res.status().send(err);
//         if(cartera==null)return res.status(404).send();
//         console.log(cartera);
//        // getPersonas(cartera);
//     });
// });
module.exports = router;
