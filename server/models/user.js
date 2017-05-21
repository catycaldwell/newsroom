var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    email: {type:String, required:true, minlength:3},
    email: {type:String, required:true},
    password: {type:String, required:true},
}, {timestamp: true})

mongoose.model('User', UserSchema);
