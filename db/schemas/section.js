const mongoose = require('../index');
const options = require('./schemaOptions');

const schema = new mongoose.Schema({
  roomId: String,
  title: { type: String, unique: true, required: true },
  color: String,
}, options);

exports = schema;
exports.model = mongoose.model('Section', schema);