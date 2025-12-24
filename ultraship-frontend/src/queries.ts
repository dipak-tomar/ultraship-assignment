import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetEmployees($page: Int, $limit: Int) {
    employees(page: $page, limit: $limit) {
      id
      name
      class
      attendance
    }
  }
`;
