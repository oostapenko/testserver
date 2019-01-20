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

// App
const baseApp = express();
const api = express();
const app = express();
baseApp.use('/wiki/api', api);
baseApp.use('/app/api', app);

// App setup
baseApp.set('views', path.join(__dirname, 'views'));
baseApp.set('view engine', 'jade');
baseApp.engine('jade', require('jade').__express);
baseApp.use(compression());
baseApp.use(bodyParser.json());
baseApp.use(bodyParser.urlencoded({ extended: false }));
baseApp.use(express.static(path.join(__dirname, 'public')));
baseApp.use(errorHandler);

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