var express = require('express');
var db = require('../models/db');
var router = express.Router();

router
  .get('/', function (req, res) {
    db.providers.find({}, function (err, providers) {
      if (err) return res.status(400).send(err);

      return res.status(200).send(providers);
    });
  })

	.get('/:id', function (req, res) {
		db.providers.findOne({_id: req.params.id}, function (err, provider) {
			if (err) return res.status(400).send(err);
      		if (provider == null) return res.status(404).send();

			return res.status(200).send(provider);
  		});
	})

	.post('/', function (req, res) {
		var provider = new db.providers(req.body);
    
		provider.save(function (err, provider) {
			if (err) return res.status(400).send(err);

			return res.status(201).send(provider);
		});
	})

	.put('/:id', function (req, res) {
		db.providers.findOne({_id: req.params.id}, function (err, provider) {
			if (err) return res.status(400).send(err);
      if (provider == null) return res.status(404).send();

			for (i in req.body) {
				provider[i] = req.body[i];
			}
			provider.save(function (err, provider) {
				if (err) return res.status(400).send(err);

				return res.status(200).send(provider);
			});
		});
	})

	.delete('/:id', function (req, res) {
		db.providers.remove({_id: req.params.id}, function (err, provider) {
			if (err) return res.status(400).send(err);

			return res.status(200).send(provider);
		});
	});

module.exports = router;