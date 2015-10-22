var mongodb = require('mongodb');
var mongo = require('./mdb_cred');

var mdb_client = mongodb.MongoClient;
var BSON = mongodb.BSONPure;

mdb_client.connect (mongo.url, function(err, db) {
    if(!err) {
        console.log("We are connected to DB");
    }
    else {
        console.dir(err);
    }

    db.open(function(err, db) {
        if(!err) {
            console.log("Connected to 'tipdb' database");
            db.collection('tips', {strict:true}, function(err, collection) {
                if (err) {
                    console.log("The 'tips' collection doesn't exist. Creating it with sample data...");
                    populateDB();
                }
            });
        }
    });
});


exports.findById = function(req, res) {
    mdb_client.connect (mongo.url, function(err, db)   {
        if(!err) {
            console.log("We are connected to DB");
        }
        else {
            console.dir(err);
        }

        var id = req.params.id;
        console.log('Retrieving tip: ' + id);
        db.collection('tips', function(err, collection) {
            collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
                res.send(item);
            });
        });
    });
};

exports.findAll = function(req, res) {

    mdb_client.connect (mongo.url, function(err, db)   {
        if(!err) {
            console.log("We are connected to DB");
        }
        else {
            console.dir(err);
        }

        db.collection('tips', function(err, collection) {
            collection.find().toArray(function(err, items) {
                res.send(items);
            });
        });
    });
};

exports.addTip = function(req, res) {

    mdb_client.connect (mongo.url, function(err, db)   {
        if(!err) {
            console.log("We are connected to DB");
        }
        else {
            console.dir(err);
        }

        var wine = req.body;
        console.log('Adding tip: ' + JSON.stringify(wine));
        db.collection('tips', function(err, collection) {
            collection.insert(wine, {safe:true}, function(err, result) {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    console.log('Success: ' + JSON.stringify(result[0]));
                    res.send(result[0]);
                }
            });
        });
    });
}

exports.updateTip = function(req, res) {

    mdb_client.connect (mongo.url, function(err, db)   {
        if(!err) {
            console.log("We are connected to DB");
        }
        else {
            console.dir(err);
        }

        var id = req.params.id;
        var tip = req.body;
        console.log('Updating tip: ' + id);
        console.log(JSON.stringify(tip));
        db.collection('tips', function(err, collection) {
            collection.update({'_id':new BSON.ObjectID(id)}, tip, {safe:true}, function(err, result) {
                if (err) {
                    console.log('Error updating tip: ' + err);
                    res.send({'error':'An error has occurred'});
                } else {
                    console.log('' + result + ' document(s) updated');
                    res.send(tip);
                }
            });
        });
    });
}

exports.deleteTip = function(req, res) {

    mdb_client.connect (mongo.url, function(err, db)   {
        if(!err) {
            console.log("We are connected to DB");
        }
        else {
            console.dir(err);
        }

        var id = req.params.id;
        console.log('Deleting tip: ' + id);
        db.collection('tips', function(err, collection) {
            collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
                if (err) {
                    res.send({'error':'An error has occurred - ' + err});
                } else {
                    console.log('' + result + ' document(s) deleted');
                    res.send(req.body);
                }
            });
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var tips = [
    {
        content: "CHATEAU DE SAINT COSME",
        user: "2009"
    },
    {
        content: "LAN RIOJA CRIANZA",
        user: "2006"
    }];

    mdb_client.connect (mongo.url, function(err, db)   {
        if(!err) {
            console.log("We are connected to DB");
        }
        else {
            console.dir(err);
        }

        db.collection('tips', function(err, collection) {
            collection.insert(tips, {safe:true}, function(err, result) {});
        });
    });
};
