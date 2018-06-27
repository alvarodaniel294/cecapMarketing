var express = require('express');
var db = require('../models/db');
var router = express.Router();

router
  .get('/', function (req, res) {
    db.mkt_registers.find({}, function (err, registers) {
      if (err) return res.status(400).send(err);

      return res.status(200).send(registers);
    });
  })

	.get('/:id', function (req, res) {
		db.mkt_registers.findOne({_id: req.params.id}, function (err, register) {
			if (err) return res.status(400).send(err);
      		if (register == null) return res.status(404).send();

			return res.status(200).send(register);
  		});
	})

	.post('/', function (req, res) {
		var register = new db.mkt_registers(req.body);
    
		register.save(function (err, register) {
			if (err) return res.status(400).send(err);

			return res.status(201).send(register);
		});
	})


	.put('/:id', function (req, res) {
		db.mkt_registers.findOne({_id: req.params.id}, function (err, register) {
			if (err) return res.status(400).send(err);
      if (register == null) return res.status(404).send();

			for (i in req.body) {
				register[i] = req.body[i];
			}
			register.save(function (err, register) {
				if (err) return res.status(400).send(err);

				return res.status(200).send(register);
			});
		});
	})

	.delete('/:id', function (req, res) {
		db.mkt_registers.remove({_id: req.params.id}, function (err, register) {
			if (err) return res.status(400).send(err);

			return res.status(200).send(register);
		});
	});

module.exports = router;