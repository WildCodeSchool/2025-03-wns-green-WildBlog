import { gql } from "@apollo/client";

export const GET_POST_BY_ID = gql `
    query Query($id: Float!) {
    getPostById(id: $id) {
        title
        content
        coverImage
        publicationStartDate
        publicationEndDate
        category {
        id
        name
        }
        author {
        lastName
        firstName
        email
        id
        }
    }
    }`
;
