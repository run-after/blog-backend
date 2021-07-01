require('dotenv').config();
var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.send('login');
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) { return next(err); };
    if (!user) { return res.send(info); };
    req.logIn(user, {session: false}, function (err) {
      if (err) { return next(err); };
      const token = jwt.sign({ user }, process.env.SECRET_TOKEN);
      return res.json({ user, token });
    });
  })(req, res, next);
});

module.exports = router;
