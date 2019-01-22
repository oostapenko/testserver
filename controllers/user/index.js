const userModel = require('models/app/user');

exports.login = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const roomId = req.body.room_id;

  userModel.addUser({ username, password, roomId })
    .then(result => res.json(result))
    .catch(err => next(err));
};