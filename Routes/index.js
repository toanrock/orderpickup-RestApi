const orders = require('./Order');

module.exports = (app) =>{
   
    app.use('/orders',orders);
    app.use('/',function(req,res){
        res.send("Welcome to order system");
    });
}