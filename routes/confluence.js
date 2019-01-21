const confluenceController = require('controllers/confluence');

module.exports = app => {
  app.get('/', confluenceController.getSpaces);
  app.get('/members/:groupName', confluenceController.getMemebers);
  app.get('/groups', confluenceController.getGroups);
  app.get('/spaces', confluenceController.getSpaces);
  app.get('/space/:spaceKey', confluenceController.getSpace);
  app.get('/space/:spaceKey/content', confluenceController.getSpaceContent);
  app.get('/content/:parentPageId/pages', confluenceController.getPages);
  app.get('/content/:spaceName/:parentPageId/pages', confluenceController.getChildPages);
  app.post('/content', confluenceController.createPage);

};