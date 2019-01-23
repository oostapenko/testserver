const userModel = require('models/app/user');

exports.login = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const roomId = req.body.room_id;
//console.log('session username', req.session.userId === mongoose.Types.ObjectId())
  userModel.addUser({ username, password, roomId })
    .then(user => {
      req.session.userId = user._id;
      res.json(user);
    })
    .catch(err => next(err));
};

exports.getUser = function(req, res, next) {
  const userId = req.session.userId;

  console.log('userId from session\n\n', userId, '\n\n')
  console.log('session\n', req.session, '\n\n')

  userModel.getUser(userId)
    .then(user => res.json(user))
    .catch(err => next(err));
};

exports.deleteUser = function(req, res, next) {
  const userId = req.params.userId;
  userModel.deleteUser(userId)
    .then(() => res.status(204).end())
    .catch(err => next(err));
};