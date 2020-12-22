var mongoose = require('mongoose');
var Scherma = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var Quote = new Scherma({
    quote_id:{
        type:String,
        unique:true
    },
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },
    quote_text:{
        type:String
    },
});
Quote.plugin(AutoIncrement, {inc_field: 'likes',disable_hooks: true});
Quote.plugin(AutoIncrement, {inc_field: 'dislikes',disable_hooks: true});
const QuoteModel = mongoose.model("Quote", Quote);
module.exports = QuoteModel;