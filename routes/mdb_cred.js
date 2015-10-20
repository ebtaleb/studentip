var mongo;

if (process.env.VCAP_SERVICES) {
    var env = JSON.parse(process.env.VCAP_SERVICES);
    if (env['mongodb-2.4']) {
        mongo = env['mongodb-2.4'][0]['credentials'];
    }
} else {
    mongo = {
        "username" : "user1",
        "password" : "secret",
        "url" : "mongodb://localhost:27017/test"
    }
}

module.exports = mongo;
