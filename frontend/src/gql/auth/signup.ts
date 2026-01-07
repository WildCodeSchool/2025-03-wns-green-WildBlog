import { gql } from "@apollo/client";

export const SIGNUP = gql`
mutation SignUp($data: SignupInput!) {
    signUp(data: $data) {
    blogs {
      name
      description
      author{
        firstName,
        lastName
      }} 
    firstName
    lastName
    email
    }
  }
`
;



