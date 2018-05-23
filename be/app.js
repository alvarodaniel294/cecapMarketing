var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var compression = require('compression');
var filter = require('content-filter');
var cors = require('cors');
var db = require('./models/db');
var app = express();
process.env.TZ = 'America/La_Paz';

//middlewares
app
   .use(cors())
   .use(compression())
   .use('/', express.static(__dirname + '/public'))
   .use(morgan('dev'))
   .use(body_parser.urlencoded({ extended: true }))
   .use(body_parser.json())
   .use(filter())// filter injections nosql
   .use(function (req, res, next) {
      var token = typeof req.headers["authorization"] != 'undefined' ? req.headers["authorization"] : null;
      req.body.token = token;
      next();
   });


app.get('/', function (req, res) {
   res.sendfile('public/index.html', { root: __dirname })
});

//routes 
app
   .use('/users', require('./routes/users'))
   .use('/events', require('./routes/events'))
   // .use('/registers', require('./routes/registers'))
   .use('/carteras', require('./routes/carteras'))
   .use('/facilitators', require('./routes/facilitators'))
   
   .use('/persons', require('./routes/persons'))
   .use('/programs', require('./routes/programs'))
   .use('/modules', require('./routes/modules'))
   .use('/offices', require('./routes/offices'))
   .use('/roles', require('./routes/roles'))   
   .use('/cajaUsuario', require('./routes/cajaUsuario'))
   .use('/company', require('./routes/company'))
   .use('/lists', require('./routes/lists'))  
   .use('/correlatives', require('./routes/correlatives'))
   .use('/cajaSucursal',require('./routes/cajaSucursal'))
   .use(function (err, req, res, next) { 
      console.error(err.stack);
      return res.status(err.status || 500).send('Not Found');
   });

//   db.
//If need initialize db 
if (false){ 
   var init = require('./models/init');
   // init.clearCollections();
   init.initializer();
}
db.connection();

//start app
app.listen(3000, function () {
   console.log('Example app listening at http://localhost:3000');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', db.endMongoConnection)
   .on('SIGTERM', db.endMongoConnection);

module.exports = app;