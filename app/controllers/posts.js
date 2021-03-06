/*============================================================================
 * Copyright(c) 2010 Mario L Gutierrez <mario@mgutz.com>
 * MIT Licensed
 *==========================================================================*/

var Post = require('../models/post');
var date = require('../helpers/date');
var marked = require('marked');


/**
 * source: https://github.com/chjj/marked
 */
marked.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: true
});


/**
 * GET home page.
 */
exports.index = function(req, res, next) {

  Post.getPublishedCount(function(err, articleCount) {
    if (err) return next(err);

    var page = parseInt(req.param('num')) || 0;
    var pageSize = parseInt(APP.config.postsPerPage);
    var pagingLeft = page > 0;
    var pagingRight = (page + 1) * pageSize < articleCount;

    function render(err, posts) {
      if (err) return next(err);

      res.render('post-index', {
        posts: posts,
        isAuth: req.session.authenthicated,
        paging: {
          l: pagingLeft,
          r: pagingRight
        },
        page: {
          next: page + 1,
          prev: page - 1
        },
        date: date.formatDate()
      });
    }

    // paging
    if (page * pageSize <= articleCount) {
      Post.getPublished(page, pageSize, render);
    }
    else {
      render(null, []);
    }
  });
}



/**
 * GET post page
 */
exports.single = function(req, res, next) {
  Post.findById(req.param('id'), function(err, post) {
    if (err) return next(err);

    if (post) {
      res.render('post-single', {
        post: post,
        isAuth: req.session.authenticated,
      });
    }
    else {
      res.redirect('/');
    }
  });
}


/**
 * GET preview of a page
 */
exports.preview = function(req, res, next) {
  Post.findById(req.param('id'), function(err, post) {
    if (err) return next(err);

    res.render('post-single', {
      post: post,
      isAuth: true,
      layout: 'post-layout'
    })
  })
}


/**
 * remove post
 */
this.remove = function(req, res, next) {
  Post.destroy(req.param('id'), function(err) {
    if(err) return next(err);

    res.redirect('back');
  })
}


/**
 * GET form to create new post
 */
this.create = function(req, res, next) {
  res.render('post-create', {
    title: req.param('title') || ''
  });
}


/**
 * GET form to create new post
 */
this.edit = function(req, res, next) {
  Post.findById(req.param('id'), function(err, post) {
    res.render('post-edit', {
      post: post
    })
  });
}


/**
 * POST update to a psot
 */
exports.update = function(req, res, next) {
  var id = req.param('id');
  var isDraft = req.param('draft') === 'on';

  Post.update(id, {
    titleMarkup: req.param('title'),
    titleHtml: marked(req.param('title')),
    contentMarkup: req.param('markup'),
    contentHtml: marked(req.param('markup')),
    published: isDraft ? 0 : 1
  }, function(err, post) {
    if (err) return next(err);

    if (isDraft) res.redirect('/post/preview/' + id);
    else res.redirect('/post/single/' + id);
  });
};



/**
 * POST new
 */
exports.save = function(req, res, next) {
  var isDraft = req.param('draft') === 'on';

  Post.create({
    titleMarkup: req.param('title'),
    titleHtml: marked(req.param('title')),
    contentMarkup: req.param('markup'),
    contentHtml: marked(req.param('markup')),
    published: isDraft ? 0 : 1
  }, function(err, created) {
    if (err) return next(err);

    var id = created.insertId;
    if (isDraft) res.redirect('/post/preview/' + id);
    else res.redirect('/post/single/' + id);
  });
};
