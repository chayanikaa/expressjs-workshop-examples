class NotFoundError extends Error {

  get statusCode() {
    return 404;
  }
}

module.exports = NotFoundError;