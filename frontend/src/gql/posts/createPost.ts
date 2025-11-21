import { gql } from "@apollo/client";

export const CREATE_POST = gql`
    mutation CreatePost($data: PostInput!) {
    createPost(data: $data) {
        id
        title
        createdAt
        updatedAt
        publicationStartDate
        publicationEndDate
        category {
        id
        name
        }
        statusLabel
        slug
        tags {
        id
        name
        }
        author {
        email
        firstName
        }
    }

    }`
;