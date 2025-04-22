import React from 'react';

const StudentReportPage = () => {
  const studentData = [
    {
      id: 'STU001',
      name: 'Aarav Mehta',
      grade: '8th',
      school: 'Greenwood High',
      teacher: 'Ms. Sharma',
      parent: 'Ramesh Mehta',
      relation: 'Father',
      email: 'aarav@example.com',
      dob: '2009-07-15',
      contact: '9876543210',
      whatsapp: '9876543210',
      address: 'Mumbai',
      totalSession: 40,
      attendedSession: 38,
      absent: 2,
      progress: 'Excellent',
      newProjects: 3,
      totalTests: 4,
      appeared: 4,
      skipped: 0,
      marks: 400,
      scored: '95%',
      photo: 'https://via.placeholder.com/40'
    },
    {
      id: 'STU002',
      name: 'Sneha Patel',
      grade: '9th',
      school: 'Sunrise Academy',
      teacher: 'Mr. Verma',
      parent: 'Kiran Patel',
      relation: 'Mother',
      email: 'sneha@example.com',
      dob: '2008-05-22',
      contact: '9123456780',
      whatsapp: '9123456780',
      address: 'Pune',
      totalSession: 42,
      attendedSession: 40,
      absent: 2,
      progress: 'Good',
      newProjects: 2,
      totalTests: 4,
      appeared: 3,
      skipped: 1,
      marks: 380,
      scored: '90%',
      photo: 'https://via.placeholder.com/40'
    }
  ];

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by name"
          style={{ padding: '10px', width: '300px', borderRadius: '20px', border: '1px solid #ccc' }}
        />
        <div>
      
        </div>
      </div>

      <h2 style={{ color: 'orange', marginTop: '30px' }}>Student Report</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ textAlign: 'left', backgroundColor: '#f5f5f5' }}>
            <th style={thStyle}>Student ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Grade</th>
            <th style={thStyle}>School Name</th>
            <th style={thStyle}>Teacher Name</th>
            <th style={thStyle}>Parent Name</th>
            <th style={thStyle}>Relation</th>
            <th style={thStyle}>Email ID</th>
            <th style={thStyle}>DOB</th>
            <th style={thStyle}>Contact No.</th>
            <th style={thStyle}>WhatsApp No.</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Total Session</th>
            <th style={thStyle}>Attended Session</th>
            <th style={thStyle}>Absent</th>
            <th style={thStyle}>Work Progress</th>
            <th style={thStyle}>New Projects</th>
            <th style={thStyle}>Total Tests Given</th>
            <th style={thStyle}>Appeared</th>
            <th style={thStyle}>Skipped</th>
            <th style={thStyle}>Total Marks</th>
            <th style={thStyle}>Scored(%)</th>
            <th style={thStyle}>Photo</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((student, index) => (
            <tr key={index}>
              <td style={tdStyle}>{student.id}</td>
              <td style={tdStyle}>{student.name}</td>
              <td style={tdStyle}>{student.grade}</td>
              <td style={tdStyle}>{student.school}</td>
              <td style={tdStyle}>{student.teacher}</td>
              <td style={tdStyle}>{student.parent}</td>
              <td style={tdStyle}>{student.relation}</td>
              <td style={tdStyle}>{student.email}</td>
              <td style={tdStyle}>{student.dob}</td>
              <td style={tdStyle}>{student.contact}</td>
              <td style={tdStyle}>{student.whatsapp}</td>
              <td style={tdStyle}>{student.address}</td>
              <td style={tdStyle}>{student.totalSession}</td>
              <td style={tdStyle}>{student.attendedSession}</td>
              <td style={tdStyle}>{student.absent}</td>
              <td style={tdStyle}>{student.progress}</td>
              <td style={tdStyle}>{student.newProjects}</td>
              <td style={tdStyle}>{student.totalTests}</td>
              <td style={tdStyle}>{student.appeared}</td>
              <td style={tdStyle}>{student.skipped}</td>
              <td style={tdStyle}>{student.marks}</td>
              <td style={tdStyle}>{student.scored}</td>
              <td style={tdStyle}><img src={student.photo} alt="profile" /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button style={buttonStyle}>Edit</button>
        <button style={buttonStyle}>Delete</button>
      </div>
    </div>
  );
};

const thStyle = {
  padding: '10px',
  fontWeight: 'bold'
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #eee'
};

const buttonStyle = {
  backgroundColor: '#1A1457',
  color: 'white',
  padding: '10px 20px',
  margin: '0 10px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};

export default StudentReportPage;
