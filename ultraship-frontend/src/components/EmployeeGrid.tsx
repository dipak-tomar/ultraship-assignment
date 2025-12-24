import React from 'react';
import { Employee } from './Employees';
import './EmployeeGrid.css';

interface Props {
  employees: Employee[];
  onSelect: (emp: Employee) => void;
  onEdit: (emp: Employee) => void;
}

export const EmployeeGrid: React.FC<Props> = ({ employees, onSelect, onEdit }) => {
  return (
    <div className="grid-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Class</th>
            <th>Attendance</th>
            <th>Subjects</th>
            <th>Status</th>
            <th>Grade</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} onClick={() => onSelect(emp)}>
              <td>#{emp.id}</td>
              <td className="font-bold">{emp.name}</td>
              <td>{emp.age}</td>
              <td><span className="badge class-badge">{emp.class}</span></td>
              <td>
                <div className="attendance-bar">
                  <div 
                    className="attendance-fill" 
                    style={{ width: `${emp.attendance}%`, background: emp.attendance && emp.attendance > 75 ? '#2ecc71' : '#e74c3c' }}
                  ></div>
                  <span>{emp.attendance}%</span>
                </div>
              </td>
              <td>{emp.subjects?.join(', ')}</td>
              <td><span className="status-dot active"></span> Active</td>
              <td>A</td>
              <td>Today</td>
              <td>
                <button 
                  className="action-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(emp);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
