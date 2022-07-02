const winston = require("winston");

module.exports = function (app) {
  // catch synchronous exception which didn't get caught
  process.on("uncaughtException", (err) => {
    console.log("We got an handled exception !!");
    winston.error(err.message, err);
    process.exit(1);
  });

  // handle promises rejection
  process.on("unhandledRejection", (err) => {
    console.log("We got an handled rejection !!");
    winston.error(err.message, err);
    process.exit(1);
  });

  winston.add(winston.transports.File, { filename: "log" });
};
