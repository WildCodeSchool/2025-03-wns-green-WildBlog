import { gql } from "@apollo/client";

export const GET_USER_FROM_TOKEN = gql`
 query Query($token: String!) {
    getUser(token: $token) {
      id
      lastName
      firstName
      password
      email
    }
  }
`;



