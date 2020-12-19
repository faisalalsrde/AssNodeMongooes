    
const mongoose = require('mongoose')
const objectId=mongoose.Schema.Types.ObjectID

let schema =mongoose.Schema;

let tshirt = new schema({

_id : {type: Number , required : true , default: "There's no tshirt id"},   
tshirtName : {type: String , required : true , default: "There's no tshirt name"},
categorys : [{type: objectId, ref:'Category'}],
tshirtPrice : Number ,
numberOfAvailableItems : Number

})
module.exports = mongoose.model('Tshirt',tshirt)

