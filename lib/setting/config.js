var path = require('path');
exports.config = {
    'serverPort': 3000,
    'mongoDBPort': 27017,
    'mongoDBName': 'ACR',
    'mongoDBCollection': {
        'userCollection': 'user'
    }
}