var express = require('express');
var router = express.Router();
const userModel = require('./users');
const passport = require('passport');
const upload = require('./multer');
const postModel = require('../models/post');
const fs = require('fs/promises');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile', isLoggedIn, async function(req, res, next) {
  try {
    const user = await userModel.findById(req.user._id).populate({
      path: 'posts',
      options: { sort: { createdAt: -1 } },
    });
    res.render('profile', { user, activePage: 'profile' });
  } catch (err) {
    next(err);
  }
});

router.get('/login', function(req, res, next) {
  res.render('login', {error: req.flash('error')});
});

router.get('/feed', isLoggedIn, async function(req, res, next) {
  try {
    const user = await userModel.findById(req.user._id).populate({
      path: 'posts',
      options: { sort: { createdAt: -1 } },
    });
    res.render('feed', { user, activePage: 'feed' });
  } catch (err) {
    next(err);
  }
});

router.get('/create', isLoggedIn, async function(req, res, next) {
  try {
    const user = await userModel.findById(req.user._id).populate({
      path: 'posts',
      options: { sort: { createdAt: -1 } },
    });
    res.render('create', { user, activePage: 'create' });
  } catch (err) {
    next(err);
  }
});

router.get('/explore', isLoggedIn, function(req, res) {
  res.render('explore', { activePage: 'explore' });
});

router.post('/upload', isLoggedIn, upload.single('file'), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('Please choose an image to upload.');
  }

  let post;
  try {
    post = await postModel.create({
      imageUrl: `/images/uploads/${req.file.filename}`,
      owner: req.user._id,
    });
    await userModel.findByIdAndUpdate(req.user._id, {
      $addToSet: { posts: post._id },
    });
    res.redirect('/create');
  } catch (err) {
    if (post) await postModel.deleteOne({ _id: post._id }).catch(() => {});
    await fs.unlink(req.file.path).catch(() => {});
    next(err);
  }
});

router.post('/register', async function(req, res, next) {
  const userData = new userModel({
    username: req.body.username,
    email: req.body.email,
  });
  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/profile")
    })
  })
});

router.post("/login", passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
}), function(req, res){
});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.session.returnTo = req.originalUrl;
  res.redirect('/login');
}

module.exports = router;
