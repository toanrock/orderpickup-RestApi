const db = require('.');


async function getOrderById(orderid){
   // console.log("The order send to here "+orderid);
    const { rows } = await db.query('SELECT * FROM orders WHERE orderid = $1', [orderid])
    //console.log(rows[0])
    return rows[0];
}
async function getOrderByTransactionId(transId){
    const {rows } =await db.query('SELECT * FROM orders WHERE transactionid = $1', [transId])
    return rows;
}
async function insertOrder(order){
    const insertSQL =
    'INSERT INTO orders(foodid, orderprice, orderquantity, total, totalaftertax, paymenttype, transactionid, note) VALUES ( $1, $2, $3, $4, $5, $6, $7,$8 ) RETURNING orderid;';
    const values =[order.foodid,order.orderprice,order.orderquantity,order.total,order.totalaftertax,order.paymenttype,order.transactionid,order.note];

    
    const orderid = await db.query(insertSQL,values);
    return orderid;
}

module.exports.insertOrder = insertOrder;
module.exports.getOrderById = getOrderById;
module.exports.getOrderByTransactionId = getOrderByTransactionId;