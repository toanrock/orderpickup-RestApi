const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    user: 'ordersystem',
    database: 'ordersystem',
    password: 'goorder',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})
module.exports = {
  query: (text, params) => pool.query(text, params)
}