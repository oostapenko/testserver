const Confluence = require('lib/confluence_extension');
const getConfig = require('config/confluence');
const logger = require('lib/logger')(module);
const HttpError = require('middleware/errorHandler').HttpError;

const memberModel = require('models/confluence/member');
const contentModel = require('models/confluence/content');

const confluence = new Confluence(getConfig('test'));

exports.getMemebers = function(req, res) {
  const groupName = req.params.groupName;
  confluence.getGroupMembers(groupName, (err, response) => {
    res.json(memberModel.parseMembers(response.results));
  });
};

exports.getGroups = function(req, res) {
  confluence.getGroups((err, response) => {
    res.json(memberModel.parseGroups(response.results));
  });
};

exports.getSpaces = function(req, res) {
  confluence.getSpaces((err, response) => {
    res.json(contentModel.parseSpaces(response.results));
  });
};

exports.getSpace = function(req, res) {
  const spaceKey = req.params.spaceKey;
  confluence.getSpace(spaceKey, (err, response) => {
    res.json(contentModel.parseSpaces(response.results));
  });
};

exports.getSpaceContent = function(req, res) {
  const spaceKey = req.params.spaceKey;
  const expandQuery = ['ancestors'];
  confluence.getSpaceContent(spaceKey, expandQuery, (err, response) => {
    res.json(contentModel.parseSpaceContent(response.results));
  });
};

exports.getPages = function(req, res) {
  const parentPageId = req.params.parentPageId;

  confluence.getPagesFor(parentPageId, (err, response) => {
    res.json(contentModel.parsePages(response.results));
  });
};

exports.getChildPages = function(req, res) {
  const spaceName = req.params.spaceName;
  const parentPageId = req.params.parentPageId;
  const cql = `cql=space.title~"${spaceName}" and type=page and parent=${parentPageId}`

  confluence.search(cql, (err, response) => {
    res.json(contentModel.parsePages(response.results));
  });
};

exports.createPage = function(req, res) {
  console.log(req.body)
  const spaceKey = req.body.spaceKey;
  const parentPageId = req.body.parentPageId;
  const content = contentModel.generateContent();
  const title = req.body.title;

  confluence.postContent(spaceKey, title, content, parentPageId, (err, response) => {
    res.json(contentModel.parsePages(response.results));
  });
};

