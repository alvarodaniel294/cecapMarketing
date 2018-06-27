var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var jwt = require('jsonwebtoken');
var db = require('../models/db');
var router = express.Router();

 
router
   .get('/', function (req, res) {
      db.mkt_offices.find({}, function (err, offices) {
        if (err) return res.status(400).send(err);

        return res.status(200).send(offices);
      });
    }) 
   .get('/:id', function (req, res) {
      console.log(req.params);
      db.mkt_offices.findOne({ _id: req.params.id }, function (err, office) {
         if (err) return res.status(400).send(err);
         if (office == null) return res.status(404).send();
         return res.status(200).send(office);
      });
   })
   .post('/add', function(req, res){
      console.log(req.body);
      var office = new db.mkt_offices(req.body);
      office.save(function (err, office) {
        if (err){return res.status(400).send(err);} 
        return res.status(200).send(office);
     });
   })
   ;

   module.exports = router; 