const HttpStatusCodes = require('http-status-codes');

module.exports = {
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 3001,
  TIMEOUT: process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 90000,
  HttpStatusCodes,
  setLogDetails: (middleware, shortMessage, details) => ({
    Middleware: middleware,
    Message: shortMessage,
    Details: details,
  }),
  DataException: (message) => ({ message }),
};
