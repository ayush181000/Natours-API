const dotenv = require('dotenv');
const mongoose = require('mongoose');

// process.on('uncaughtException', err => {
//   console.error(err.name, err.message);
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//   server.close(() => {
//     process.exit(1);
//   });
// });

dotenv.config({ path: './config.env' });

const app = require('./app');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true
  })
  .then(con => {
    // console.log(con.connections);
    console.log('DB connection successful');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.error(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
