const mysql = require('mysql2');

// Check if running on Heroku with JawsDB
if (process.env.JAWSDB_URL) {
    // Use JawsDB URL
    const connection = mysql.createConnection(process.env.JAWSDB_URL);
    connection.connect(error => {
        if (error) {
            console.error('Error connecting to JawsDB MySQL:', error);
            return;
        }
        console.log('Connected to JawsDB MySQL database');
    });
} else {
    // Use local database configuration
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '240303vova',
        database: 'mydb'
    });

    connection.connect(error => {
        if (error) {
            console.error('Error connecting to the local database:', error);
            return;
        }
        console.log('Connected to local MySQL database');
    });
}

module.exports = connection;
