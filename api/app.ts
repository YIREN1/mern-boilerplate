import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import colors from 'colors';
import routes from './routes/index.js';
import ConnectDB from './config/mongo';

const app = express();
ConnectDB();
//  Connect all our routes to our application
app.use('/', routes);

// Port Number
const port = process.env.PORT || 1339;

// Start Server
app.listen(port, () => {
  console.log(
    `Server started ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold,
  );
});

// process.on('unhandledRejection', e => {
//   console.log(e);
//   throw e.message;
// });
