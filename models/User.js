var mongoose = require('mongoose');
var Scherma = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);


var User = new Scherma({
    // _id -> mongoose lo inserisce in automatico ad ogni inserimento nella "tabella"/"DOCUMENTO"
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String // la password verrà criptata da bcrypt nel flow di registrazione
    },
    verificated:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    leftSwipes:{
        type:Number,
        default:0
    },
    rightSwipes:{
        type:Number
    }
});
User.plugin(AutoIncrement, {inc_field: 'rightSwipes',disable_hooks: true});
User.plugin(AutoIncrement, {inc_field: 'leftSwipes',disable_hooks: true});
const UserModel = mongoose.model("User", User);
module.exports = UserModel;