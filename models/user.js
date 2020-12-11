const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{type:String, required:true},
    phone:{type:String, required:true},
    password:String,
    isverified:{type: Boolean, default:true},
    credits: {type:Number, default:0}
});

module.exports = mongoose.model('user', userSchema);