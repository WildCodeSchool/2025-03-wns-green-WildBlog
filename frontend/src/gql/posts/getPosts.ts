import { gql } from "@apollo/client";

export const GET_POSTS = gql`
    query GetPosts {
        getPosts {
        title
        slug
        content
        coverImage
        createdAt
        updatedAt
        statusLabel
        category {
            id
            description
            name
            createdAt
            updatedAt
        }
        author {
            id
            email
            firstName
            lastName
        }
        id
        publicationEndDate
        publicationStartDate
        
        tags {
            id
            createdAt
            updatedAt
            name
        }
        }
    }
`;