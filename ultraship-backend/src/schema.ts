export const typeDefs = `#graphql
  type Employee {
    id: ID!
    name: String!
    age: Int
    class: String
    subjects: [String]
    attendance: Int
  }

  input EmployeeInput {
    name: String!
    age: Int
    class: String
    subjects: [String]
    attendance: Int
  }

  type Query {
    employees(
      page: Int
      limit: Int
      sortBy: String
      sortOrder: String
      filterName: String
      filterClass: String
    ): [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(input: EmployeeInput!): Employee
    updateEmployee(id: ID!, input: EmployeeInput!): Employee
  }
`;
