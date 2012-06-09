var Mapper = require('mapper');
var config = require('../../migrations/config');

// connect based on environment
Mapper.connect(config[APP.config.ENV].mysql, {verbose: true});

module.exports = {
  PostDao: Mapper.map('Posts')
};


