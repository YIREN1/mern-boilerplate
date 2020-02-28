require('dotenv').config();
const express = require('express');
require('colors');
const routes = require('./api/routes/index.js');
const ConnectDB = require('./api/config/mongo');

const app = express();
ConnectDB();
//  Connect all our routes to our application
app.use('/', routes);

// Port Number
const port = process.env.PORT || 5000;

// Start Server
app.listen(port, () => {
  console.log(
    `Server started ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold,
  );
});

process.on('unhandledRejection', e => {
  console.log(e);
  throw e.message;
});
