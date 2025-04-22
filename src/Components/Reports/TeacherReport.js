import React from 'react';

const TeacherReportPage = () => {
  const teacherData = [
    {
      id: 'TEA001',
      name: 'Rajesh Kumar',
      school: 'Greenwood High',
      password: '****',
      mobile: '9876543210',
      whatsapp: '9876543210',
      email: 'rajesh@example.com',
      dob: '1980-01-15',
      joiningDate: '2010-06-01',
      address: 'Mumbai',
      totalAttendance: 180,
      presentDays: 175,
      absentDays: 5,
      totalSession: 40,
      completedSessions: 38,
      pendingTests: 2,
      createdTests: 5,
      photo: 'https://via.placeholder.com/40'
    },
    {
      id: 'TEA002',
      name: 'Anita Sharma',
      school: 'Sunrise Academy',
      password: '****',
      mobile: '9123456780',
      whatsapp: '9123456780',
      email: 'anita@example.com',
      dob: '1985-03-22',
      joiningDate: '2012-08-10',
      address: 'Pune',
      totalAttendance: 175,
      presentDays: 170,
      absentDays: 5,
      totalSession: 38,
      completedSessions: 35,
      pendingTests: 3,
      createdTests: 4,
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

      <h2 style={{ color: 'orange', marginTop: '30px' }}>Teacher Report</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ textAlign: 'left', backgroundColor: '#f5f5f5' }}>
            <th style={thStyle}>Teacher ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>School Name</th>
            <th style={thStyle}>Password</th>
            <th style={thStyle}>Mobile No.</th>
            <th style={thStyle}>WhatsApp No.</th>
            <th style={thStyle}>Email ID</th>
            <th style={thStyle}>DOB</th>
            <th style={thStyle}>Joining Date</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Total Attendance</th>
            <th style={thStyle}>PresentDay</th>
            <th style={thStyle}>Absent Day</th>
            <th style={thStyle}>Total Session</th>
            <th style={thStyle}>Completed Sessions</th>
            <th style={thStyle}>Pending Tests</th>
            <th style={thStyle}>Created</th>
            <th style={thStyle}>Photo</th>
          </tr>
        </thead>
        <tbody>
          {teacherData.map((teacher, index) => (
            <tr key={index}>
              <td style={tdStyle}>{teacher.id}</td>
              <td style={tdStyle}>{teacher.name}</td>
              <td style={tdStyle}>{teacher.school}</td>
              <td style={tdStyle}>{teacher.password}</td>
              <td style={tdStyle}>{teacher.mobile}</td>
              <td style={tdStyle}>{teacher.whatsapp}</td>
              <td style={tdStyle}>{teacher.email}</td>
              <td style={tdStyle}>{teacher.dob}</td>
              <td style={tdStyle}>{teacher.joiningDate}</td>
              <td style={tdStyle}>{teacher.address}</td>
              <td style={tdStyle}>{teacher.totalAttendance}</td>
              <td style={tdStyle}>{teacher.presentDays}</td>
              <td style={tdStyle}>{teacher.absentDays}</td>
              <td style={tdStyle}>{teacher.totalSession}</td>
              <td style={tdStyle}>{teacher.completedSessions}</td>
              <td style={tdStyle}>{teacher.pendingTests}</td>
              <td style={tdStyle}>{teacher.createdTests}</td>
              <td style={tdStyle}><img src={teacher.photo} alt="profile" /></td>
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

export default TeacherReportPage;