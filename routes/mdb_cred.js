var mongo;

if (process.env.VCAP_SERVICES) {
    var env = JSON.parse(process.env.VCAP_SERVICES);
    if (env['mongolab']) {
        mongo = env['mongolab'][0]['credentials'];
    }
} else {
    mongo = {
        "username" : "user1",
        "password" : "secret",
        "uri" : "mongodb://localhost:27017/test"
    }
}

module.exports = mongo;
