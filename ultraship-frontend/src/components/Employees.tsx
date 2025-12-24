import React, { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_EMPLOYEES } from '../queries';
import './Employees.css';
import { EmployeeGrid } from './EmployeeGrid';
import { EmployeeTile } from './EmployeeTile';
import { EmployeeDetail } from './EmployeeDetail';
import { EmployeeForm } from './EmployeeForm';

export interface Employee {
  id: string;
  name: string;
  age: number;
  class: string;
  subjects: string[];
  attendance: number;
}

export const Employees: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'tile'>('grid');
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const { data, loading, error } = useQuery<{ employees: Employee[] }>(GET_EMPLOYEES, {
    variables: { 
      page, 
      limit: 10, 
      sortBy: 'id', 
      sortOrder: 'desc',
      filterName: searchTerm 
    },
  });

  const handleEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingEmployee(null);
    setIsFormOpen(true);
  };

  if (loading) return <div className="loading">Loading employees...</div>;
  if (error) return <div className="error">Error loading data!</div>;
  if (!data) return <div className="error">No data found</div>;

  return (
    <div className="employees-container">
      <div className="employees-header">
        <div>
          <h2>Employee Directory</h2>
          <p className="subtitle">Manage your team members</p>
        </div>
        
        <div className="controls">
          <button className="btn btn-primary" onClick={handleAdd}>+ Add Employee</button>
          <input 
            type="text" 
            placeholder="Search employees..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'tile' ? 'active' : ''}`}
              onClick={() => setViewMode('tile')}
            >
              Tile
            </button>
          </div>
        </div>
      </div>

      <div className="employees-content">
        {viewMode === 'grid' ? (
          <EmployeeGrid 
            employees={data.employees} 
            onSelect={setSelectedEmployee} 
            onEdit={handleEdit}
          />
        ) : (
          <div className="tile-container">
            {data.employees.map((emp: Employee) => (
              <EmployeeTile 
                key={emp.id} 
                employee={emp} 
                onSelect={setSelectedEmployee} 
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>

      {selectedEmployee && (
        <EmployeeDetail 
          employee={selectedEmployee} 
          onClose={() => setSelectedEmployee(null)}
          onEdit={() => {
            setSelectedEmployee(null);
            handleEdit(selectedEmployee);
          }}
        />
      )}

      {isFormOpen && (
        <EmployeeForm 
          employee={editingEmployee}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};
