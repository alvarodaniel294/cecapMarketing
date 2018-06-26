var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var jwt = require('jsonwebtoken');
var db = require('../models/db');
var router = express.Router();

 
router 
   .get('/', function (req, res) {
        db.company.find({}, function (err, companys) {
         //  console.log(companys);
          if (err) return res.status(400).send(err);
          return res.status(200).send(companys);
        });
     }) 
   .get('/:id', function (req, res) {
      // console.log(req.params);
      db.company.findOne({ _id: req.params.id }, function (err, company) {
         if (err) return res.status(400).send(err);
         if (company == null) return res.status(404).send();
         return res.status(200).send(company);
      });
   });

   module.exports = router; 