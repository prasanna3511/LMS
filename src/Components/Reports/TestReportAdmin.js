import React from 'react';

const TestReportPage = () => {
  const testData = [
    {
      teacherName: 'Ms. Sharma',
      testNo: 'TST101',
      testDate: '2024-09-12',
      studentName: 'Aarav Mehta',
      studentId: 'STU001',
      schoolName: 'Greenwood High',
      marksObtained: 38,
      totalMarks: 40,
      status: 'Passed'
    },
    {
      teacherName: 'Mr. Verma',
      testNo: 'TST102',
      testDate: '2024-09-18',
      studentName: 'Sneha Patel',
      studentId: 'STU002',
      schoolName: 'Sunrise Academy',
      marksObtained: 32,
      totalMarks: 40,
      status: 'Passed'
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

      <h2 style={{ color: 'orange', marginTop: '30px' }}>Test Report</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ textAlign: 'left', backgroundColor: '#f5f5f5' }}>
            <th style={thStyle}>Teacher Name</th>
            <th style={thStyle}>Test No.</th>
            <th style={thStyle}>Test Date</th>
            <th style={thStyle}>Student Name</th>
            <th style={thStyle}>Student ID</th>
            <th style={thStyle}>School Name</th>
            <th style={thStyle}>Marks Obtained</th>
            <th style={thStyle}>Total Marks</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {testData.map((test, index) => (
            <tr key={index}>
              <td style={tdStyle}>{test.teacherName}</td>
              <td style={tdStyle}>{test.testNo}</td>
              <td style={tdStyle}>{test.testDate}</td>
              <td style={tdStyle}>{test.studentName}</td>
              <td style={tdStyle}>{test.studentId}</td>
              <td style={tdStyle}>{test.schoolName}</td>
              <td style={tdStyle}>{test.marksObtained}</td>
              <td style={tdStyle}>{test.totalMarks}</td>
              <td style={tdStyle}>{test.status}</td>
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

export default TestReportPage;
