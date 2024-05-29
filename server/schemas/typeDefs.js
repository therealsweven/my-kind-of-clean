const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Client {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
    password: String
    street: String
    city: String
    state: String
    zip: String
    invoices: [Invoice]
    commMethod: String
    subscribe: Boolean
    verified: Boolean
    quoted: Boolean
    properties: [Property]
    cleanings: [Cleaning]
    active: Boolean
  }

  type Admin {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Inquiry {
    _id: ID!
    name: String
    email: String
    phone: String
    message: String
    location: String
    commMethod: String
    responded: Boolean
    active: Boolean
    createdAt: String
  }

  type Property {
    _id: ID!
    name: String
    street: String
    street2: String
    city: String
    state: String
    zip: String
    type: String
    quoted: Boolean
    cleanings: [Cleaning]
  }

  type Cleaning {
    _id: ID!
    date: String!
    startTime: String!
    endTime: String!
    notes: String
    approved: Boolean
    client: Client
    property: Property
    invoice: Invoice
  }

  type Invoice {
    _id: ID!
    client: Client!
    services: String!
    amount: Int
    discount: Int
    cleaning: Cleaning
    dateOfCleaning: String
    notes: String
    paid: Boolean
    paymentMethod: String
    deposit: Boolean
    depositPaid: Boolean
    depositAmount: Int
    depositPaymentMethod: String
    createdAt: String
  }

  type Auth {
    token: ID!
    client: Client
  }

  type Query {
    clientById(clientId: ID!): Client
    me: Client
    meTest(clientId: ID!): Client
    inquiries: [Inquiry]!
    openInvoices: [Invoice]!
    invoiceById(invoiceId: ID!): Invoice
    activeClients: [Client]!
    createCheckoutSession(amount: Int!): String
  }

  type Mutation {
    createInquiry(
      name: String!
      email: String!
      phone: String
      message: String!
      location: String!
      commMethod: String
      responded: Boolean
      active: Boolean
    ): Inquiry
    createAdmin(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Admin
    createClient(
      firstName: String!
      lastName: String!
      email: String!
      phone: String
      password: String!
      street: String
      city: String
      state: String
      zip: String
      commMethod: String
      subscribe: Boolean
    ): Client
    createInvoice(
      client: ID!
      amount: Int
      cleaning: ID
      services: String!
      discount: Int
      dateOfCleaning: String
      notes: String
      paid: Boolean
      paymentMethod: String
      deposit: Boolean
      depositPaid: Boolean
      depositAmount: Int
      depositPaymentMethod: String
    ): Invoice
    updateClient(
      clientId: ID!
      firstName: String
      lastName: String
      email: String
      phone: String
      street: String
      city: String
      state: String
      zip: String
      commMethod: String
      active: Boolean
    ): Client
    clientLogin(email: String!, password: String!): Auth
    verifyEmail(clientId: ID!, emailToken: String!): Client
    sendVerificationLink(clientId: ID!): Client
    updateEmail(email: String!): Client
    updatePhone(phone: String!): Client
    updateCommMethod(commMethod: String!): Client
    updateAddress(
      street: String!
      city: String!
      state: String!
      zip: String!
    ): Client
    updatePassword(password: String!, newPassword: String!): Client
    updateSubscribe(subscribe: Boolean!): Client
    destroyAccount(password: String!): Client
    resetPassword(email: String!): Client
    markResponded(inquiryId: ID!): Inquiry
    deleteInquiry(inquiryId: ID!): Inquiry
  }
`;

module.exports = typeDefs;
