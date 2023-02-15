require('dotenv').config()
exports.config = {
    'serverIp':process.env.SERVER_IP || '127.0.0.1',
    'serverPort': process.env.SERVER_PORT || 13000,
    'mongoDBUri': process.env.DB_URI || '',
    'swaggerIp':process.env.SWAGGER_IP || '127.0.0.1',
    'mongoDBName': 'ACR',
    'mongoDBCollection': {
        'userCollection': 'user'
    }
}