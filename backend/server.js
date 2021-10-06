import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import colors from 'colors';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/error.js';

// Route Imports
import boards from './routes/boards.js';
import auth from './routes/auth.js';

dotenv.config();

connectDB();

const app = express();

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
