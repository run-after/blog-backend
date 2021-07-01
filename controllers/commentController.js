const Comment = require('../models/Comment');
const { body, validationResult } = require('express-validator');

// GET /posts/:postId/comments
module.exports.comment_list = (req, res, next) => {
  Comment.find({ post: req.params.postId }).sort([['updatedAt', 'ascending']]).exec((err, comments) => {
    if (err) { return res.send('Post not found'); };
    return res.json(comments);
  });
};

// PUT /posts/:postId/comments
module.exports.create_new_comment = [
  
  body('body', 'You cannot leave comment blank').trim().isLength({ min: 1 }).escape(),
  body('author', "You must enter a name").trim().isLength({min: 1}).escape(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    
    const comment = new Comment({
      body: req.body.body,
      author: req.body.author,
      post: req.params.postId
    });

    comment.save((err) => {
      if (err) {
        if (!errors.isEmpty()) {
          return res.json(errors);
        };
      } else {
        return res.json(comment);
      };
    });
  }
];

// MIGHT NOT NEED THIS
//GET /posts/:postId/comments/:commentId
module.exports.view_comment = (req, res, next) => {
  Comment.findById(req.params.commentId).exec((err, comment) => {
    if (err) { return res.send('Comment not found'); };
    return res.json(comment);
  });
};

// PUT /posts/:postId/commments/:commentId
module.exports.update_comment = (req, res, next) => {
  //MIGHT WANT TO SANITZIE/VALIDATE INPUT
  Comment.findById(req.params.commentId).exec((err, comment) => {
    if (err) { return res.send('Comment not found'); };
    comment.body = req.body.body || comment.body;
    comment.save((err) => {
      if (err) { return res.send(err.message); };
      return res.json(comment);
    });
  });
};

// DELETE /posts/:postId/comments/:commentId
module.exports.delete_comment = (req, res, next) => {
  Comment.findByIdAndDelete(req.params.commentId).exec((err, comment) => {
    if (err) { return res.send('Comment not found') }
    return res.send(`Deleted comment ${comment._id}`);
  });
};