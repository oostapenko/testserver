const mongoose = require('../index');
const options = require('./schemaOptions');

const schema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  roomId: String,
}, options);

//exports = schema;
exports.model = mongoose.model('User', schema);