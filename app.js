// global APP container
require('./config');

/**
 * Module dependencies.
 */

var express = require('express');
var secure = require('./app/helpers/secure');
var posts = require('./app/controllers/posts');
var admin = require('./app/controllers/admin');
var date = require('./app/helpers/date');
var app = express();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret: '#Thij`YVv2OEz8UcqX'}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


// HTML helpers
app.locals.H = {};
app.locals.H.formatDate = date.formatDate;

app.use(express.errorHandler(APP.config.express.errorHandlerOptions));

// Routes :: controller :: posts

app.get('/', posts.index);
app.get('/page/:count', posts.index);

app.get('/post/single/:id', posts.single);
app.get('/post/preview/:id', secure, posts.preview);
app.get('/post/remove/:id', secure, posts.remove);
app.get('/post/edit/:id', secure, posts.edit);

app.get('/post/create', secure, posts.create);
app.post('/post/create', secure, posts.create);

app.post('/post/save', secure, posts.save);
app.post('/post/update/:id', secure, posts.update);

// Routes :: controller :: admin

app.get('/admin', secure, admin.index);
app.get('/admin/login', admin.login);
app.get('/admin/logout', admin.logout);
app.post('/admin/login', admin.postLoginData);

app.listen(APP.config.express.port);
console.log("Express server listening on port %d in %s mode", APP.config.express.port,
  process.env.NODE_ENV);
