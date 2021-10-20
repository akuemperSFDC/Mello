import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/error.js';

// Route Imports
import boards from './routes/boards.js';
import auth from './routes/auth.js';
import lists from './routes/lists.js';
import cards from './routes/cards.js';
import search from './routes/search.js';
import activities from './routes/activities.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Routes
app.use('/api/boards', boards);
app.use('/api/auth', auth);
app.use('/api/lists', lists);
app.use('/api/cards', cards);
app.use('/api/search', search);
app.use('/api/activities', activities);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
