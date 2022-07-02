const bcrypt = require("bcrypt");

async function generateSalt() {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash("1234", salt);
  console.log(salt);
  console.log(password);
}

generateSalt();
