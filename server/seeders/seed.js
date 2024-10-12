const config = require("config");
require("bcrypt");
const db = require("../config/connection");
const { Admin } = require("../models/Admin.js");
const { Client } = require("../models/Client.js");
const { Inquiry } = require("../models/Inquiry.js");
const clientSeeds = require("./clients.json");
const inquirySeeds = require("./inquiries.json");

const adminSeeds = {
  firstName: "Angelica",
  lastName: "Levy",
  email: config.get("ADMIN_EMAIL"),
  password: config.get("ADMIN_PASSWORD"),
};

const seed = async () => {
  // ***** ADMIN ***** //
  await Admin.deleteMany({});
  await Admin.create(adminSeeds);
  console.log("ADMINS SUCCESSFULLY SEEDED");

  // ***** CLIENTS ***** //
  await Client.deleteMany({});
  await Client.create(clientSeeds);
  console.log("CLIENTS SUCCESSFULLY SEEDED");

  // ***** INQUIRIES ***** //
  await Inquiry.deleteMany({});
  await Inquiry.create(inquirySeeds);
  console.log("INQUIRIES SUCCESSFULLY SEEDED");

  return process.exit();
};
seed();
