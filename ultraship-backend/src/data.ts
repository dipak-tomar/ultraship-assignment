export interface Employee {
  id: string;
  name: string;
  age?: number;
  class?: string;
  subjects?: string[];
  attendance?: number;
}

export const employees: Employee[] = [];

// Helper to generate dummy data
const generateData = () => {
  const classes = ["10A", "10B", "11A", "11B", "12A"];
  const subjectsList = ["Math", "Physics", "Chemistry", "Biology", "English", "History"];
  
  for (let i = 1; i <= 50; i++) {
    employees.push({
      id: i.toString(),
      name: `Employee ${i}`,
      age: 20 + (i % 30),
      class: classes[i % classes.length],
      subjects: [subjectsList[i % subjectsList.length], subjectsList[(i+1) % subjectsList.length]],
      attendance: 60 + (i % 40),
    });
  }
};

generateData();
