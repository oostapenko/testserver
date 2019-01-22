const logger = require('lib/logger');
const UserModel = require('db/schemas/user').model;

exports.addUser = ({ username, password, roomId }) => {
  const user = new UserModel({ username, password, roomId });

  return user
    .save()
    .then(doc => { logger.info(doc); return [null, doc]; })
    .catch(err => { logger.error(err); return [err, null]; });
};
