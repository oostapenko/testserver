const userModel = require('models/app/user');
const sectionModel = require('models/app/section');

exports.getSections = function(req, res, next) {
  const userId = req.session.userId;
console.log('userId from session\n\n', userId, '\n\n')
console.log('session\n', req.session, '\n\n')
  userModel
    .getUser(userId)
    .then(user => user.roomId)
    .then(roomId => sectionModel.getSections(roomId))
    .then(sections => res.json(sections))
    .catch(err => next(err));
};

exports.addSection = function(req, res, next) {
  const title = req.body.title;
  const userId = req.session.userId;

  userModel
    .getUser(userId)
    .then(user => user.roomId)
    .then(roomId => sectionModel.addSection({ roomId, title }))
    .then(section => sectionModel.getSections(section.roomId))
    .then(sections => res.json(sections))
    .catch(err => next(err));
};

exports.deleteSection = function(req, res, next) {
  const sectionId = req.params.sectionId;

  sectionModel.deleteSection(sectionId)
    .then(section => sectionModel.getSections(section.roomId))
    .then(sections => res.json(sections))
    .catch(err => next(err));
};
