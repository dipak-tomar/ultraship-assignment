import React from 'react';
import { Employee } from './Employees';
import './EmployeeDetail.css';

interface Props {
  employee: Employee;
  onClose: () => void;
  onEdit: () => void;
}

export const EmployeeDetail: React.FC<Props> = ({ employee, onClose, onEdit }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="detail-header">
          <div className="detail-avatar">{employee.name.charAt(0)}</div>
          <div className="detail-title">
            <h2>{employee.name}</h2>
            <span className="detail-badge">Class {employee.class}</span>
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-section">
            <h3>Personal Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>ID</label>
                <p>{employee.id}</p>
              </div>
              <div className="detail-item">
                <label>Age</label>
                <p>{employee.age}</p>
              </div>
              <div className="detail-item">
                <label>Gender</label>
                <p>N/A</p>
              </div>
              <div className="detail-item">
                <label>Contact</label>
                <p>+1 234 567 890</p>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Academic Performance</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Attendance</label>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${employee.attendance}%`,
                      background: employee.attendance && employee.attendance > 75 ? '#2ecc71' : '#e74c3c'
                    }}
                  ></div>
                </div>
                <p className="small-text">{employee.attendance}% Present</p>
              </div>
              <div className="detail-item full-width">
                <label>Subjects</label>
                <div className="tags">
                  {employee.subjects?.map(sub => (
                    <span key={sub} className="tag">{sub}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="detail-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={onEdit}>Edit Record</button>
        </div>
      </div>
    </div>
  );
};
