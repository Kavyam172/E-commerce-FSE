const mysql = require('mysql2');

//TODO: move the connection details to env variables

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kavyam@sql441',
    database: 'fse'
});

dbConnection.connect((err) => {
    if (err) {
        console.log('Error connecting to database: ', err);
    } else {
        console.log('Connected to database');
    }
});

module.exports = dbConnection.promise();