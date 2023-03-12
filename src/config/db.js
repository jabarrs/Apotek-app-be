const mysql = require('mysql');
const koneksi = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'api_apotek',
  multipleStatements: true,
});

module.exports = koneksi;
