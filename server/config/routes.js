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
var users = require('./../controllers/users.js');
var tags = require('./../controllers/tags.js');
var articles = require('./../controllers/articles.js');

module.exports = function(app) {
    app.post('/register', users.register);
    app.post('/login', users.login);
    app.get('/check', users.check);
    app.get('/logout', users.logout);
	app.post('/addProfile', tags.addProfile);
    
    // Tag routes
	app.get('/user/:id/scope', function( req, res) {
		tags.index(req, res);
	});
	
	app.post('/user/:id/graph/add', function( req, res) {
		tags.createTag(req, res);
	});
	
	app.post('/user/:id/topic/add', function( req, res) {
		tags.createTopic(req, res);
	});
	
	app.post('/polls/:id', function( req, res) {
		tags.vote(req, res);
	});
	
	app.post('/user/create', function( req, res) {
		tags.createUser(req, res);
	});
	app.post('/helpful', function( req, res) {
		articles.feedback(req, res);
	});
	app.post('/useless', function( req, res) {
		articles.feedback(req, res);
	});
	
	
	// ARTICLE ROUTES
	app.get('/articles', function ( req, res ) {
		articles.index(req, res);
	});
	
	app.get('/articles/import', function ( req, res ) {
		articles.importArticles(req,res);
	})
	
};