import { gql } from "@apollo/client";

export const GET_PUBLIC_BLOG = gql `
query Query($slug: String!) {
  getPublicBlog(slug: $slug) {
    id
    name
    slug
    description
    createdAt
    updatedAt
    author {
      id
      firstName
      lastName
      email
    }
  }
}`
