const { AuthenticationError } = require("apollo-server-express");
const { Client } = require("../models/Client");
const { Inquiry } = require("../models/Inquiry");

//const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    inquiries: async () => {
      return await Inquiry.find();
    },
  },

  Mutation: {
    // create a new inquiry
    createInquiry: async (parent, userInput) => {
      userInput.active = true;
      userInput.responded = false;
      console.log(userInput);
      const inquiry = await Inquiry.create(userInput);
      return inquiry;
    },
    // create a new client
    createClient: async (parent, userInput) => {
      const client = await Client.create(userInput);
      return client;
    },
  },
};

module.exports = resolvers;
