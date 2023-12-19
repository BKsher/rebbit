const mysql = require('mysql2');
let connection;

if (process.env.JAWSDB_URL) {
    // Use JawsDB URL
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    // Use local database configuration
    connection = mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '240303vova',
        database: 'mydb'
    });
}

connection.connect(error => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;

