var express = require('express');
var passport = require('passport');
var Account = require('../models/account');

var router = express.Router();

function notLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

function loggedIn(req, res, next) {
    if (req.user) {
        res.redirect('/home');
    } else {
        next();
    }
}

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/home');
        });
    });
});

router.get('/login', loggedIn, function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/home');
});

router.get('/home', notLoggedIn, function (req, res) {
    res.render('home', { user : req.user });
});

router.get('/profile', notLoggedIn, function (req, res) {
    res.render('profile', { user : req.user });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
