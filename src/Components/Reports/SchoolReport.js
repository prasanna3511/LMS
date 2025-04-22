import React from 'react';

const SchoolReportPage = () => {
  const schoolData = [
    {
      id: 'SCH001',
      name: 'Greenwood High',
      contact: '022-456789',
      mobile: '9876543210',
      whatsapp: '9876543210',
      email: 'info@greenwood.com',
      chairman: 'Mr. Desai',
      principal: 'Mrs. Rao',
      totalTeachers: 50,
      totalStudents: 1200,
      joinedStudents: 100,
      joiningDate: '2010-06-15',
      holidays: 20,
      expenses: '₹50L',
      totalStaff: 80,
      area: 'Bangalore',
      photo: 'https://via.placeholder.com/40'
    },
    {
      id: 'SCH002',
      name: 'Sunrise Academy',
      contact: '020-123456',
      mobile: '9123456780',
      whatsapp: '9123456780',
      email: 'contact@sunrise.edu',
      chairman: 'Mrs. Kapoor',
      principal: 'Mr. Singh',
      totalTeachers: 40,
      totalStudents: 950,
      joinedStudents: 80,
      joiningDate: '2012-08-01',
      holidays: 18,
      expenses: '₹45L',
      totalStaff: 70,
      area: 'Pune',
      photo: 'https://via.placeholder.com/40'
    }
  ];

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by school name"
          style={{ padding: '10px', width: '300px', borderRadius: '20px', border: '1px solid #ccc' }}
        />
        <div>
        </div>
      </div>

      <h2 style={{ color: 'orange', marginTop: '30px' }}>School Report</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ textAlign: 'left', backgroundColor: '#f5f5f5' }}>
            <th style={thStyle}>School ID</th>
            <th style={thStyle}>School Name</th>
            <th style={thStyle}>Contact No.</th>
            <th style={thStyle}>Mobile No.</th>
            <th style={thStyle}>WhatsApp No.</th>
            <th style={thStyle}>Email Address</th>
            <th style={thStyle}>Chairman</th>
            <th style={thStyle}>Principal</th>
            <th style={thStyle}>Total Teachers</th>
            <th style={thStyle}>Total Students</th>
            <th style={thStyle}>Joined Students</th>
            <th style={thStyle}>Date of Joining</th>
            <th style={thStyle}>Holidays</th>
            <th style={thStyle}>Annual Expenses</th>
            <th style={thStyle}>Total Staff</th>
            <th style={thStyle}>Area</th>
            <th style={thStyle}>Photo</th>
          </tr>
        </thead>
        <tbody>
          {schoolData.map((school, index) => (
            <tr key={index}>
              <td style={tdStyle}>{school.id}</td>
              <td style={tdStyle}>{school.name}</td>
              <td style={tdStyle}>{school.contact}</td>
              <td style={tdStyle}>{school.mobile}</td>
              <td style={tdStyle}>{school.whatsapp}</td>
              <td style={tdStyle}>{school.email}</td>
              <td style={tdStyle}>{school.chairman}</td>
              <td style={tdStyle}>{school.principal}</td>
              <td style={tdStyle}>{school.totalTeachers}</td>
              <td style={tdStyle}>{school.totalStudents}</td>
              <td style={tdStyle}>{school.joinedStudents}</td>
              <td style={tdStyle}>{school.joiningDate}</td>
              <td style={tdStyle}>{school.holidays}</td>
              <td style={tdStyle}>{school.expenses}</td>
              <td style={tdStyle}>{school.totalStaff}</td>
              <td style={tdStyle}>{school.area}</td>
              <td style={tdStyle}><img src={school.photo} alt="school" /></td>
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

export default SchoolReportPage;
