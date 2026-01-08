import { gql } from "@apollo/client";

export const GET_PUBLIC_POSTS = gql`
    query GetPublicPosts($skip: Int, $take: Int, $categoryId: Int) {
        getPublicPosts(skip: $skip, take: $take, categoryId: $categoryId) {
            id
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
            publicationEndDate
            publicationStartDate
            tags {
                id
                createdAt
                updatedAt
                name
            }
            likes
            comments
        }
    }
`;