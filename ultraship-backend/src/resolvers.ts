import { employees, Employee } from "./data.js";

interface Context {
  role: string;
}

export const resolvers = {
  Query: {
    employees: (
      _: unknown,
      args: { page?: number; limit?: number },
      context: Context
    ): Employee[] => {
      const { page = 1, limit = 10 } = args;
      const start = (page - 1) * limit;
      return employees.slice(start, start + limit);
    },

    employee: (_: unknown, args: { id: string }, context: Context): Employee | undefined => {
      return employees.find(e => e.id === args.id);
    },
  },

  Mutation: {
    addEmployee: (
      _: unknown,
      args: { input: Omit<Employee, "id"> },
      context: Context
    ): Employee => {
      console.log("Context in resolver:", context);
      console.log("Context role:", context.role);
      
      if(context.role !== "admin"){
        throw new Error(`Not authorized. Role is: ${context.role}`);
      }
      const newEmployee: Employee = {
        id: Date.now().toString(),
        ...args.input,
      };
      employees.push(newEmployee);
      return newEmployee;
    },

    updateEmployee: (
      _: unknown,
      args: { id: string; input: Omit<Employee, "id"> },
      context: Context
    ): Employee | null => {
      if(context.role !== "admin"){
        throw new Error("Not authorized");
      }
      const index = employees.findIndex(e => e.id === args.id);
      if (index === -1) return null;

      employees[index] = {
        ...employees[index],
        ...args.input,
      };
      return employees[index];
    },
  },
};
