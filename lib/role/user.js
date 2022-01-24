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

function queryUsers(queryInfo,callback){
    mongoDB.queryFindAll(collectionName, queryInfo,(result, msg) => {
        callback(result, msg);
    })
}

function getUserList(queryInfo,skip,limit,sort,callback){
    const maxLimit = 300
    queryInfo.roles = {"$all":queryInfo.roles}
    if (!utilsValue.isNumber(skip)){
        skip = 0;
    }
    if (!utilsValue.isNumber(limit) || limit>maxLimit){
        console.log(11111)
        limit = maxLimit;
    }
    if (!utilsValue.isValid(sort)){
        sort = {updateTime:-1}
    }
    mongoDB.queryFindAll(collectionName, queryInfo , skip, limit, sort ,(result, msg) => {
        callback(result, msg);
    })
}

function getUserById(id,isDelete,callback){
    if(isDelete == 'true'){
        isDelete = true
    }else{
        isDelete = false
    }
    if(id.length == 24){
        const doc = {
            '_id': ObjectId(id),
            'isDelete' : isDelete
        }
        mongoDB.queryFindOne(collectionName, doc, callback)
    }else{
        callback(false, 'id invalid')
    }
}

function getUserByAccount(account,password,isDelete,callback){
    if(isDelete == 'true'){
        isDelete = true
    }else{
        isDelete = false
    }
    if(utilsValue.isValid(account) && utilsValue.isValid(password)){
        const doc = {
            'account': account,
            'password': password,
            'isDelete' : isDelete
        }
        mongoDB.queryFindOne(collectionName, doc, callback)
    }else{
        callback(false, 'id invalid')
    }
}

function addUser(account,password,name,gender,roles,rolesInfo,houseIds,phone,address,callback) {
    if (utilsValue.isValid(account) && utilsValue.isValid(password)){
        const doc = newUserDoc()
        doc.account = account
        doc.password = ''+password
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

function removeUser(ids,callback){
    let isValid = true;
    for(let i = 0;i<ids.length;i++){
        if(ids[i].length!=24){
            isValid = false;
        }
    }
    if(isValid == true){
        const objectIds = []
        for(let i = 0 ;i<ids.length;i++ ){
            objectIds.push(ObjectId(ids[i]))
        }
        const searchDoc = {
            '_id': {$in : objectIds}
        }
        const updateData = {
            isDelete:true,
            updateTime: new Date()
        }
        mongoDB.updateMany(collectionName, searchDoc, updateData, (result,data)=>{
            if(result && data.nModified>0){
                callback(true,data)
            }else{
                callback(false,data)
            }
        });
    }else{
        callback(false, 'ids is invalid')
    }
}

exports.addUser = addUser
exports.editUser = editUser
exports.removeUser = removeUser
exports.getUserById = getUserById
exports.getUserByAccount = getUserByAccount
exports.getUserList = getUserList