import { gql } from "@apollo/client";

export const GET_COMMENTS_BY_POST = gql`
  query GetCommentsByPost($postId: Int!) {
    getCommentsByPost(postId: $postId) {
      id
      content
      createdAt
      author {
        id
        firstName
        lastName
      }
      anonymousId
      anonymousName
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($data: CommentInput!) {
    createComment(data: $data) {
      id
      content
      createdAt
      author {
        id
        firstName
        lastName
      }
      anonymousId
      anonymousName
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: Int!, $anonymousId: String) {
    deleteComment(id: $id, anonymousId: $anonymousId)
  }
`;