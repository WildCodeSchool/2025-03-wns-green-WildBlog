import { gql } from "@apollo/client";

export const DELETE_POST = gql`
    mutation Mutation($id: Float!) {
    deletePost(id: $id)
    }`
;