import { gql } from "@apollo/client";

export const GET_CATEGORY_BY_ID = gql `
query GetCategoryById($blogId: Float!, $id: Float!) {
  getCategoryById(blogId: $blogId, id: $id) {
    id
    name
    description
    blog {
      id
      name
    }
  }
}`