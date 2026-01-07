// import { gql } from "@apollo/client";

// export const UPDATE_CATEGORY = gql `
//     mutation UpdateCategory($data: UpdateCategoryInput!, $id: Float!) {
//         updateCategory(data: $data, id: $id) {
//             id
//             name
//             description
//         }
//     }`
// ;

import { gql } from "@apollo/client";

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: Float!, $blogId: Float!, $data: UpdateCategoryInput!) {
    updateCategory(id: $id, blogId: $blogId, data: $data) {
      id
      name
      description
    }
  }
`;
