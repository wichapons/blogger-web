const mysql = require('mysql2/promise');
require('dotenv').config();

const poolConnection = mysql.createPool({
    host:'localhost',
    //port:'3306',
    database: 'blog',
    user:'root',
    password: 'a123456!'
});
module.exports = poolConnection;