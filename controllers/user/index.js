const logger = require('lib/logger');
const userModel = require('models/app/user');

exports.login = function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  userModel.addUser({ username, password })
    .then((err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(result);
    });
}