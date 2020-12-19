const app= require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let Tshirt=require('tshirt.js')
let Category=require('category.js')
let Order=require('order.js')

app.use(bodyParser.urlencoded({extended:false,useNewUrlParser:true}))
app.use(bodyParser.json())
const db=mongoose.connect('mongodb://localhost/Courses',{useNewUrlParser:true,useUnifiedTopology:true})


//////// Post category/////////

app.post('/category',function(req,res){
    
let newCategory = new Category()


newCategory.categoryName = req.body.categoryName;
    
newCategory.save(function(err,SavedCategory){
    
    if(err)
    { console.log(err);
        res.status(500).send({error:"couldn't add the Category"}) 
    }
    else
    { 
        res.send(SavedCategory) }
    })

 })


////// get category/////////

app.get('/category', function(req,res){
    
Category.find({} , function(err,Categorys){
    
   if (err)
    {
    res.status(500).send({error:"Coudn't get Category"})
    }
    else
    {
        res.send(Categorys)
    }
   })
 })


//////// put category/////////

app.put('/category/tshirt/add', function(req,res){
    
let categoryID = req.body.categoryId
let tshirtID = req.body.tshirtId


Category.findOne({_id :categoryID} , function(err,category){

 if (err)
 {
     res.status(500).send({error:"Couldn't find the category"})
 }
 else
 {
  Tshirt.updateOne({ _id : tshirtID } , { $addToSet : {categorys : category._id} } , function(err,status){
    
    if (err) 
    {
        console.log(err);
    res.status(500).send({error:"Couldn't find the tshirt"}) 
    }
    else
    {
          res.send(status)
    }
   })
  }
 })
})


//////// Post tshirt/////////

app.post('/tshirt', function(req,res){
    
let newTshirt = new Tshirt()

newTshirt._id = req.body._id;
newTshirt.tshirtName = req.body.tshirtName;
newTshirt.tshirtPrice = req.body.tshirtPrice;
newTshirt.numberOfAvailableItems = req.body.numberOfAvailableItems;
    
newTshirt.save(function(err,SavedTshirt){
    
if (err)
  {console.log(err);
      res.status(500).send({error:"Coudn't add Tshirt"})
  }
else
  { 
      res.send(SavedTshirt) }
  })
})


//////// get tshirt/////////

    app.get('/tshirt', function(req,res){
        
    Tshirt.find({}).populate(
        {
        path: 'categorys' , 
        model: 'Category' ,
        select: 'categoryName  -_id' 
        }
        
    ).exec(function(error,tshirts){
         if (error)
         {
           res.status(500).send({error:"Coudn't get category"})
         }
        else
         {
          res.send(tshirts);
         }
    })
    
})


//////// post order/////////

app.post('/order', function(req,res){
let numberTshirt=req.body.numberTshirt;

let newOrder = new Order()


newOrder.orderNumber = req.body.orderNumber;
newOrder.orderTshireId = req.body.orderTshireId;    
newOrder.orderDateTime = req.body.orderDateTime;
newOrder.customerPhoneNum = req.body.customerPhoneNum;

newOrder.save(function(err,SavedOrder){
    
if (err)
  {console.log(err);
      res.status(500).send({error:"Couldn't add the order"})
  }
else
  { 
      res.send(SavedOrder) }
  })
})



//////// get order/////////

app.get('/order', function(req,res){
    Order.find({} , function(err,order){
        
        if (err)
        {
            res.status(500).send({error:"Coudn't get order"})
        }
        else
        {
            res.send(tshirt)
        }
    })
})


//////// put order/////////

//app.put('/order/tshirt/incremnt', function(req,res){
//    
//let orderID = req.body.orderId
//let tshirtID = req.body.tshirtId
//
//
//Category.findOne({_id :orderID} , function(err,order){
//
// if (err)
// {
//     res.status(500).send({error:"Couldn't find the category"})
// }
// else
// {
//  Tshirt.updateOne({ _id : tshirtID } , { $inc : {tshirts : tshirt.numberOfAvailableItems : -1} } , function(err,status){
//    
//    if (err) 
//    {
//        console.log(err);
//    res.status(500).send({error:"Couldn't incremunt the number of available items"}) 
//    }
//    else
//    {
//          res.send(status)
//    }
//   })
//  }
// })
//})


app.listen(3000, function(){
    console.log("Server is running on port 3000")
})

