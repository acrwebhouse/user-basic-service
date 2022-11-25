exports.on = function(app) {
    const preRestApi = '/user';
    const user = require('../role/user');
    const utilsValue = require('../utils/value');
    app.post(preRestApi + '/addUser', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a user',
            schema: {
                account: 'a123456789',
                password: '123456',
                name: 'Chris',
                gender: true,
                roles: [1,2,3,4],
                rolesInfo: {
                    admin:{},
                    host:{},
                    user:{},
                    sales:{
                        scope:[
                            {
                                "city":"台北市",
                                "area":"大安區"
                            },
                            {
                                "city":"花蓮市",
                                "area":"測試區"
                            },
                            {
                                "city":"台北市",
                                "area":"文山區"
                            }
                        ]
                    },
                },
                houseIds:[],
                phone: '0909666666',
                mail: 'acr.webhouse@gmail.com',
                lineId:'s_213456789',
                address: '台北市文山區興隆路六段66號6樓',
                bornDate : '2022/05/11'
            }
        }*/ 
        const account = req.body.account
        const password = req.body.password
        const name = req.body.name
        const gender = req.body.gender
        const roles = req.body.roles
        const rolesInfo = req.body.rolesInfo
        const houseIds = req.body.houseIds
        const phone = req.body.phone
        const address = req.body.address
        const mail = req.body.mail
        const lineId = req.body.lineId
        const bornDate = req.body.bornDate
        const response = {
            'status':true,
            'data':''
        }
        user.addUser(account,password,name,gender,roles,rolesInfo,houseIds,phone,address,mail,lineId,bornDate,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.put(preRestApi + '/editUser', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit a user',
            schema: {
                id: '61ed2777f5178ce385654350',
                account: 'a123456789',
                password: 123456,
                name: 'Chris',
                gender: true,
                roles: [1,2,3,4],
                rolesInfo: {
                    admin:{},
                    host:{},
                    user:{},
                    sales:{},
                },
                houseIds:[],
                companyId: '61ed2777f5178ce385654350',
                phone: '0909666666',
                mail: 'acr.webhouse@gmail.com',
                lineId:'s_213456789',
                address: '台北市文山區興隆路六段66號6樓',
                bornDate : '2022/05/11',
                verify : false
            }
        }*/ 
        const id = req.body.id
        const account = req.body.account
        const password = req.body.password
        const name = req.body.name
        const gender = req.body.gender
        const roles = req.body.roles
        const rolesInfo = req.body.rolesInfo
        const houseIds = req.body.houseIds
        const phone = req.body.phone
        const address = req.body.address
        const companyId = req.body.companyId
        const mail = req.body.mail
        const lineId = req.body.lineId
        const bornDate = req.body.bornDate
        const verify = req.body.verify
        const response = {
            'status':true,
            'data':''
        }
        user.editUser(id,account,password,name,gender,roles,rolesInfo,houseIds,phone,address,mail,lineId,bornDate,companyId,verify,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.delete(preRestApi + '/removeUser', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Remove a user',
            schema: {
                ids: ['61ed2777f5178ce385654350','61ed2777f5178ce385654353']
            }
        }*/ 
        const ids = req.body.ids
        const response = {
            'status':true,
            'data':''
        }
        console.log('====removeUsers====id==',ids)
        user.removeUser(ids,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.get(preRestApi + '/getUsers', function(req, res) {
        /*
        #swagger.parameters['isDelete'] = {
            in: 'query',
            type: 'boolean',
        }
        #swagger.parameters['sort'] = {
            in: 'query',
            type: 'string',
            schema: '{\"updateTime\":1}'
        }
        #swagger.parameters['salesInfo'] = {
            in: 'query',
            type: 'string',
            schema: "{\"city\":\"台北市\",\"area\":\"文山區\"}"
        }
        */ 
        let isDelete = req.query.isDelete
        let skip = req.query.skip
        let limit = req.query.limit
        let salesInfo = req.query.salesInfo
        const name = req.query.name
        skip = skip*1;
        limit = limit*1
        if(isDelete == 'true'){
            isDelete = true
        }else{
            isDelete = false
        }
        const queryInfo = {
            isDelete
        }
        let sort;
        let roles;
        try{
            sort = JSON.parse(req.query.sort)
        }catch(e){
            sort = {}
        }
        try{
            salesInfo = JSON.parse(req.query.salesInfo)
            if(utilsValue.isValid(salesInfo.city)){
                queryInfo['rolesInfo.sales.scope.city'] = salesInfo.city
            }
            if(utilsValue.isValid(salesInfo.area)){
                queryInfo['rolesInfo.sales.scope.area'] = salesInfo.area
            }
        }catch(e){
            salesInfo = {}
        }
        try{
            roles = JSON.parse(req.query.roles)
            queryInfo.roles = roles
        }catch(e){
            roles = []
        }

        if(utilsValue.isValid(name)){
            queryInfo.name =new RegExp(name);
        }

        const response = {
            'status':true,
            'data':''
        }

        user.getUserList(queryInfo,skip,limit,sort,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        }) 
    });

    app.get(preRestApi + '/getUserById', function(req, res) {
        /*#swagger.parameters['isDelete'] = {
            in: 'query',
            type: 'boolean',
        }*/ 
        const id = req.query.id
        const isDelete = req.query.isDelete
        const response = {
            'status':true,
            'data':''
        }
        user.getUserById(id,isDelete,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.get(preRestApi + '/getUser', function(req, res) {
        /*#swagger.parameters['isDelete'] = {
            in: 'query',
            type: 'boolean',
        }*/ 
        const id = req.query.id
        const account = req.query.account
        const password = req.query.password
        const isDelete = req.query.isDelete
        const mail = req.query.mail
        const response = {
            'status':true,
            'data':''
        }
        user.getUser(id,account,mail,password,isDelete,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.get(preRestApi + '/getUserByAccount', function(req, res) {
        /*#swagger.parameters['isDelete'] = {
            in: 'query',
            type: 'boolean',
        }*/ 
        const account = req.query.account
        const password = req.query.password
        const isDelete = req.query.isDelete
        const response = {
            'status':true,
            'data':''
        }
        user.getUserByAccount(account,password,isDelete,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.get(preRestApi + '/getUserNoPassword', function(req, res) {
        /*#swagger.parameters['isDelete'] = {
            in: 'query',
            type: 'boolean',
        }*/ 
        const account = req.query.account
        const mail = req.query.mail
        const isDelete = req.query.isDelete
        const response = {
            'status':true,
            'data':''
        }
        user.getUserNoPassword(account,mail,isDelete,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });
}