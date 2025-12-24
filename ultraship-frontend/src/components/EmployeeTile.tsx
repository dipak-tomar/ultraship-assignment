import React, { useState } from 'react';
import { Employee } from './Employees';
import './EmployeeTile.css';

interface Props {
  employee: Employee;
  onSelect: (emp: Employee) => void;
  onEdit: (emp: Employee) => void;
}

export const EmployeeTile: React.FC<Props> = ({ employee, onSelect, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(employee);
    setShowMenu(false);
  };

  return (
    <div className="employee-tile" onClick={() => onSelect(employee)}>
      <div className="tile-header">
        <div className="avatar">{employee.name.charAt(0)}</div>
        <div className="tile-actions">
          <button className="bun-button" onClick={handleMenuClick}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          {showMenu && (
            <div className="tile-menu" onClick={(e) => e.stopPropagation()}>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={() => alert('Flag')}>Flag</button>
              <button className="delete" onClick={() => alert('Delete')}>Delete</button>
            </div>
          )}
        </div>
      </div>
      
      <div className="tile-info">
        <h3>{employee.name}</h3>
        <p className="role">Student • Class {employee.class}</p>
        
        <div className="tile-stats">
          <div className="stat">
            <label>Age</label>
            <span>{employee.age}</span>
          </div>
          <div className="stat">
            <label>Attendance</label>
            <span className={employee.attendance && employee.attendance > 75 ? 'good' : 'bad'}>
              {employee.attendance}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
