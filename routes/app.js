const userController = require('controllers/user');
const sectionController = require('controllers/section');
const cardController = require('controllers/card');

module.exports = app => {
  app.get('/user', userController.getUser);
  app.delete('/user/:userId', userController.deleteUser);
  app.post('/login', userController.login);
  app.get('/sections', sectionController.getSections);
  app.post('/section', sectionController.addSection);
  app.delete('/section/:sectionId', sectionController.deleteSection);
  app.get('/section/:sectionId/cards', cardController.getCards);
  app.post('/card', cardController.addCard);
  app.put('/card/:cardId', cardController.updateCard);
  app.delete('/card/:cardId', cardController.deleteCard);
};