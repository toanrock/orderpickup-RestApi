const Router = require('express-promise-router')


const orderdb = require('../Controller/OrderController');
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
  var orderid  = req.params.id;
  var payment = req.query.payment;
  console.log(orderid);
  console.log(payment);
  var row = await orderdb.getOrderById(orderid);
 
  res.send(row);
});


