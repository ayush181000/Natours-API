const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: '../../config.env' });

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true
  })
  .then(con => {
    // console.log(con.connections);
    console.log('DB connection successful');
  });

// READ JSON FILE

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// DELETE ALL DATA FROM COLLECETION

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully destroyed');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') deleteData();

console.log(process.argv);
