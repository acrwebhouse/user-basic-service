const mongoDB = require('../db/mongoDB');
const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const path = require('path');
const collectionName = config.mongoDBCollection.userCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 
const userDoc = {
    account:'',
    password:'',
    name:'',
    roles:[],
    rolesInfo:{},
    phone:'',
    address:'',
    isDelete:'',
}
exports.editUser = function( callback) {
        mongoDB.save(collectionName, userDoc, callback);
}
