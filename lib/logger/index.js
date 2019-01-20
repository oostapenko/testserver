const winston = require('winston');
const path = require('path');
const fs = require('fs');
const config = require('config');

module.exports = function(module) {
  const _path = path.basename(module.filename);
  let transports;
  const formatter = function(opt) {
    const options = [
      new Date().toLocaleString(),
      opt.level.toUpperCase(),
      opt.message
    ];

    return options.join(' : ');
  };

  if (process.env.NODE_ENV == 'development') {
    if (!fs.existsSync(config.get('logger:file:info'))) {
      const file = fs.openSync(config.get('logger:file:info'), 'w');
      fs.closeSync(file);
    }
    transports = [
      new winston.transports.Console({
        colorize: true,
        level: 'debug',
        label: _path,
      }),
      new winston.transports.File({
        filename: config.get('logger:file:info'),
        level: 'info',
        format: winston.format.json(),
      }),
      new winston.transports.File({
        filename: config.get('logger:file:error'),
        level: 'error',
        format: winston.format.json(),
      }),
    ];
  } else {
    if (!fs.existsSync(config.get('logger:file:debug'))) {
      var file = fs.openSync(config.get('logger:file:debug'), 'w');
      fs.closeSync(file);
    }
    transports = [
      new winston.transports.File({
        filename: config.get('logger:file:debug'),
        level: 'error',
        format: winston.format.json(),
      }),
    ];
  }

  return winston.createLogger({
    transports: transports,
  });
};

