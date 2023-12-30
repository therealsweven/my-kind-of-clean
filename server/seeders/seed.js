require("dotenv").config();
const db = require("../config/connection");
const { Admin } = require("../models/Admin.js");

const seedData = {
  firstName: "Bobby",
  lastName: "Simpson",
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const seedAdmin = async () => {
  await Admin.deleteMany({});
  await Admin.create(seedData);
  return console.log("ADMIN SUCCESSFULLY SEEDED");
};

seedAdmin();
