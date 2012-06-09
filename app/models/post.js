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
 * Finds a post by `id`.
 */
exports.findById = function(id, cb) {
  PostDao.where({id: id, deleted: 0}).one(cb);
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
  post.deleted = 0;
  PostDao.insert(post).exec(cb);
}


/**
 * find all items
 *
 * @param callback
 */
exports.getAll = function(cb) {
  PostDao
  .select()
  .order('id DESC')
  .where({deleted: 0})
  .all(cb);
}


/**
 * update post
 *
 * @param singlePost
 * @param callback
 */
exports.update = function(id, obj, cb) {
  var post = _.pick(obj, updatableFields);
  PostDao.update().set(post).where({id: id}).exec(cb);
}


/**
 * remove a item
 *
 * @param postId
 * @param callback
 */
exports.destroy = function(id, cb) {
  // soft delete
  PostDao.update().set({deleted: 1}).where({id: id}).exec(cb);
}


/**
 * Get all posts grouped as `published` and `drafts`.
 *
 * TODO: page this
 */
exports.getDraftsAndPublished = function(cb) {
  var drafts = [], published = [];

  PostDao
  .select()
  .order('created desc')
  .where({deleted: 0})
  .all(function(err, rows) {
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
 *
 * @param {Int} page Zero-based page to retrieve.
 * @param {Int} size Number of posts in a page.
 */
exports.getPublished = function(page, size, cb) {
  PostDao
  .select()
  .where({published: 1, deleted: 0})
  .order('created desc')
  .page(page, size)
  .all(cb);
}


/**
 * Gets count of published posts.
 */
exports.getPublishedCount = function(cb) {
  PostDao.select('count(*)').where({published: 1, deleted: 0}).scalar(cb);
};
