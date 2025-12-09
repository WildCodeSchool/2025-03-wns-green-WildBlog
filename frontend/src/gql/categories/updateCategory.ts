import { gql } from "@apollo/client";

export const UPDATE_CATEGORY = gql `
    mutation UpdateCategory($data: UpdateCategoryInput!, $id: Float!) {
        updateCategory(data: $data, id: $id) {
            id
            name
            description
        }
    }`
;