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

export { QUERY_INQUIRIES };
