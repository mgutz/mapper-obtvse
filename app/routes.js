var admin = require('./controllers/admin');
var posts = require('./controllers/posts');
var secure = require('./helpers/secure');


function Routes() {
  this.name = 'Routes';

  this.attach = function(options) {
    var app = options.app;
    app.use(app.router);

    app.get('/', posts.index);
    app.get('/page/:num', posts.index);

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
  };

}

module.exports = Routes;
