const mongoose = require('db');
const SectionModel = require('db/schemas/section').model;

exports.addSection = ({ roomId, title }) => {
  const section = new SectionModel({ roomId, title });
  return section.save();
};

exports.getSections = roomId => {
  return SectionModel.find({ roomId });
};

exports.deleteSection = id => {
  return SectionModel.findOneAndDelete({ _id: id });
};