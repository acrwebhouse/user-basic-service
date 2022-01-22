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
    console.log('===addUser===account==')
    console.log(account)
    console.log('===addUser===password==')
    console.log(password)
    console.log('===addUser===name==')
    console.log(name)
    console.log('===addUser===gender==')
    console.log(gender)
    console.log('===addUser===roles==')
    console.log(roles)
    console.log('===addUser===rolesInfo==')
    console.log(rolesInfo)
    console.log('===addUser===houseIds==')
    console.log(houseIds)
    console.log('===addUser===phone==')
    console.log(phone)
    console.log('===addUser===address==')
    console.log(address)
    
    if (utilsValue.isValid(account) && utilsValue.isValid(password)){
        const queryInfo = {
            account
        }
        const userList = queryUser(queryInfo,(result, msg)=>{
            console.log('===queryUser==result=')
            console.log(result)
            console.log('===queryUser==msg=')
            console.log(msg)
            if(result == false){
                callback(false, 'mongodb query error')
            }else{
                if(msg.length>0){
                    callback(false, 'account is ')
                }
            }
        });
        callback(true, 'accout or password invalid')
    }else {
        callback(false, 'accout or password invalid')
    }
    // mongoDB.save(collectionName, userDoc, callback);
}

function editUser( callback) {
    mongoDB.save(collectionName, userDoc, callback);
}

exports.addUser = addUser

exports.editUser = editUser
