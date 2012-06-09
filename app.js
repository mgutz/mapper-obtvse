
/**
 * Module dependencies.
 */

// Loads config file into global.APP
require('./config');

var express = require('express');
var app = express();
var Routes = require('./app/routes');
var Helpers = require('./app/helpers');
var Plugins = require('./app/plugins');
var plugins = [
  new Routes,
  new Helpers
];


app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '#Thij`YVv2OEz8UcqX'}));
app.use(app.router);

Plugins.attach({app: app, plugins: plugins}, function(err) {
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler(APP.config.express.errorHandlerOptions));
  app.listen(APP.config.express.port);
  console.log("Express server listening on port %d in %s mode",
    APP.config.express.port,
    APP.config.ENV
  );
});

