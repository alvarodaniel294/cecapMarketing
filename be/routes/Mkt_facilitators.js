var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var jwt = require('jsonwebtoken');
var db = require('../models/db');
var router = express.Router();

 
router
.get('/', function (req, res) {
    db.facilitators.find({}, function (err, facilitators) {
       if (err) return res.status(400).send(err);

       return res.status(200).send(facilitators);
    });
 })
 .get('/:id',  function (req, res) {
      db.facilitators.findOne({ _id: req.params.id }, function (err, facilitador) {
         if (err) return res.status(400).send(err);
         if (facilitador == null) return res.status(404).send();

         return res.status(200).send(facilitador);
      });
   })
 .put('update/:id', function (req, res) {
    db.facilitators.findOne({ _id: req.params.id }, function (err, facilitador) {
       if (err) return res.status(400).send(err);
       if (facilitador == null) return res.status(404).send();

       for (i in req.body) {
        facilitador[i] = req.body[i];
         //  console.log(cartera[i]);  
       }
       db.facilitators.update({_id: req.params.id},
        {
              $set:{'descOcupation.carrera':req.body.carrera,
                    'descOcupation.universidad':req.body.universidad,
                    'descOcupation.semestre':req.body.semestre,
                    //Particular
                    'descOcupation.areaTrabajo':req.body.areaTrabajo,
                    //Profesional
                    'descOcupation.profesion':req.body.profesion,
                    'descOcupation.empresa': req.body.empresa,
                    'descOcupation.cargo': req.body.cargo,
              }
        }).exec(function(err, off){
              if (err) return res.status(400).send(err);
        })
       facilitador.save(function (err, facilitador) {
          if (err) return res.status(400).send(err);

          return res.status(200).send(facilitador);
       });
    });
 })
.post('/register', function (req, res) {
    var cartera=new db.facilitators(req.body);
   //  console.log(cartera);
    if(cartera.name=='')return res.status(400)
    cartera.save(function(err,cartera){

        if(err) return console.log(err);

        res.status(200).send(cartera);
    })
  
 });
 
 module.exports = router;
