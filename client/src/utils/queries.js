import { gql } from "@apollo/client";

const QUERY_INQUIRIES = gql`
  query Query {
    inquiries {
      _id
      active
      commMethod
      createdAt
      email
      location
      message
      name
      phone
      responded
    }
  }
`;
const QUERY_USER_BY_ID = gql`
  query Query($clientId: ID!) {
    clientById(clientId: $clientId) {
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
        amount
        discount
        dateOfClean
        notes
        active
        depositPaid
        depositAmount
      }
      commMethod
      subscribe
      verified
      quoted
    }
  }
`;

export { QUERY_INQUIRIES, QUERY_USER_BY_ID };
