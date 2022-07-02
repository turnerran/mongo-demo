const mongoose = require("mongoose");
const config = require("config");

module.exports = function (app) {
  const connectString = config.get("db");
  mongoose
    .connect(connectString)
    .then(() => console.log(`connected to ${connectString}`));
};
