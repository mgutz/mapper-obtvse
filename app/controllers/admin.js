/*============================================================================
 * Copyright(c) 2010 Mario L Gutierrez <mario@mgutz.com>
 * MIT Licensed
 *==========================================================================*/

var Post = require('../models/post');


/**
 * GET login page
 */
exports.index = function(req, res, next) {
  Post.getDraftsAndPublished(function(err, posts) {
    if (err) return next(err);

    res.render('admin-backend', {
      drafts: posts.drafts,
      publish: posts.published,
    })
  })
}


/**
 * GET login form
 */
exports.login = function(req, res) {
  res.render('admin-login', {
  });
}


/**
 * GET logout page and redirect
 */
exports.logout = function(req, res) {
  req.logout();
  res.redirect('/admin');
}


/**
 * POST login
 */
exports.postLoginData = function(req, res) {
  var user = APP.config.admin.user;
  var password = APP.config.admin.password;

  if (req.param('username') === user && req.param('password') === password) {
    req.login();
    res.redirect('/admin');
  }
  else {
    res.render('admin-login', {
      error: 'Bad login',
    });
  }
};
