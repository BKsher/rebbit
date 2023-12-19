const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1', // Hostname without the port number
  port: 3306, // Specify the port number separately, if not the default
  user: 'root', // your database username
  password: '240303vova', // your database password
  database: 'mydb' // your database name
});

connection.connect(error => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
