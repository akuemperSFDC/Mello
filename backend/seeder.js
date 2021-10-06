import fs from 'fs';
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
const __dirname = path.resolve();

// Load env vars

dotenv.config();

// Connect to DB
connectDB();

// Load Models
import Board from './models/Board.js';

// Read JSON files
const boards = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/data/boards.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Board.deleteMany();

    await Board.create(boards);
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error.red.inverse);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Board.deleteMany();
    console.log('Data Deleted!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(error.red.inverse);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
