var async = require('async');
var plugins = require('./plugins');
var log = APP.getLogger();

/**
 * Attaches one or more plugins serially to express app.
 *
 * @param {Object} options Must have `app` and `plugins` properties.
 */
exports.attach = function(options, done) {
  var app = options.app;
  var plugins = options.plugins;

  function loadPlugin(plugin, cb) {
    if (plugin.attach.length === 1)  {
      plugin.attach({app: app});
      if (plugin.name) log.info('LOADED plugin', plugin.name);
      cb();
    }
    else {
      plugin.attach({app: app}, function(err) {
        if (err) return cb(err);
        if (plugin.name) log.info('LOADED plugin', plugin.name);
        cb();
      });
    }
  }

  async.forEachSeries(plugins, loadPlugin, function(err) {
    if (err) log.error(err);
    done(err);
  });
};


