import { gql } from "@apollo/client";

export const DELETE_CATEGORY = gql `
mutation Mutation($blogId: Float!, $id: Float!) {
  deleteCategory(blogId: $blogId, id: $id)
}`
;