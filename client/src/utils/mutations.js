import { gql } from "@apollo/client";

const CREATE_INQUIRY = gql`
  mutation Mutation(
    $name: String!
    $email: String!
    $message: String!
    $location: String!
    $phone: String
    $commMethod: String
    $responded: Boolean
    $active: Boolean
  ) {
    createInquiry(
      name: $name
      email: $email
      message: $message
      location: $location
      phone: $phone
      commMethod: $commMethod
      responded: $responded
      active: $active
    ) {
      _id
    }
  }
`;
const CLIENT_LOGIN = gql`
  mutation ClientLogin($email: String!, $password: String!) {
    clientLogin(email: $email, password: $password) {
      token
      client {
        _id
      }
    }
  }
`;
const CREATE_CLIENT = gql`
  mutation Mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phone: String
    $street: String
    $city: String
    $state: String
    $zip: String
    $commMethod: String
    $subscribe: Boolean
  ) {
    createClient(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      phone: $phone
      street: $street
      city: $city
      state: $state
      zip: $zip
      commMethod: $commMethod
      subscribe: $subscribe
    ) {
      _id
      firstName
      lastName
      email
      phone
      password
      street
      city
      state
      zip
      invoices {
        _id
      }
      commMethod
      subscribe
    }
  }
`;
const VERIFY_EMAIL = gql`
  mutation Mutation($clientId: ID!, $emailToken: String!) {
    verifyEmail(clientId: $clientId, emailToken: $emailToken) {
      _id
      verified
    }
  }
`;

export { CREATE_INQUIRY, CLIENT_LOGIN, CREATE_CLIENT, VERIFY_EMAIL };
