const mongoose = require('db');
const CardModel = require('db/schemas/card').model;

module.exports.addCard = ({ sectionId, title }) => {
  const card = new CardModel({ sectionId: mongoose.Types.ObjectId(sectionId), title });
  return card.save();
};

module.exports.getCards = sectionId => {
  return CardModel.find({ sectionId });
};

module.exports.updateCard = ({ cardId, sectionId, text, votes }) => {
  return CardModel.findOneAndUpdate(
    { _id: cardId },
    { text, votes },
    { new: true }
  );
};

module.exports.deleteCard = id => {
  return CardModel.findOneAndDelete({ _id: id });
};