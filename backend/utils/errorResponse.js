class ErrorResponse extends Error {
  constructor(errors, statusCode) {
    super();
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export default ErrorResponse;
