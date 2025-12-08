import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql `
    mutation UpdateCategory($data: UpdateCategoryInput!, $categoryId: Float!) {
        updateCategory(data: $data, id: $categoryId) {
            id
            name
            description
        }
    }`
;