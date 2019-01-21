const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const compression = require('compression');
const errorHandler = require('middleware/errorHandler');
const config = require('config');
const logger = require('lib/logger')(module);

// Load environment variables from .env file
dotenv.load();

// Base app
const baseApp = express();

// API app
const api = express();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

// Main app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

baseApp.use('/wiki/api', api);
baseApp.use('/app/api', app);

// App setup
baseApp.use(compression());
baseApp.use(express.static(path.join(__dirname, 'public')));
baseApp.use(errorHandler);

// Enable CORS
api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.get('client:host') + ':' + config.get('client:port'));
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Request-Method', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// Routes
require('routes/confluence')(api);
require('routes/app')(app);

// Catch uncought errors
process.on('uncaughtException', err => {
  logger.error(err);
});

// Start the server.
baseApp.listen(config.get('port'), () => {
  console.log('Listening on port ' + config.get('port') + '...');
});

module.exports = baseApp;