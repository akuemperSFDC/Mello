import ErrorResponse from '../utils/errorResponse.js';

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.errors = err.errors;

  // Log to console for dev
  console.log(err.stack.red);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const errors = [`Board with id ${err.value} not found`];
    error = new ErrorResponse(errors, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const errors = [`Duplicate field value entered`];
    error = new ErrorResponse(errors, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = [];
    Object.values(err.errors).map((val) => errors.push(val.properties.message));
    error = new ErrorResponse(errors, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    errors: error.errors || [],
  });
};
