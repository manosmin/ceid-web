var mongoose = require('mongoose');
var passportlocalmongoose=require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    Password: {type: String},
    email: {type: String},
    role: {
        type: Number,
        default: 1,
        required: true
      }
});

UserSchema.plugin(passportlocalmongoose);
module.exports=mongoose.model('User', UserSchema);
