import { gql } from "@apollo/client";

export const GET_PUBLIC_POST = gql `
query GetPublicPost($postSlug: String!, $blogSlug: String!) {
  getPublicPost(postSlug: $postSlug, blogSlug: $blogSlug) {
      id
    title
    slug
    content
    coverImage
    createdAt
    updatedAt
    author {
      id
      firstName
      lastName
      email
    }
    tags {
      id
      name
    }
    category {
      id
      name
      description
    }
    likesCount
    commentsCount
    createdAt
    updatedAt
  }
}`
;
