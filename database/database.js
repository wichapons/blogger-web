const mysql = require('mysql2');
require('dotenv').config();

mysql.createPool({
    host:'localhost',
    database: 'blog',
    user:'root',
    password: process.env.db_password
});
    
module.exports = pool;