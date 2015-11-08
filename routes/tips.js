var mongoose = require('mongoose');
var mongo = require('./mdb_cred');
var shortid = require('shortid');

var CommentSchema = new mongoose.Schema({
    content : String,
    owner: String,
    creation_date: {type: Date, default: Date.now}
});

var TipSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    owner: String,
    content: String,
    creation_date: {type: Date, default: Date.now},
    comments: [CommentSchema]
});

var Tips = mongoose.model('Tips', TipSchema);

exports.findAll = function (req, res) {
    Tips.find(function (err, tips) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            res.json(tips);
        }
    });
};

exports.findById = function (req, res) {
    Tips.findOne({ _id: req.params.id}, function (err, tip) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            //console.log('Success: ' + tip._id + " found");
            res.json(tip);
        }
    });
};

exports.addTip = function(req, res) {
    var hostname = req.headers.host;
    var tip = req.body;
    Tips.create(tip, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            console.log('Success: ' + result._id + " inserted");
            res.json({ "url" : "http://"+hostname+"/"+result._id, "insertion" : "success"});
        }
    });
};

exports.addComment = function(req, res) {
    console.log(req.body);
    Tips.findOneAndUpdate({ _id: req.params.id }, { $push : {"comments" : req.body} }, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            newcom = result.comments[result.comments.length - 1];
            res.json({"url" : result._id, "comment_update" : "success", "com" : {"owner" : newcom.owner, "content" : newcom.content, "date" : newcom.creation_date, "tip_id" : result._id}});
        }
    });
};

exports.updateTip = function(req, res) {
    Tips.update({_id: req.params.id}, {content : req.body.content}, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            console.log('Success: ' + result._id + " updated");
            res.json({"url" : result._id, "update" : "success"});
        }
    });
};

exports.deleteTip = function(req, res) {
    var tip = req.body;
    Tips.findByIdAndRemove({'_id':req.params.id}, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            console.log('Success: ' + result._id + " deleted");
            res.json({"deletion" : "success"});
        }
    });
};
