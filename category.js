const mongoose = require('mongoose')

const objectId = mongoose.Schema.Types.ObjectID

let schema = mongoose.Schema;
let category = new schema({
    
   
    categoryName : {type: String }
    
})

module.exports = mongoose.model('Category', category) 