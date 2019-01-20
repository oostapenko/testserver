const confluenceController = require('controllers/confluence');

module.exports = app => {
  app.get('/', confluenceController.getSpaces);

};