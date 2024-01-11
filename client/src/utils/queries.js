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

const QUERY_ME = gql`
  query Query {
    me {
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
      verified
      quoted
      properties {
        city
        name
        quoted
        state
        street
        street2
        type
        zip
      }
      cleanings {
        _id
        approved
        date
        endTime
        invoice {
          _id
        }
        notes

        startTime
      }
    }
  }
`;

export { QUERY_INQUIRIES, QUERY_USER_BY_ID, QUERY_ME };
