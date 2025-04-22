import React, { useState } from 'react';

const StudentAttendance = () => {
  const [students, setStudents] = useState([
    { name: 'Raj Patil', present: true, description: '', session: '' },
    { name: 'Sayali Shah', present: true, description: '', session: '' },
    { name: 'Vardhan Joshi', present: false, description: '', session: '' },
    { name: 'Arya Khot', present: false, description: '', session: '' },
  ]);

  const handleCheckboxChange = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].present = !updatedStudents[index].present;
    setStudents(updatedStudents);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedStudents = [...students];
    updatedStudents[index].description = value;
    setStudents(updatedStudents);
  };

  const handleSessionChange = (index, value) => {
    const updatedStudents = [...students];
    updatedStudents[index].session = value;
    setStudents(updatedStudents);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input type="text" placeholder="Search..." style={{ padding: '8px 12px', borderRadius: '20px', border: '1px solid #ccc',  width: '250px' }} />
          <button style={{ backgroundColor: '#3A2D7D', color: '#fff', border: 'none', borderRadius: 20, cursor: 'pointer',padding:8 }}>Search</button>
        </div>
        <select style={{ padding: '8px 12px', fontSize: '14px',width:200 }}>
          <option>Select Std</option>
          <option>Class 1</option>
          <option>Class 2</option>
        </select>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="https://via.placeholder.com/40" alt="Profile" style={{ borderRadius: '50%', marginRight: '10px' }} />
          <div>
            <div style={{ fontWeight: 'bold' }}>Sangeeta</div>
            <div style={{ fontSize: '12px', color: '#888' }}>Teacher</div>
          </div>
        </div>
      </div>

      <h2 style={{ color: 'orange', marginBottom: '20px' }}>Student Attendance</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '10px' }}>Student Name</th>
            <th style={{ padding: '10px' }}>Present / Absent</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Description <span style={{ fontSize: '12px', color: 'gray' }}>(Non Mandatory)</span></th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Session<br /><span style={{ fontSize: '12px' }}>(Pick Session from)</span></th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td style={{ padding: '10px' }}>{student.name}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <input type="checkbox" checked={student.present} onChange={() => handleCheckboxChange(index)} />
              </td>
              <td style={{ padding: '10px' }}>
                <input
                  type="text"
                  placeholder="Optional description"
                  value={student.description}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  style={{ width: '90%', padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </td>
              <td style={{ padding: '10px' }}>
                <select
                  value={student.session}
                  onChange={(e) => handleSessionChange(index, e.target.value)}
                  style={{ width: '100%', padding: '6px', borderRadius: '4px' }}
                >
                  <option value="">Select Session</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentAttendance;
