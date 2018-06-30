var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var jwt = require('jsonwebtoken');
var db = require('../models/db');
var router = express.Router();

router
   .get('/', function (req, res) {
      db.mkt_modules.find({}, function (err, modules) {
         if (err) return res.status(400).send(err);

         return res.status(200).send(modules);
      });
   })
   .get('/:id', function (req, res) {
      db.mkt_modules.findOne({ _id: req.params.id }, function (err, modulo) {
         if (err) return res.status(400).send(err);
         if (modulo == null) return res.status(404).send();
         return res.status(200).send(modulo);
      });
   })
   .get('/lista/:id', function (req, res) {
      console.log('hola')
      db.mkt_modules.find({ programs: req.params.id }, function (err, modules) {
        if (err) return res.status(400).send(err);
        return res.status(200).send(modules);
      });
   })
   .get('/eventoModuls/:id', function (req, res) {
    console.log(req.params.id);
    db.mkt_events.findOne({_id: req.params.id}, function(err, events){
      //console.log(events);
      if(err){return res.status(400).send(err);}
      db.mkt_modules.find({programs: events.programs},function(err, moduls){
          if(err){return res.status(400).send(err);}
          console.log(moduls);
          return res.status(200).send(moduls);

      });//F module
    });//F EVENTS
 })
   
   .post('/add', function(req, res){
      console.log(req.body);
      var modulo = new db.mkt_modules(req.body);
      modulo.save(function (err, modulo) {
        if (err){return res.status(400).send(err);} 
        return res.status(200).send(modulo);
      });
   })
   .put('/:id', function (req, res) {
      db.mkt_modules.findOne({ _id: req.params.id }, function (err, modulo) {
         if (err) return res.status(400).send(err);
         if (modulo == null) return res.status(404).send();
         for (i in req.body) {
            modulo[i] = req.body[i];
         }
         modulo.save(function (err, modulo) {
            if (err) return res.status(400).send(err);
            return res.status(200).send(modulo);
         });
      });
   })
   .put('/edit/:id', function(req, res){
    console.log(req.body)
    console.log(req.params.id)
    db.mkt_modules.update({_id: req.params.id},
        {
            $set: {'number': req.body.number,
                   'name': req.body.name,
                   'content': req.body.content}
        }).exec(function(err, off){
            if (err) return res.status(400).send(err);
      })
   })
   .delete('/:id', function (req, res) {
      db.mkt_modules.remove({ _id: req.params.id }, function (err, modulo) {
         if (err) return res.status(400).send(err);

         return res.status(200).send(modulo);
      });
   });

module.exports = router;