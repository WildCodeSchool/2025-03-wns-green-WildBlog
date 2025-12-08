import { gql } from "@apollo/client";

export const GET_ALL_TAGS = gql `
    query Query {
        getAllTags {
            id
            name
        }
    }
`
;