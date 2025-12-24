import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client/react';
import { ADD_EMPLOYEE, UPDATE_EMPLOYEE, GET_EMPLOYEES } from '../queries';
import { Employee } from './Employees';
import './EmployeeForm.css';

interface Props {
  employee?: Employee | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const EmployeeForm: React.FC<Props> = ({ employee, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: 18,
    class: '10A',
    attendance: 100,
    subjects: ''
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        age: employee.age,
        class: employee.class,
        attendance: employee.attendance,
        subjects: employee.subjects.join(', ')
      });
    }
  }, [employee]);

  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES, variables: { page: 1, limit: 10 } }],
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES, variables: { page: 1, limit: 10 } }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = {
      ...formData,
      age: parseInt(formData.age as any),
      attendance: parseInt(formData.attendance as any),
      subjects: formData.subjects.split(',').map(s => s.trim())
    };

    try {
      if (employee) {
        await updateEmployee({ variables: { id: employee.id, input }, context: { headers: { role: 'admin' } } });
      } else {
        await addEmployee({ variables: { input }, context: { headers: { role: 'admin' } } });
      }
      onSuccess();
    } catch (err) {
      alert('Error saving employee. Make sure you are authorized (Admin).');
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="form-header">
          <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              required 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Age</label>
              <input 
                type="number" 
                required 
                value={formData.age} 
                onChange={e => setFormData({...formData, age: parseInt(e.target.value)})}
              />
            </div>
            <div className="form-group">
              <label>Class</label>
              <select 
                value={formData.class} 
                onChange={e => setFormData({...formData, class: e.target.value})}
              >
                <option>10A</option>
                <option>10B</option>
                <option>11A</option>
                <option>11B</option>
                <option>12A</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Attendance (%)</label>
            <input 
              type="number" 
              min="0" 
              max="100" 
              value={formData.attendance} 
              onChange={e => setFormData({...formData, attendance: parseInt(e.target.value)})}
            />
          </div>

          <div className="form-group">
            <label>Subjects (comma separated)</label>
            <input 
              type="text" 
              placeholder="Math, Physics, ..." 
              value={formData.subjects} 
              onChange={e => setFormData({...formData, subjects: e.target.value})}
            />
          </div>

          <div className="form-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};
