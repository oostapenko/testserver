const mongoose = require('../index');
const options = require('./schemaOptions');

const schema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: Number,
  sectionId: { type: mongoose.Types.ObjectId, required: true },
}, options);

module.exports = schema;
module.exports.model = mongoose.model('Card', schema);
