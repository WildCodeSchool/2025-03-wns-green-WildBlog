import { gql } from "@apollo/client"

export const GET_CATEGORIES = gql`
  query Query {
    getAllCategories {
        id
        name
        createdAt
        updatedAt
        description
        posts {
          id
          title
      }
    }
  }`
;