const Router = require('express-promise-router')


const orderdb = require('../db/OrderDB');
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

// export our router to be mounted by the parent application
module.exports = router;

//get all orders
//router.get('/', async (req,res,next)=>{
 // const {rows} = await db.query('SELECT * FROM orders')
//  res.send(rows);
//});
//get order by id

router.get('/:id?', async (req, res,next) => {
  try{
    let orderid  = req.params.id;
    
    var row = await orderdb.getOrderById(orderid);
  
    res.status(200).send(row);
  }catch(err){
    res.status(400).json({"error":"bad request"});
    next(err);
  }
});

router.post('/',async(req,res, next)=>{
  try{
   
      let order =getOrderFromRecord(req);
      let errorMessage = validateOrder(order);
      console.log("error message ="+errorMessage);
      if( errorMessage!==""){
        res.status(400).json({"Error" : errorMessage});
      }
      else{
        let orderid = await orderdb.insertOrder(order);        
        res.status(201).json({"orderid": orderid});
      }
  }catch(err){
    res.status(400).json({"Error" : "Bad request"});
    next(err);
  }
})
function validateOrder(order){
  let errorMessage ="";
    if(isNaN(order.foodid) || isNaN(order.orderprice) || isNaN(order.orderquantity) || isNaN(order.total) || isNaN(order.totalaftertax) || isNaN(order.transactionid)){
      errorMessage += "foodid or orderpice or orderquantity or total or totalaftertax or transactionid must be number ";
    }
    if(order.paymenttype ==="master" || order.paymenttype ==="visa"|| order.paymenttype ==="debit" || order.paymenttype==="other" || order.paymenttype === "cash" ){
     
    }
    else{
      errorMessage += "+ Paymenttype must be one of selection (master,visa,debit,cash,other)";
    }
    return errorMessage;
}
function getOrderFromRecord(req){
  console.log(req.body.foodid);
    const Order = {
      foodid : req.body.foodid,
      orderprice : req.body.orderprice,
      orderquantity: req.body.orderquantity,
      total : req.body.total,
      totalaftertax : req.body.totalaftertax,
      paymenttype : req.body.paymenttype,
      transactionid : req.body.transactionid,
      note : req.body.note
    };
    return Order;
}