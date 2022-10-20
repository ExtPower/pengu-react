const mysql = require('mysql');
// Create connection
var db = mysql.createConnection({
    host: '3.131.160.211',
    user: 'penguplatform',
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