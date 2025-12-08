import { gql } from "@apollo/client";

export const CREATE_TAG = gql `
    mutation Mutation($data: TagInput!) {
        createTag(data: $data) {
            id
            name
        }
    }`
;