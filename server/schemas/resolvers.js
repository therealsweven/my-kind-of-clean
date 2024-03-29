const helpers = require("../utils/helpers");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const { Client, Property } = require("../models/Client");
const { Cleaning } = require("../models/Cleaning");
const { Inquiry } = require("../models/Inquiry");
const { Invoice } = require("../models/Invoice");

const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    inquiries: async () => {
      return await Inquiry.find();
    },
    clientById: async (parent, userInput) => {
      return await Client.findById({ _id: userInput.clientId });
    },
    me: async (parent, args, context) => {
      //console.log(context.headers.clientid);
      return await Client.findById({ _id: context.headers.clientid }).populate([
        "properties",
        "invoices",
      ]);
    },
    meTest: async (parent, args, context) => {
      return await Client.findById({ _id: args.clientId }).populate([
        "properties",
        "invoices",
      ]);
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
        expiresIn: "24hr",
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
    sendVerificationLink: async (parent, { clientId }) => {
      console.log("clientId:", clientId);
      const client = await Client.findById({ _id: clientId });
      console.log(client);
      const emailToken = jwt.sign({ _id: clientId }, "alakazam934", {
        expiresIn: "24hr",
      });
      await helpers.verifyEmail(client, emailToken);
      return client;
    },
    updateEmail: async (parent, { email }, context) => {
      if (context.user) {
        const client = await Client.findById({ _id: context.headers.clientid });
        if (client.email !== email) {
          client = await Client.findByIdAndUpdate(
            { _id: context.headers.clientid },
            { $set: { email: email, verified: false } },
            { new: true }
          );
          const emailToken = jwt.sign(
            { _id: context.headers.clientid },
            "alakazam934",
            {
              expiresIn: "24hr",
            }
          );
          await helpers.verifyEmail(client, emailToken);
          return client;
        }
        return client;
      }
      throw new AuthenticationError(
        "You must be logged in to make changes to your account."
      );
    },
    updatePhone: async (parent, { phone }, context) => {
      if (context.user) {
        const client = await Client.findByIdAndUpdate(
          { _id: context.headers.clientid },
          { $set: { phone: phone } },
          { new: true }
        );
        return client;
      }
      throw new AuthenticationError(
        "You must be logged in to make changes to your account."
      );
    },
    updateCommMethod: async (parent, { commMethod }, context) => {
      if (context.user) {
        const client = await Client.findByIdAndUpdate(
          { _id: context.headers.clientid },
          { $set: { commMethod: commMethod } },
          { new: true }
        );
        return client;
      }
      throw new AuthenticationError(
        "You must be logged in to make changes to your account."
      );
    },
    updateAddress: async (parent, { street, city, state, zip }, context) => {
      if (context.user) {
        const client = await Client.findByIdAndUpdate(
          { _id: context.headers.clientid },
          { $set: { street: street, city: city, state: state, zip: zip } },
          { new: true }
        );
        return client;
      }
      throw new AuthenticationError(
        "You must be logged in to make changes to your account."
      );
    },
    updatePassword: async (parent, { password, newPassword }, context) => {
      if (context.user) {
        let client = await Client.findById({ _id: context.headers.clientid });

        let correctPw = await client.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect password!");
        }
        const saltRounds = 10;
        newPassword = await bcrypt.hash(newPassword, saltRounds);
        client = await Client.findByIdAndUpdate(
          { _id: context.headers.clientid },
          { $set: { password: newPassword } },
          { new: true }
        );
        return client;
      }
      throw new AuthenticationError(
        "You must be logged in to make changes to your account."
      );
    },
    updateSubscribe: async (parent, { subscribe }, context) => {
      console.log(subscribe);
      const client = await Client.findByIdAndUpdate(
        { _id: context.headers.clientid },
        { $set: { subscribe: subscribe } },
        { new: true }
      );
      return client;
    },
    destroyAccount: async (parent, { password }, context) => {
      if (context.user) {
        const client = await Client.findById({ _id: context.headers.clientid });

        let correctPw = await client.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect password!");
        }
        await Client.findByIdAndDelete({ _id: context.headers.clientid });
        await helpers.sendDeleteConfirmation(client);
        return client;
      }
    },
  },
};

module.exports = resolvers;
