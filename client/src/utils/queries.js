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
const QUERY_ACTIVE_CLIENTS = gql`
  query ActiveClients {
    activeClients {
      _id
      firstName
      lastName
      email
      phone
      street
      city
      state
      zip
      commMethod
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
        property {
          _id
        }
        startTime
      }
      active
    }
  }
`;
const QUERY_CLIENT_BY_ID = gql`
  query ClientById($clientId: ID!) {
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
        depositAmount
        depositPaid
        discount
        notes
        paid
      }
      commMethod
      subscribe
      verified
      quoted
      properties {
        _id
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
        notes
        property {
          _id
        }
        startTime
        invoice {
          _id
        }
      }
      active
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
        amount
        createdAt
        dateOfCleaning
        depositAmount
        depositPaid
        depositPaymentMethod
        discount
        deposit
        notes
        paid
        paymentMethod
        services
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

const QUERY_OPEN_INVOICES = gql`
  query OpenInvoices {
    openInvoices {
      _id
      amount
      client {
        _id
        firstName
        lastName
      }
      createdAt
      dateOfCleaning
      depositAmount
      depositPaid
      depositPaymentMethod
      discount
      deposit
      notes
      paid
      paymentMethod
      services
      cleaning {
        _id
      }
    }
  }
`;

export {
  QUERY_INQUIRIES,
  QUERY_OPEN_INVOICES,
  QUERY_ACTIVE_CLIENTS,
  QUERY_CLIENT_BY_ID,
  QUERY_ME,
};
