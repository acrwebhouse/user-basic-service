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
    gender: true,
    roles:[],
    rolesInfo:{},
    houseIds:[],
    phone:'',
    address:'',
    isDelete:false,
}

function newUserDoc(){
    const doc = JSON.parse(JSON.stringify(userDoc))
    return doc;
}

function queryUser(queryInfo,callback){
    mongoDB.queryFindAll(collectionName, queryInfo,(result, msg) => {
        callback(result, msg);
    })
}

function addUser(account,password,name,gender,roles,rolesInfo,houseIds,phone,address,callback) {
    if (utilsValue.isValid(account) && utilsValue.isValid(password)){
        const doc = newUserDoc()
        doc.account = account
        doc.password = password
        doc.address = address
        doc.houseIds = houseIds
        doc.phone = phone
        doc.name = name
        doc.gender = gender
        doc.roles = roles
        doc.rolesInfo = rolesInfo
        console.log(doc)
        mongoDB.insert(collectionName, doc, callback);
    }else {
        callback(false, 'accout or password invalid')
    }
}

function editUser( callback) {
    mongoDB.save(collectionName, userDoc, callback);
}

exports.addUser = addUser

exports.editUser = editUser
