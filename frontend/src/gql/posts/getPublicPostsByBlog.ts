import { gql } from "@apollo/client";

export const GET_PUBLIC_POSTS_BY_BLOG = gql `
query GetPublicPostsByBlog($blogSlug: String!) {
  getPublicPostsByBlog(blogSlug: $blogSlug) {
    id
    title
    content
    slug
    coverImage
    createdAt
    updatedAt
    author {
      id
      lastName
      firstName
    }
    category {
      id
      name
    }
    tags {
      id
      name
    }
    blog {
      id
      name
      slug
      author {
        id
        email
      }
    }
    likesCount
    commentsCount
    createdAt
    updatedAt
  }
}`
