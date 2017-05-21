// var usr_control = require('./../controllers/users.js');

// module.exports = function(app) {

//     app.post('/login', function(req, res){
//         usr_control.login(req, res);
//     })
//     app.get('/checkstatus', function(req,res){
//         usr_control.checkStatus(req, res);
//     })

//     app.get('/logOut', function(req, res) {
//         users.logOut(req, res);
//     })
// };

var mongoose = require('mongoose');
var users = require('./../controllers/users.js') 

module.exports = function(app) {
    app.post('/register', users.register);
    app.post('/login', users.login);
    app.get('/check', users.check);
    app.get('/logout', users.logout);
}