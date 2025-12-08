import { gql } from "@apollo/client";

export const UPDATE_TAG = gql `
    mutation Mutation($data: TagInput!) {
        updtaeTag(data: $data) {
            id
            name
        }
    }`
;