const userModel = require('models/app/user');
const sectionModel = require('models/app/section');
const cardModel = require('models/app/card');

module.exports.getCards = function(req, res, next) {
  const sectionId = req.params.sectionId;

  cardModel.getCards(sectionId)
    .then(cards => res.json(cards))
    .catch(err => next(err));
};

module.exports.addCard = function(req, res, next) {
  const text = req.body.text;
  const sectionId = req.body.sectionId;

  cardModel.addCard({ sectionId, text })
    .then(card => sectionModel.getCards(sectionId))
    .then(cards => res.json(cards))
    .catch(err => next(err));
};

module.exports.updateCard = function(req, res, next) {
  const cardId = req.params.cardId;
  const text = req.body.text;
  const votes = req.body.votes;

  cardModel.updateCard({ cardId, text, votes })
    .then(card => sectionModel.getCards(card.sectionId))
    .then(cards => res.json(cards))
    .catch(err => next(err));
};

module.exports.deleteCard = function(req, res, next) {
  const cardId = req.params.cardId;

  cardModel.deleteCard(cardId)
    .then(card => cardModel.getCards(card.sectionId))
    .then(cards => res.json(cards))
    .catch(err => next(err));
};
