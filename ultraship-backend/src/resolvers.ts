import { employees, Employee } from "./data.js";

interface Context {
  role: string;
}

export const resolvers = {
  Query: {
    employees: (
      _: unknown,
      args: { 
        page?: number; 
        limit?: number; 
        sortBy?: string; 
        sortOrder?: "asc" | "desc";
        filterName?: string;
        filterClass?: string;
      },
      context: Context
    ): Employee[] => {
      let filtered = [...employees];

      // Filtering
      if (args.filterName) {
        filtered = filtered.filter(e => 
          e.name.toLowerCase().includes(args.filterName!.toLowerCase())
        );
      }
      if (args.filterClass) {
        filtered = filtered.filter(e => e.class === args.filterClass);
      }

      // Sorting
      if (args.sortBy) {
        filtered.sort((a, b) => {
          let fieldA = (a as any)[args.sortBy!] ?? "";
          let fieldB = (b as any)[args.sortBy!] ?? "";

          // Numeric comparison for ID or numeric fields
          if (args.sortBy === 'id' || typeof fieldA === 'number') {
            const numA = Number(fieldA);
            const numB = Number(fieldB);
            if (!isNaN(numA) && !isNaN(numB)) {
              return args.sortOrder === "desc" ? numB - numA : numA - numB;
            }
          }
          
          if (fieldA < fieldB) return args.sortOrder === "desc" ? 1 : -1;
          if (fieldA > fieldB) return args.sortOrder === "desc" ? -1 : 1;
          return 0;
        });
      }

      // Pagination
      const { page = 1, limit = 10 } = args;
      const start = (page - 1) * limit;
      return filtered.slice(start, start + limit);
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
