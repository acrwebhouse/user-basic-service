exports.on = function(app) {
    let preRestApi = '/user';
    let user = require('../role/user');
    app.post(preRestApi + '/editUser', function(req, res) {
        res.send("editUsers");
    });

    app.delete(preRestApi + '/removeUser', function(req, res) {
        res.send("removeUsers");
    });

    app.get(preRestApi + '/getUsers', function(req, res) {
        user.editUser((result)=>{res.send(result);}); 
    });
}