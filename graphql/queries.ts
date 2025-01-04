import { gql } from "@apollo/client";

export const GET_RESULT = gql`
  query GetResult {
    result {
      id
      user {
        id
        login
      }
    }
  }
`;
