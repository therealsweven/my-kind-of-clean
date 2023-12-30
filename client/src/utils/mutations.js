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

export { CREATE_INQUIRY };
