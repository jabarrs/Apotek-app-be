const mysql = require('mysql');
const koneksi = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'api_apotek',
  multipleStatements: true,
});

koneksi.query('SELECT 1', function (error) {
  if (error) throw error;
  console.log('Database is connected');
});

module.exports = koneksi;
