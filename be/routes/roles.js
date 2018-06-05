var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var jwt = require('jsonwebtoken');
var db = require('../models/db');
var router = express.Router();

 
router
   .get('/', function (req, res) {
    db.roles.find({}, function (err, roles) {
       if (err) return res.status(400).send(err);

       return res.status(200).send(roles);
    });
     }) 
   .get('/:id', function (req, res) {
      console.log(res)
      db.roles.findOne({ _id: req.params.id }, function (err, rol) {
         if (err) return res.status(400).send(err);
         if (rol == null) return res.status(404).send();
         return res.status(200).send(rol);
      });
   })

   .post('/current',function(req,res){
    console.log(req.body.rol)
    db.roles.findOne({_id:req.body.rol},function(err,rol){
      if (err) return res.status(400).send(err);
      return res.status(200).send(rol)

    })

   })
//    .post('/add', function(req, res){
//       console.log(req.body);
//       var office = new db.offices(req.body);
//       office.save(function (err, office) {
//         if (err){return res.status(400).send(err);} 
//         return res.status(200).send(office);
//      });
//    })
   ;

   module.exports = router; 