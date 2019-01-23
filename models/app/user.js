const mongoose = require('db');
const UserModel = require('db/schemas/user').model;

exports.addUser = ({ username, password, roomId }) => {
  const user = new UserModel({ username, password, roomId });
  return user.save();
};

exports.getUser = id => {
  return UserModel.findOne({ _id: id });
};

exports.deleteUser = id => {
  return UserModel.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) });
};