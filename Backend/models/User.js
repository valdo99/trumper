var mongoose = require('mongoose');
var Scherma = mongoose.Schema;


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
    }
});
const UserModel = mongoose.model("User", User);
module.exports = UserModel;