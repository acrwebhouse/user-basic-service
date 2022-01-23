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
    // createTime:
    // updateTime:
}

function newUserDoc(){
    const doc = JSON.parse(JSON.stringify(userDoc))
    const date = new Date();
    doc.createTime = date;
    doc.updateTime = date;
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

function editUser(id,account,password,name,gender,roles,rolesInfo,houseIds,phone,address, callback) {
    if (utilsValue.isValid(account) && utilsValue.isValid(id) && id.length == 24){
        const updateData = {
            password,
            name,
            gender,
            roles,
            rolesInfo,
            houseIds,
            phone,
            address,
            updateTime: new Date()
        }
        const searchDoc = {
            '_id': ObjectId(id)
        }
        mongoDB.update(collectionName, searchDoc, updateData, (result,data)=>{
            if(result && data.nModified>0){
                callback(true,data)
            }else{
                callback(false,data)
            }
        });

    }else{
        callback(false, 'id or accout invalid')
    }
    
}

exports.addUser = addUser

exports.editUser = editUser
