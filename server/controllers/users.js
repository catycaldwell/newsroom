var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');


module.exports = (function () {
    return {
        register: function (req, res) {
            var user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                birthday: req.body.birthday,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)),
            })
            //make a check to make sure valid user with unique email has been created
            console.log("What does user look like if the email validations fail?");
            console.log(user);

            user.save(function (err, data) {
                console.log("Do I have errors in err is email ia already in db?");
                console.log(err);
                if (data) {
                    req.session.userid = data._id;
                    req.session.save();
                    console.log("session id is " + req.session.userid);
                    res.json(data);
                }
                else {
                    //if any error ie email is not unique, but could there be other errors???/
                    res.json({ status: false });
                }

            })
        },
        login: function (req, res) {
            User.findOne({ email: req.body.email }, function (err, user) {
                //if user exists and the pasword matches, proceed
                console.log("err from login");
                console.log(err);
                console.log("user from the db from login");
                console.log(user);
                if (user) {
                    console.log(bcrypt.compareSync(req.body.password, user.password));
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        req.session.userid = user._id;
                        console.log("user id in session is " + req.session.userid );
                        req.session.save();
                        res.json(user);
                    }
                    else {
                        //password was wrong
                        res.json({ status: false })
                    }
                }
                else {
                    //email was wrong
                    res.json({ status: false })
                }
            })
        },
        logout: function (req, res) {
            req.session.destroy();
            res.json({status: false});
        },
        check: function (req, res) {
            if(req.session.userid) {
                //returns users information
                User.findOne({_id:req.session.userid}, function(err, user){
                    //logic here in case of errors
                    res.json(user);
                })
            }
            else {
                //starts redirecting to login page
                res.json({ status: false })
            }
        },
    }
})()

// module.exports = (function(){
//     return {
//         login: function(req, res){
//             User.findOne({email:req.body.email}, function(err, data){
//                 if(!data){
//                     var user = new User(req.body)
//                     user.save()
//                     req.session.user = user
//                     req.session.user.save()
//                     return res.json(user)
//                 } else {
//                     var user = data;
//                     req.session.user = user
//                     req.session.user.save()
//                     return res.json(user)
//                 }
//             })
//         },
//         checkStatus: function(req,res){
//             if(req.session.user){
//                 res.json(req.session.user)
//             } else {
//                 res.json(null)
//             }
//         },
//         logOut: function(req,res){
//             req.session.destroy();
//             res.redirect('/')
//         }
//     }
// })()
