import { gql } from "@apollo/client";

export const DELETE_POST = gql`
    mutation Mutation($id: Int!) {
    deletePost(id: $id)
    }`
;