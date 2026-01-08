import { gql } from "@apollo/client";

export const UPDATE_POST = gql `
    mutation Mutation($data: UpdatePostInput!, $id: Float!) {
    updatePost(data: $data, id: $id) {
        id
        createdAt
        updatedAt
        author {
        id
        firstName
        lastName
        }
        category {
        id
        name
        }
        title
        slug
        content
        coverImage
        publicationStartDate
        publicationEndDate
        tags {
        id
        name
        }
        status
        statusLabel
    }
    }`
;
