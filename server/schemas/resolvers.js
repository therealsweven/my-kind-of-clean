const helpers = require("../utils/helpers");
const { AuthenticationError } = require("apollo-server-express");
const { Client } = require("../models/Client");
const { Inquiry } = require("../models/Inquiry");

const { signToken } = require("../utils/auth");

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
      const email = await helpers.sendConfirmation(userInput);
      const email2 = await helpers.sendInfoToMe(userInput);
      console.log(email, email2);
      return inquiry;
    },
    // create a new client
    createClient: async (parent, userInput) => {
      const client = await Client.create(userInput);
      return client;
    },
    clientLogin: async (parent, { email, password }) => {
      const client = await Client.findOne({ email });
      console.log(client);
      if (!client) {
        throw new AuthenticationError(
          "No client account with that information found!"
        );
      }

      const correctPw = await client.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(client);
      return { token, client };
    },
  },
};

module.exports = resolvers;
