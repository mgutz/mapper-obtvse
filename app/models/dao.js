var Mapper = require('mapper');
var config = require('../../migrations/config');

// connect based on environment
Mapper.connect(config[APP.config.ENV].mysql, {verbose: true});

Post = Mapper.map('Posts');
Comment = Mapper.map('Comments');
User = Mapper.map('Users');
Post.hasMany('comments', Comment);
User.hasMany('posts', Post);


module.exports = {
  CommentDao: Comment,
  PostDao: Post,
  UserDao: User
};
