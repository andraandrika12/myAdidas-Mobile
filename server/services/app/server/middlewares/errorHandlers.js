function errorHandler(error, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";
  console.log(error)

  if (error.name === "unauthenticated" || error.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid token";
  } else if (error.name === "not_found") {
    status = 404;
    message = `Product with id ${error.id} not found`;
  } else if (error.name === "forbidden") {
    status = 403;
    message = "Forbidden";
  } else if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = error.errors[0].message;
  } else if (error.name === "Invalid login" ) {
    status = 401;
    message = "Invalid email or password";
  } else if (
    error.name === "Invalid delete" ||
    error.name === "Invalid detail" ||
    error.name === "Invalid update" ) {
    status = 404;
    message = "not found";
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
