const mongoose = require('../index');
const options = require('./schemaOptions');

const schema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: Number,
  sectionId: mongoose.Types.ObjectId,
}, options);

exports = schema;
exports.model = mongoose.model('Card', schema);
