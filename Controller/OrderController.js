const db = require('../db');


async function getOrderById(orderid){
    console.log("The order send to here "+orderid);
    const { rows } = await db.query('SELECT * FROM orders WHERE orderid = $1', [orderid])
    console.log(rows[0])
    return rows[0];
}
async function getOrderByTransactionId(transId){
    const {rows } =await db.query('SELECT * FROM orders WHERE transactionid = $1', [transId])
    return rows;
}
module.exports.getOrderById = getOrderById;
module.exports.getOrderByTransactionId = getOrderByTransactionId;