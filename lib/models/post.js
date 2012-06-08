/*============================================================================
 * Copyright(c) 2010 Mario L Gutierrez <mario@mgutz.com>
 * MIT Licensed
 *==========================================================================*/

var _ = require('underscore');
var PostDao = require('./dao').PostDao;

// white list externally updatable fields
var updatableFields = [
  'titleHtml',
  'titleMarkup',
  'contentHtml',
  'contentMarkup',
  'published'
];


/**
 * You first need to create a formatting function to pad numbers to two digits…
 **/
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

/**
 * …and then create the method to output the date string as desired.
 * Some people hate using prototypes this way, but if you are going
 * to apply this to more than one Date object, having it as a prototype
 * makes sense.
 **/
toMysqlDate = function(d) {
  d = d || new Date;

  return d.getUTCFullYear() + "-" + twoDigits(1 + d.getUTCMonth()) + "-" +
    twoDigits(d.getUTCDate()) + " " + twoDigits(d.getUTCHours()) + ":" +
    twoDigits(d.getUTCMinutes()) + ":" + twoDigits(d.getUTCSeconds());
};

/**
 * Finds a post by `id`.
 */
exports.findById = function(id, cb) {
  PostDao.id(id).one(cb);
};


/**
 * add new item
 *
 * @param singlePost
 * @param callback
 */
exports.create = function(obj, cb) {
  var post = _.pick(obj, updatableFields);
  post.published = !!post.published ? 1 : 0;
  //post.created = toMysqlDate();
  //post.created = new Date;
  PostDao.insert(post).exec(cb);
}


/**
 * find all items
 *
 * @param callback
 */
exports.getAll = function(cb) {
  PostDao.select().order('id DESC').all(cb);
}


/**
 * get all published post ids
 *
 * @param callback
 */
exports.getPubPostIds = function(cb) {
  PostDao.where({published: 1}).all(cb);
}


/**
 * update post
 *
 * @param singlePost
 * @param callback
 */
exports.update = function(id, obj, cb) {
  var post = _.pick(obj, updatableFields);
  PostDao.update().set(post).id(id).exec(cb);
}


/**
 * remove a item
 *
 * @param postId
 * @param callback
 */
exports.destroy = function(id, cb) {
  PostDao.delete().where({id: id}).exec(cb);
}


/**
 * get last post by id
 *
 * @param callback
 */
exports.getLast = function(cb) {
  PostDao.order('id DESC').one(cb);
}


/**
 * Publishes a post.
 *
 * @param postId
 */
exports.publish = function(id, cb) {
  PostDao.set({published: 1}).where({id: id}).exec(cb);
}


/**
 * Unpublishes a post.
 *
 * @param postId
 */
exports.unpublish = function(id, cb) {
  PostDao.set({published: 0}).where({id: id}).exec(cb);
};


/**
 * Get all posts grouped as `published` and `drafts`.
 *
 * TODO: page this
 */
exports.getDraftsAndPublished = function(cb) {
  var drafts = [], published = [];

  PostDao.select().order('created desc').all(function(err, rows) {
    if (err) return cb(err);

    var post;
    for (var i = 0, len = rows.length; i < len; i++) {
      post = rows[i];
      if (post.published) published.push(post);
      else drafts.push(post);
    }
    cb(null, {drafts: drafts, published: published});
  });
};


/**
 * Gets published posts.
 */
exports.getPublished = function(page, size, cb) {
  PostDao.select().where({published: 1}).page(page, size).all(cb);
}


/**
 * Gets count of published posts.
 */
exports.getPublishedCount = function(cb) {
  PostDao.select('count(*)').where({published: 1}).scalar(cb);
};
