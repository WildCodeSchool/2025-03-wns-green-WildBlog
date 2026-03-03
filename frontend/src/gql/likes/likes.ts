import { gql } from "@apollo/client/core";

export const LIKE_POST = gql`
  mutation LikePost($postId: Int!, $anonymousId: String) {
    likePost(postId: $postId, anonymousId: $anonymousId) {
      id
      likesCount
      isLiked
      anonymousId
    }
  }
`;

export const IS_POST_LIKED_BY_USER = gql`
  query IsPostLikedByUser($postId: Int!, $anonymousId: String) {
    isPostLikedByUser(postId: $postId, anonymousId: $anonymousId)
  }
`;