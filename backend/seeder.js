import fs from 'fs';
import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
const __dirname = path.resolve();
import { AutoIncrement } from './models/Card.js';

// Load env vars

dotenv.config();

// Connect to DB
connectDB();

// Load Models
import Board from './models/Board.js';
import User from './models/User.js';
import List from './models/List.js';
import Card from './models/Card.js';
import Activity from './models/Activity.js';

// Read JSON files
const boards = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/data/boards.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/data/users.json`, 'utf-8')
);
const lists = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/data/lists.json`, 'utf-8')
);
const cards = JSON.parse(
  fs.readFileSync(`${__dirname}/backend/data/cards.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Board.deleteMany();
    await User.deleteMany();
    await List.deleteMany();
    // Card.counterReset('list_seq', (err) => {
    //   if (err) {
    //     return next(err);
    //   }
    // });
    await Card.deleteMany();
    await Activity.deleteMany();

    // await Board.create(boards);
    await User.create(users);
    // await List.create(lists);
    // await Card.create(cards);
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Board.deleteMany();
    await User.deleteMany();
    await List.deleteMany();
    // Card.counterReset('list_seq', (err) => {
    //   if (err) {
    //     return next(err);
    //   }
    // });
    await Card.deleteMany();
    console.log('Data Deleted!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.stack}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
