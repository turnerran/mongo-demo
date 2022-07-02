const express = require("express");
const winston = require("winston");

const app = express();

// single responsibility
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();

// sync exception - throw new Error("something went wrong - regular flow");
//const p = Promise.reject(new Error("promise failed"));
//p.then(() => console.log("success!"));

const port = process.env.PORT || 3000;
const server = app.listen(3000, () =>
  winston.info(`listening on port ${port} !!.....`)
);

module.exports = server;
/*
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

/*
async function createCourse() {
  const course = new Course({
    name: "node.js course",
    author: "ran test",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const res = await course.save();
  console.log(res);
}
*/

//createCourse();

/*
async function getCourses() {
  const courses = await Course.find({ author: "ran" })
    //await Course.find({ price: { $in: [10, 15, 20] } })
    .select({
      name: 1,
      tags: 1,
    })
    .limit(4);

  console.log(courses);
  console.log(courses[0]._id.getTimestamp()); // 4 bytes : timestamp -> gets is from there
  console.log(courses.length);
}

/*
//getCourses();

async function updateCourse() {
  const course = await Course.findById("629e11c46006d5168047e577");
  if (!course) {
    return;
  }

  course.isPublished = false;
  course.name = "GGG";

  const res = await course.validate();
  console.log(res);
}

//updateCourse();
getCourses();

// _id : 629e11c46006d5168047e577

// 12 bytes
// 4 bytes : timestamp
// 3 bytes : machine identifier
// 2 bytes : process identifier
// 3 bytes : counter

// 1 bytes : 8 bits -> 2 ^ 8 -> 256
// 3 bytes : 2 ^ 24 -> 16M
*/
