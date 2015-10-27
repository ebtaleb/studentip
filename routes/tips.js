var mongoose = require('mongoose');
var mongo = require('./mdb_cred');
var shortid = require('shortid');

var TipSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    owner: String,
    content: String,
    creation_date: {type: Date, default: Date.now}
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
            console.log('Success: ' + tip._id + " found");
            res.json(tip);
        }
    });
};

exports.addTip = function(req, res) {
    var tip = req.body;
    Tips.create(tip, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            console.log('Success: ' + result._id + " inserted");
            res.json({ "url" : result._id, "insertion" : "success"});
        }
    });
};

exports.updateTip = function(req, res) {
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
