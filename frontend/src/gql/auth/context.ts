import { gql } from "@apollo/client";

export const CURRENT_USER = gql `
query CurrentUser {
  currentUser {
    firstName
    lastName
    email
  }
}
`
;