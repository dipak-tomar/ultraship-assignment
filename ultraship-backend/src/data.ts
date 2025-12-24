export interface Employee {
  id: string;
  name: string;
  age?: number;
  class?: string;
  subjects?: string[];
  attendance?: number;
}

export const employees: Employee[] = [];
