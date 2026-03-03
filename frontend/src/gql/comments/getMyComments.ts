import { gql } from "@apollo/client";

export const GET_MY_COMMENTS = gql`
  query GetMyPosts {
    getPosts {
      id
      title
      comments {
        id
        content
        createdAt
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
  }
`;
