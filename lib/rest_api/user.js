exports.on = function(app) {
    const preRestApi = '/user';
    const user = require('../role/user');

    app.post(preRestApi + '/addUser', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a user',
            schema: {
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
                phone: '0909666666',
                address: '台北市文山區興隆路六段66號6樓'
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
        const response = {
            'status':true,
            'data':''
        }
        user.addUser(account,password,name,gender,roles,rolesInfo,houseIds,phone,address,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.put(preRestApi + '/editUser', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a user',
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
                phone: '0909666666',
                address: '台北市文山區興隆路六段66號6樓'
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
        const response = {
            'status':true,
            'data':''
        }
        user.editUser(id,account,password,name,gender,roles,rolesInfo,houseIds,phone,address,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.delete(preRestApi + '/removeUser', function(req, res) {
        res.send("removeUsers");
    });

    app.get(preRestApi + '/getUsers', function(req, res) {
        user.editUser((result)=>{res.send(result);}); 
    });
}