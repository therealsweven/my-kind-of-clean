const helpers = require("../utils/helpers");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const { Client } = require("../models/Client");
const { Inquiry } = require("../models/Inquiry");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    inquiries: async () => {
      return await Inquiry.find();
    },
    clientById: async (parent, userInput) => {
      return await Client.findById({ _id: userInput.clientId });
    },
    me: async (parent, args, context) => {
      return await Client.findById({ _id: context.headers.clientId });
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
      userInput.quoted = false;
      userInput.verified = false;
      const client = await Client.create(userInput);
      const emailToken = jwt.sign({ _id: client._id }, "alakazam934", {
        expiresIn: "1d",
      });
      await helpers.verifyEmail(client, emailToken);
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
    verifyEmail: async (parent, { clientId, emailToken }) => {
      console.log(clientId, emailToken);
      const decode = jwt.verify(emailToken, "alakazam934");
      console.log(decode);
      const client = await Client.findByIdAndUpdate(
        { _id: clientId },
        { $set: { verified: true } },
        { new: true }
      );
      console.log(client);

      return client;
    },
  },
};

module.exports = resolvers;
