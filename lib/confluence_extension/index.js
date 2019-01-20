const request = require('superagent');
const Confluence = require('confluence-api');
const fs = require('fs');

function processCallback(cb, err, res) {
  if (err || !res || !res.body) {
    cb(err, res);
  } else {
    cb(err, res.body);
  }
}

/**
 * Get list of spaces
 *
 * @param callback
 */
Confluence.prototype.getSpaces = function(callback) {
  request
    .get(`${this.config.baseUrl}${this.config.apiPath}/space${this.config.extension}`)
    .auth(this.config.username, this.config.password)
    .end(function(err, res) {
      processCallback(callback, err, res);
    });
};

/**
 * Get space information.
 *
 * @param {string} spaceKey
 * @param {Function} callback
 */
Confluence.prototype.getSpaceContent = function(spaceKey, expandables, callback) {
  let cb;
  let expandQuery;

  if (typeof expandables === 'function') {
    cb = expandables;
    expandQuery = '';
  } else {
    cb = callback;
    expandQuery = `&expand=${expandables.join()}`;
  }

  request
    .get(`${this.config.baseUrl}${this.config.apiPath}/content${this.config.extension}?spaceKey=${spaceKey}${expandQuery}`)
    .auth(this.config.username, this.config.password)
    .end(function(err, res){
      processCallback(cb, err, res);
    });
};

/**
 * Get list of groups
 *
 * @param callback
 */
Confluence.prototype.getGroups = function(callback) {
  request
    .get(`${this.config.baseUrl}${this.config.apiPath}/group${this.config.extension}`)
    .auth(this.config.username, this.config.password)
    .end(function(err, res) {
      processCallback(callback, err, res);
    });
};

/**
 * Get group members by group's name
 *
 * @param name Group name
 * @param callback
 */
Confluence.prototype.getGroupMembers = function(name, callback) {
  request
    .get(`${this.config.baseUrl}${this.config.apiPath}/group/${name}/member${this.config.extension}`)
    .auth(this.config.username, this.config.password)
    .end(function(err, res) {
      processCallback(callback, err, res);
    });
};


/**
 * Get stored content for a specific space and page title.
 *
 * @param {string} id
 * @param {Function} callback
 */
Confluence.prototype.getPagesFor = function(parentId, callback){
  request
    .get(`${this.config.baseUrl}${this.config.apiPath}/content/${parentId}/child/page${this.config.extension}?expand=body.storage,version`)
    .auth(this.config.username, this.config.password)
    .end(function(err, res){
      processCallback(callback, err, res);
    });
};

module.exports = Confluence;