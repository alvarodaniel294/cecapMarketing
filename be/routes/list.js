var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var jwt = require('jsonwebtoken');
var db = require('../models/db');
var router = express.Router();

router

    .post('/add/university', function (req, res) {
        console.log(req.body);
        // db.listExtra.find({}, function (err, lista) {
        //     if (err) return res.status(400).send();
        //     console.log(lista)
        //     update(lista[0]._id);
        // })
        // function update(id) {
        //     console.log(req.body.university, req.body.carrera)
        //     db.listExtra.update({ _id: id }, {
        //         $push: {
        //             'university': req.body.university,
        //             'carrera': req.body.carrera
        //         }
        //     }, function (err, lista) {
        //         if (err) return res.status(400).send(err);
        //         return res.status(200).send(lista);
        //     })
        // }
        let uni = {}
        // let car = {}
        uni.nombre = req.body.university;
        // car.nombre = req.body.carrera;
        console.log(uni.name)
        
        db.listExtra.findOne({}, function (err, lista) {
            if (err) { return res.status(400).send(err); }
            console.log(lista)
                lista.university.push(uni),
                // lista.carrera.push(car)

            lista.save(function (err, lista) {
                if (err) { return res.status(400).send(err); }
                return res.status(200).send(lista);
            });
        })

    })
    .post('/add/carrera', function (req, res) {
        console.log(req.body);
        // db.listExtra.find({}, function (err, lista) {
        //     if (err) return res.status(400).send();
        //     console.log(lista)
        //     update(lista[0]._id);
        // })
        // function update(id) {
        //     console.log(req.body.university, req.body.carrera)
        //     db.listExtra.update({ _id: id }, {
        //         $push: {
        //             'university': req.body.university,
        //             'carrera': req.body.carrera
        //         }
        //     }, function (err, lista) {
        //         if (err) return res.status(400).send(err);
        //         return res.status(200).send(lista);
        //     })
        // }
        let car = {}
        car.nombre = req.body.carrera;
        
        db.listExtra.findOne({}, function (err, lista) {
            if (err) { return res.status(400).send(err); }
            console.log(lista)
                lista.carrera.push(car)

            lista.save(function (err, lista) {
                if (err) { return res.status(400).send(err); }
                return res.status(200).send(lista);
            });
        })

    })


module.exports = router;