import { useQuery } from "@apollo/client/react";
import { GET_EMPLOYEES } from "./queries";


interface Employee {
  id: string;
  name: string;
  class?: string;
  attendance?: number;
}

interface GetEmployeesData {
  employees: Employee[];
}


function App() {
  const { data, loading, error } = useQuery<GetEmployeesData>(GET_EMPLOYEES, {
    variables: { page: 1, limit: 10 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {data?.employees?.map((e: any) => (
        <div key={e.id}>
          {e.name} - {e.class}
        </div>
      ))}
    </div>
  );
}

export default App;
