import { gql } from "@apollo/client";

// si je mets Float! au lieu de Int! ça me met une erreur sur la page blog public

export const GET_POST_BY_ID = gql`
    query Query($id: Int!) {        
    getPostById(id: $id) {
        title
        content
        coverImage
        publicationStartDate
        publicationEndDate
        createdAt
        updatedAt
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
        likesCount
        commentsCount
        comments {
            id
        }
    }
    }`
;
