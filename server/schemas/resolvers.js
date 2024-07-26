const helpers = require("../utils/helpers");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const { Client, Property } = require("../models/Client");
const { Cleaning } = require("../models/Cleaning");
const { Inquiry } = require("../models/Inquiry");
const { Invoice } = require("../models/Invoice");

const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const config = require("config");

const stripe = require("stripe")(config.get("STRIPE_SECRET"));

const resolvers = {
  Query: {
    inquiries: async () => {
      return await Inquiry.find({ active: true });
    },
    activeClients: async () => {
      return await Client.find({ active: true });
    },
    openInvoices: async () => {
      return await Invoice.find({ paid: false }).populate([
        "client",
        "cleaning",
      ]);
    },
    clientById: async (parent, userInput) => {
      console.log(userInput);
      return await Client.findById({ _id: userInput.clientId });
    },
    invoiceById: async (parent, userInput) => {
      console.log(userInput);
      return await Invoice.findById({ _id: userInput.invoiceId }).populate(
        "client"
      );
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
    createCheckoutSession: async (parent, { amount, invoiceId }, context) => {
      // Create a PaymentIntent with the order amount and currency, and invoice id attached
      console.log(amount);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
        description: "Invoice:  " + invoiceId,
      });
      const clientSecret = paymentIntent.client_secret;
      return clientSecret;
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
      //console.log(email, email2);
      console.log(email2);
      return inquiry;
    },
    // create a new client
    createClient: async (parent, userInput) => {
      userInput.quoted = false;
      userInput.verified = false;
      userInput.active = true;
      if (userInput.password === "password") {
        let tempPW = uuidv4();
        helpers.sendTempPW(userInput, tempPW);
        const saltRounds = 10;
        tempPW = await bcrypt.hash(tempPW, saltRounds);
        userInput.password = tempPW;
      }
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
      if (correctPw) {
        console.log("correct:" + correctPw);
      }

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
        console.log("INCORRECT PASSWORD");
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
    updateClient: async (parent, args, context) => {
      console.log(args);

      const newClient = await Client.findByIdAndUpdate(
        { _id: args.clientId },
        { $set: args },
        { new: true }
      );
      return newClient;
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
    resetPassword: async (parent, { email }) => {
      const client = await Client.find({ email: email });
      let tempPW = uuidv4();
      console.log(tempPW);
      helpers.sendTempPW(client, tempPW);
      const saltRounds = 10;
      tempPW = await bcrypt.hash(tempPW, saltRounds);
      await Client.findByIdAndUpdate(
        { _id: client._id },
        { $set: { password: tempPW } }
      );
    },
    markResponded: async (parent, args) => {
      console.log(args.inquiryId);
      const inquiry = await Inquiry.findOneAndUpdate(
        { _id: args.inquiryId },
        { responded: true },
        { new: true }
      );
      console.log(inquiry);
    },
    deleteInquiry: async (parent, args) => {
      console.log(args.inquiryId);
      const inquiry = await Inquiry.findOneAndUpdate(
        { _id: args.inquiryId },
        { active: false },
        { new: true }
      );
      console.log(inquiry);
    },
    createInvoice: async (parent, args, context) => {
      console.log(args);
      if (args.cleaning === "") {
        delete args.cleaning;
      }
      const invoice = await Invoice.create(args);
      await Client.findByIdAndUpdate(
        { _id: args.client },
        {
          $addToSet: {
            invoices: invoice._id,
          },
        }
      );
      return invoice;
    },
    updateInvoice: async (parent, args, context) => {
      console.log("update", args);
      const invoice = await Invoice.findById({ _id: args.invoiceId });
      console.log(invoice);
      const updates = {};
      if (args.services) {
        updates.services = args.services;
      }
      if (args.amount) {
        updates.amount = args.amount;
      }
      if (args.discount) {
        updates.discount = args.discount;
      }
      if (args.notes) {
        updates.notes = args.notes;
      }
      if (args.cleaning) {
        updates.cleaning = args.cleaning;
      }
      if (args.paid) {
        updates.paid = args.paid;
      }
      if (args.paymentMethod) {
        updates.paymentMethod = args.paymentMethod;
      }
      if (args.depositPaymentMethod) {
        updates.depositPaymentMethod = args.depositPaymentMethod;
      }
      if (args.depositPaid) {
        updates.depositPaid = args.depositPaid;
      }
      if (args.deposit) {
        updates.deposit = args.deposit;
      }
      if (args.depositAmount) {
        updates.depositAmount = args.depositAmount;
      }
      if (args.paymentAmount) {
        if (args.paymentAmount === invoice.depositAmount) {
          updates.depositPaid = true;
          updates.depositPaymentMethod = "e-payment";
        } else {
          updates.paid = true;
          updates.paymentMethod = "e-payment";
        }
      }
      console.log(updates);
      return await Invoice.findByIdAndUpdate(
        { _id: args.invoiceId },
        { $set: { paid: updates.paid, paymentMethod: updates.paymentMethod } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
