const mysql = require('mysql');
var isDev___ = false
// Create connection
var db = mysql.createConnection({
    host: isDev___ ? "3.131.160.211" : 'localhost',
    user: isDev___ ? "pengulocal" : 'penguplatform',
    password: 'azerty12',
    database: 'penguplatform',
    charset: 'utf8mb4'
});
// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});
module.exports = db