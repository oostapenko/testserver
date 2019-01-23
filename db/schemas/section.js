const mongoose = require('../index');
const options = require('./schemaOptions');

const schema = new mongoose.Schema({
  roomId: { type: String, required: true },
  title: { type: String, unique: true, required: true },
  color: String,
}, options);

module.exports = schema;
module.exports.model = mongoose.model('Section', schema);