const confluenceController = require('controllers/confluence');
const userController = require('controllers/user');

module.exports = app => {
  app.get('/', confluenceController.getSpaces);
  app.post('/login', userController.login)
};