const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectID

let schema = mongoose.Schema;

let order = new schema({
    
 
orderNumber : Number,
orderTshireId : Number,
orderDateTime : String,
customerPhoneNum : String
})

module.exports = mongoose.model('Order', order) 