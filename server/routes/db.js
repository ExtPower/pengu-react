const mysql = require('mysql');
// Create connection
var db = mysql.createConnection({
    host: '18.188.213.9',
    user: 'penguplatform',
    password: 'azerty12',
    database: 'penguplatform',

});
// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});
