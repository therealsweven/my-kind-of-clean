const { gql } = require("apollo-server-express");

// go back and look at queries for education and experience - not necessary or is?
// unfollowEntity should reference Entity or User model?
// removeEntity should reference Entity model...?

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

  type Cleaning {
    _id: ID!
    date: String!
    dayOfWeek: String!
    repeating: String!
    startTime: String!
    endTime: String!
    client: Client
    property: Property
  }

  type Invoice {
    _id: ID!
    client: Client
    amount: Int
    discount: Int
    cleaning: Cleaning
    notes: String
    paid: Boolean
    depositPaid: Boolean
    depositAmount: Int
  }

  type Auth {
    token: ID!
    client: Client
  }

  type Query {
    clientById(clientId: ID!): Client
    me: Client
    inquiries: [Inquiry]!
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
    clientLogin(email: String!, password: String!): Auth
    verifyEmail(clientId: ID!, emailToken: String!): Client
  }
`;

module.exports = typeDefs;
