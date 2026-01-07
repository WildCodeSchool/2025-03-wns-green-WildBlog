import { gql } from "@apollo/client"

export const GET_CATEGORIES = gql`
  query GetAllCategoriesByBlog($blogId: Float!) {
    getAllCategoriesByBlog(blogId: $blogId) {
      id
      name
      description
      createdAt
      updatedAt
      posts {
        id
        title
      }
    }
  }`
;


