require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mainRouter = require('./src/routes/index');
const port = process.env.DB_PORT || 3003;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/', mainRouter);

app.listen(port, () => console.log('Server is Running on PORT : 3003'));

module.exports = app;
