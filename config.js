/*============================================================================
 * Copyright(c) 2010 Mario L Gutierrez <mario@mgutz.com>
 * MIT Licensed
 *==========================================================================*/

var config = {
  common: {

    admin: {
      user: "admin",
      password: "password"
    },

    postsPerPage: 3,

    express: {
      errorHandlerOptions: {
        dumpExceptions: true,
        showStack: true
      },
      port: 3000
    }
  },

  //// OVERRIDE any settings above as needed by deploy environment

  development: {
  },

  test: {},

  production: {}
};


/**
 * Create APP container.
 */

global.APP = {};
var Settings = require('settings');
global.APP.config = new Settings(config);

var winston = require('winston');
APP.getLogger = function() {
  return winston;
}
