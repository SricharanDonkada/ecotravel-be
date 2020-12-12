const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    phone : {type :String,required:true},
    credits :{type : Number,required:true},
    busid:{type: String,required:true},
    time : {type:String,required:true}
})

module.exports = mongoose.model('transaction',transactionSchema)