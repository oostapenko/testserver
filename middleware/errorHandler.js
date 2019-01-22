const http = require('http');
const util = require('util');
const errorhandler = require('errorhandler');
const logger = require('lib/logger')(module);

function sendHttpError(res, error) {
  res.status(error.status);

  //if (res.req.headers['x-requested-with'] === 'XMLHttpRequest') {
  res.json(error);
  // } else {
  //   res.render('error', { error: error });
  // }
};

const HttpError = function(status, message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, HttpError);

  this.status = status;
  this.message = message || http.STATUS_CODES[status] || 'Error';
}
util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';


module.exports.HttpError = HttpError;

/**
 * Error handler
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
const errorHandler = function(err, req, res, next) {
  const ENV = process.env.NODE_ENV;

  if (typeof err == 'number') {
    err = new HttpError(err);
  }

  if (err instanceof HttpError) {
    sendHttpError(res, err);
  } else {
    if (ENV === 'development') {
      errorhandler()(err, req, res, next);
    } else {
      logger.error(err);
      err = new HttpError(500);
      sendHttpError(res, err);
    }
  }
};

module.exports = errorHandler;