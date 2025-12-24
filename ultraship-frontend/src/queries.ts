import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetEmployees(
    $page: Int
    $limit: Int
    $sortBy: String
    $sortOrder: String
    $filterName: String
    $filterClass: String
  ) {
    employees(
      page: $page
      limit: $limit
      sortBy: $sortBy
      sortOrder: $sortOrder
      filterName: $filterName
      filterClass: $filterClass
    ) {
      id
      name
      age
      class
      subjects
      attendance
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: EmployeeInput!) {
    addEmployee(input: $input) {
      id
      name
      age
      class
      subjects
      attendance
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      name
      age
      class
      subjects
      attendance
    }
  }
`;
