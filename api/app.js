require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index.js');
// const SocketService = require('./services/SocketService');

const app = express();

const connect = mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//  Connect all our routes to our application
app.use('/', routes);

// Port Number
const port = process.env.PORT || 5000;

// Start Server
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

process.on('unhandledRejection', e => {
  console.log(e);
  throw e.message;
});

// SocketService.socketServiceInit(server);
