var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function(){
    return {
        login: function(req, res){
            User.findOne({email:req.body.email}, function(err, data){
                if(!data){
                    var user = new User(req.body)
                    user.save()
                    req.session.user = user
                    req.session.user.save()
                    return res.json(user)
                } else {
                    var user = data;
                    req.session.user = user
                    req.session.user.save()
                    return res.json(user)
                }
            })
        },
        checkStatus: function(req,res){
            if(req.session.user){
                res.json(req.session.user)
            } else {
                res.json(null)
            }
        },
        logOut: function(req,res){
            req.session.destroy();
            res.redirect('/')
        }
    }
})()
