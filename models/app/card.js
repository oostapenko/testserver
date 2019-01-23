const mongoose = require('db');
const CardModel = require('db/schemas/card').model;

module.exports.addCard = ({ sectionId, text }) => {
  const card = new CardModel({ sectionId, text });
  return card.save();
};

module.exports.getCards = sectionId => {
  return CardModel.find({ sectionId });
};

module.exports.updateCard = ({ cardId, text, votes }) => {
  return CardModel.findOneAndUpdate(
    { _id: cardId },
    { text, votes },
    { new: true }
  );
};

module.exports.deleteCard = id => {
  return CardModel.findOneAndDelete({ _id: id });
};