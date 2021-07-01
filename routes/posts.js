var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const passport = require('passport');

router.get('/', postController.post_list);

router.post('/', passport.authenticate('jwt', {session:false}), postController.create_new_post); // Protect

router.get('/:postId', passport.authenticate('jwt', {session:false}), postController.view_post); // Protect (maybe not needed)

router.put('/:postId', passport.authenticate('jwt', {session:false}), postController.update_post); // Protect

router.delete('/:postId', passport.authenticate('jwt', {session:false}), postController.delete_post); //Protect

router.get('/:postId/comments', commentController.comment_list);

router.post('/:postId/comments', commentController.create_new_comment);

router.get('/:postId/comments/:commentId', commentController.view_comment); // maybe not needed

router.put('/:postId/comments/:commentId', passport.authenticate('jwt', {session:false}), commentController.update_comment); // Protect(maybe not needed)

router.delete('/:postId/comments/:commentId', passport.authenticate('jwt', {session:false}), commentController.delete_comment); // Protect

module.exports = router;
