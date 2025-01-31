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
const CREATE_INVOICE = gql`
  mutation CreateInvoice(
    $client: ID!
    $services: String!
    $amount: Int
    $cleaning: ID
    $discount: Int
    $dateOfCleaning: String
    $notes: String
    $paid: Boolean
    $paymentMethod: String
    $deposit: Boolean
    $depositPaid: Boolean
    $depositAmount: Int
    $depositPaymentMethod: String
  ) {
    createInvoice(
      client: $client
      services: $services
      amount: $amount
      cleaning: $cleaning
      discount: $discount
      dateOfCleaning: $dateOfCleaning
      notes: $notes
      paid: $paid
      paymentMethod: $paymentMethod
      deposit: $deposit
      depositPaid: $depositPaid
      depositAmount: $depositAmount
      depositPaymentMethod: $depositPaymentMethod
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
const UPDATE_CLIENT = gql`
  mutation UpdateClient(
    $clientId: ID!
    $firstName: String
    $lastName: String
    $email: String
    $phone: String
    $street: String
    $city: String
    $state: String
    $zip: String
    $commMethod: String
  ) {
    updateClient(
      clientId: $clientId
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      street: $street
      city: $city
      state: $state
      zip: $zip
      commMethod: $commMethod
    ) {
      _id
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
const SEND_VERIFICATION_LINK = gql`
  mutation Mutation($clientId: ID!) {
    sendVerificationLink(clientId: $clientId) {
      _id
    }
  }
`;
const UPDATE_EMAIL = gql`
  mutation Mutation($email: String!) {
    updateEmail(email: $email) {
      _id
      email
    }
  }
`;
const UPDATE_PHONE = gql`
  mutation Mutation($phone: String!) {
    updatePhone(phone: $phone) {
      _id
      phone
    }
  }
`;
const UPDATE_COMM_METHOD = gql`
  mutation Mutation($commMethod: String!) {
    updateCommMethod(commMethod: $commMethod) {
      _id
      commMethod
    }
  }
`;
const UPDATE_ADDRESS = gql`
  mutation Mutation(
    $street: String!
    $city: String!
    $state: String!
    $zip: String!
  ) {
    updateAddress(street: $street, city: $city, state: $state, zip: $zip) {
      _id
      state
      street
      zip
      city
    }
  }
`;
const UPDATE_PASSWORD = gql`
  mutation Mutation($password: String!, $newPassword: String!) {
    updatePassword(password: $password, newPassword: $newPassword) {
      _id
    }
  }
`;
const UPDATE_SUBSCRIBE = gql`
  mutation UpdateSubscribe($subscribe: Boolean!) {
    updateSubscribe(subscribe: $subscribe) {
      _id
      subscribe
    }
  }
`;
const DESTROY_ACCOUNT = gql`
  mutation DestroyAccount($password: String!) {
    destroyAccount(password: $password) {
      _id
    }
  }
`;
const DELETE_INQUIRY = gql`
  mutation DeleteInquiry($inquiryId: ID!) {
    deleteInquiry(inquiryId: $inquiryId) {
      _id
    }
  }
`;
// const ADMIN_LOGIN = gql`
//   mutation Mutation($email: String!, $password: String!) {
//     adminLogin(email: $email, password: $password) {
//       _id
//       email
//       firstName
//       lastName
//       password
//     }
//   }
// `;
const MARK_RESPONDED = gql`
  mutation MarkResponded($inquiryId: ID!) {
    markResponded(inquiryId: $inquiryId) {
      _id
      active
    }
  }
`;
const UPDATE_INVOICE = gql`
  mutation UpdateInvoice(
    $invoiceId: ID!
    $services: String
    $paymentAmount: Int
    $amount: Int
    $discount: Int
    $cleaning: ID
    $notes: String
    $paid: Boolean
    $paymentMethod: String
    $deposit: Boolean
    $depositPaid: Boolean
    $depositAmount: Int
    $depositPaymentMethod: String
    $dateOfCleaning: String
  ) {
    updateInvoice(
      invoiceId: $invoiceId
      services: $services
      paymentAmount: $paymentAmount
      amount: $amount
      discount: $discount
      cleaning: $cleaning
      notes: $notes
      paid: $paid
      paymentMethod: $paymentMethod
      deposit: $deposit
      depositPaid: $depositPaid
      depositAmount: $depositAmount
      depositPaymentMethod: $depositPaymentMethod
      dateOfCleaning: $dateOfCleaning
    ) {
      _id
      depositPaid
      deposit
      paid
      paymentMethod
    }
  }
`;

export {
  CREATE_INQUIRY,
  CREATE_INVOICE,
  CLIENT_LOGIN,
  CREATE_CLIENT,
  UPDATE_CLIENT,
  VERIFY_EMAIL,
  SEND_VERIFICATION_LINK,
  UPDATE_EMAIL,
  UPDATE_PHONE,
  UPDATE_COMM_METHOD,
  UPDATE_ADDRESS,
  UPDATE_PASSWORD,
  UPDATE_SUBSCRIBE,
  DESTROY_ACCOUNT,
  DELETE_INQUIRY,
  MARK_RESPONDED,
  UPDATE_INVOICE,
};
