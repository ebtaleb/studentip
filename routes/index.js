var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var http = require('http');

var router = express.Router();

function notLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

function loggedIn(req, res, next) {
    if (req.user) {
        //res.redirect('/home');
        res.redirect('/');
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
            res.redirect('/');
        });
    });
});

router.get('/login', loggedIn, function(req, res) {
    res.render('/', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    // res.redirect('/home');
    res.redirect('/');
});

router.get('/home', notLoggedIn, function (req, res) {
    // res.render('home', { user : req.user });
    res.redirect('/', { user : req.user });
});

router.get('/profile', notLoggedIn, function (req, res) {
    res.render('profile', { user : req.user });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/:id', function (req, res) {
    http.get("http://" + req.headers.host + "/api/tips/" + req.params.id, function(output) {
        console.log("Got response: " + output.statusCode);
        str = "";
        output.on('data', function (chunk) {
            str += chunk;
        });

        output.on('end', function () {
            ok = JSON.parse(str);
            res.render('tip', { user : req.user, tip : ok });
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
});

module.exports = router;
