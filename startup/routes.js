const error = require("../middleware/error");

const usersRoute = require("../routes/users");
const authRoute = require("../routes/auth");
const coursesRoute = require("../routes/courses");

const express = require("express");
module.exports = function (app) {
  app.use(express.json()); // in case there is a body in the request it will populate req.body
  app.use("/api/users", usersRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/courses", coursesRoute); // any route that start with /api/courses , let course
  app.use(error); // this will handle our errors (if occures)
};
