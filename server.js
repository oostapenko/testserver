const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const compression = require('compression');
const errorHandler = require('middleware/errorHandler');
const config = require('config');
const logger = require('lib/logger')(module);
const session = require('express-session');
const FileStore = require('session-file-store')(session);

// Load environment variables from .env file
dotenv.load();

// Adding apps
const baseApp = express();
const api = express();
const app = express();
baseApp.use('/wiki/api', api);
baseApp.use('/app/api', app);

const enableCORS = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.get('client:host') + ':' + config.get('client:port'));
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Request-Method', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
};

const sessionSettings = {
  secret: 'mysecretsession',
  store: new FileStore({

    path: './session-store'

  }),
  name: 'nextretro',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365
  }
};

const setupApp = (application, routePath) => {
  application.use(express.static(path.join(__dirname, 'public')));
  application.use(enableCORS);
  application.use(cookieParser());
  application.use(session(sessionSettings));
  application.use(bodyParser.json());
  application.use(bodyParser.urlencoded({ extended: true }));
  require(routePath)(application);
  application.use(errorHandler);
};

setupApp(api, 'routes/confluence');
setupApp(app, 'routes/app');

// Catch uncought errors
process.on('uncaughtException', err => {
  logger.error(err);
});

// Start the server.
baseApp.listen(config.get('port'), () => {
  console.log('Listening on port ' + config.get('port') + '...');
});

module.exports = baseApp;