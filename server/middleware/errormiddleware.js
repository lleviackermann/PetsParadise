// errorMiddleware.js
export const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
  console.error(err.stack);

  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof SyntaxError || err instanceof TypeError) {
    statusCode = 400;
    message = "Invalid Request Data";
  } else if (err.status) {
    statusCode = err.status;
    message = err.message;
  }

  return res.status(statusCode).json({ error: message });
};
