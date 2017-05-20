
var path = require('path'),
    mongoose = require('mongoose')
    // User = mongoose.model('User'),

module.exports = function(app) {
    app.get('/', function(req, res) {
        users.displayAuth(req, res);
    });

    app.get('/getQuestions', function(req, res) {
        questionController.getQuestions(req, res);
    });

    app.post('/createQuestion', function(req, res) {
        questionController.createQuestion(req, res);
    });

    app.post('/createComment', function(req, res) {
        questionController.createComment(req, res)
    });

    app.post('/createAnswer', function(req, res) {
        questionController.createAnswer(req, res)
    })

    app.post('/createAnswerComment', function(req, res) {
        questionController.createAnswerComment(req, res)
    })

    app.post('/qUpvote', function(req, res) {
        console.log('route!');
        questionController.qUpvote(req, res);
    });

    app.post('/qDownvote', function(req, res) {
        questionController.qDownvote(req, res);
    });

    app.post('/aUpvote', function(req, res) {
        questionController.aUpvote(req, res);
    });

    app.post('/aDownvote', function(req, res) {
        questionController.aDownvote(req, res);
    });

    app.get('/success', function(req, res, next) {
        res.redirect('/#!/dash');
    });

    app.get('/error', function(req, res, next) {
        res.redirect('/');
    });

    app.get('/getUser', function(req, res) {
        users.getUser(req, res);
    });

    app.get('/getUsers', function(req, res) {
        users.getUsers(req, res);
    });

    app.get('/logOut', function(req, res) {
        users.logOut(req, res);
    });

    app.get('/getProfileUser/:id', function(req, res) {
        users.getProfileUser(req, res);
    });
};
