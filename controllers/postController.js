const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// GET /posts
module.exports.post_list = (req, res, next) => {
  Post.find().sort([['updatedAt', 'ascending']]).populate('author', 'username').exec((err, posts) => {
    if (err) { return next(err); };
    // replace author object with username
    const updatedPost = posts.map((post) => {
      return {
        ...post._doc,
        author: post.author.username
      };
    });
    return res.json(updatedPost);
  });
  // Will need to get associated comments
};

// POST /posts
module.exports.create_new_post = [

  body('title', 'Must include a title').trim().isLength({ min: 1 }).escape(),
  body('title', 'Title must not exceed 25 chars').trim().isLength({max: 25}).escape(),
  body('body', 'Must include a body to your post').trim().isLength({ min: 1 }).escape(),
  
  (req, res, next) => {

    const errors = validationResult(req);

    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      author: req.user,
      published: req.body.published
    });

    post.save((err) => {
      if (err) {
        let errorMsg = 'The following problem(s) have occured:';
        if (!errors.isEmpty()) {
          errors.array().forEach((error) => {
            errorMsg += ` -${error.msg}`;
          });
        }
        return res.status(400).json({"message": errors});
      } else {
        return res.json(post);
      };
    });
  }
];

// GET /posts/:postId
module.exports.view_post = (req, res, next) => {
  Post.findById(req.params.postId).exec((err, post) => {
    if (err) { return res.send('Post not found'); };
    return res.json(post);
  });
};

// PUT /posts/:postId
module.exports.update_post = [

  body('title', 'Must include a title').trim().isLength({ min: 1 }).escape(),
  body('title', 'Title must not exceed 25 chars').trim().isLength({max: 25}).escape(),
  body('body', 'Must include a body to your post').trim().isLength({ min: 1 }).escape(),
  
  (req, res, next) => {

    const errors = validationResult(req);

    Post.findById(req.params.postId).exec((err, post) => {
      if (err) { return res.send('Post not found'); };
      post.title = req.body.title || post.title;
      post.body = req.body.body || post.body;
      post.published = req.body.published;

      if (!errors.isEmpty()) {
        return res.status(400).json({ "message": errors });
      } else {
        post.save((err) => {
          console.log(err)
          return res.json(post);
        });
      };
    });
  }
];

// DELETE /posts/:postId
module.exports.delete_post = (req, res, next) => {
  
  Post.findByIdAndDelete(req.params.postId).exec((err, post) => {
    if (err) { return res.send('Post not found') }
    Comment.find({ post: post }).exec((err, comment_list) => {
      comment_list.forEach((comment) => {
        Comment.findByIdAndDelete(comment._id).exec((err, comment) => {
          if (err) { return next(err); };
        });
      });
    });
    return res.send(`Deleted post ${post._id} and all affiliated comments`);
  });
};