const orders = require('../Controller/OrderController');

module.exports = (app) =>{
   
    app.use('/orders',orders);
    app.use('/',function(req,res){
        res.send("Welcome to order system");
    });
}