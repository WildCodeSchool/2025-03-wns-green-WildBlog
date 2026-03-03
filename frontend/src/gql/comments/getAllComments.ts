import { gql } from "@apollo/client";

export const GET_ALL_COMMENTS = gql`
  query GetAllComments {
    getAllComments {
      id
      content
      createdAt
      post {
        id
        title
      }
      author {
        id
        firstName
        lastName
        email
      }
      anonymousId
      anonymousName
    }
  }
`;
