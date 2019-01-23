const mongoose = require('../index');
const options = require('./schemaOptions');

const schema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  roomId: { type: String, required: true },
}, options);

module.exports = schema;
module.exports.model = mongoose.model('User', schema);