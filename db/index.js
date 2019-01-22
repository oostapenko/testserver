const mongoose = require('mongoose');
const config = require('config');
const logger = require('lib/logger')(module);

mongoose.Promise = global.Promise;
mongoose.set('debug', config.get('mongoose:debug'));
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));
mongoose.connection.on('connected', function() {
  logger.info('Database connected');
});
mongoose.connection.on('error', function() {
  logger.info('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

module.exports = mongoose;