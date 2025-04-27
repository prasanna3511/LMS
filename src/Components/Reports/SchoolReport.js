import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './StudentReportPage.css';


const SchoolReportPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRow, setSelectedRow] = useState(null); // To track selected row
  const [schoolData, setSchoolData] = useState([
    {
      id: '1',
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
      id: '2',
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
  ]);

  // Filtered school data based on search term
  const filteredData = schoolData.filter((school) =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (index) => {
    setSelectedRow(index === selectedRow ? null : index); // Toggle row selection
  };

  const handleInputChange = (e, key, index) => {
    const updatedData = [...schoolData];
    updatedData[index][key] = e.target.value;
    setSchoolData(updatedData);
  };

  const handleEdit = () => {
    if (selectedRow !== null) {
      // Here, the selected row's columns are editable already, no need for extra logic for editing.
      alert('You can directly edit the fields in the row.');
    }
  };

  const handleDelete = () => {
    if (selectedRow !== null) {
      const updatedData = schoolData.filter((_, index) => index !== selectedRow);
      setSchoolData(updatedData);
      setSelectedRow(null); // Deselect after delete
    }
  };

  return (
    <div style={{width:'100%'}} >
    <div className="header-container">
    <input
          type="text"
          placeholder="Search by school name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '17px', border: '1px solid #ccc' }}
        />
   
<Navbar/>
</div>
    <div style={{ paddingTop: '30px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    
      </div>

      <h2 style={{ color: '#F75F00', marginTop: '30px' }}>School Report</h2>

      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
            {filteredData.map((school, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(index)} // Click to select row
                style={{
                  backgroundColor: selectedRow === index ? '#e0e0e0' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                {Object.keys(school).map((key, idx) => (
                  <td key={idx} style={tdStyle}>
                    {selectedRow === index ? (
                      key === 'photo' ? (
                        // Display photo column as an image without editing
                        <img src={school[key]} alt="school" style={{ width: '40px', height: '40px' }} />
                      ) : (
                        // Make all other fields editable
                        <input
                          type="text"
                          value={school[key]}
                          onChange={(e) => handleInputChange(e, key, index)}
                          style={{ padding: '5px', width: '100%', borderRadius: '5px' }}
                        />
                      )
                    ) : (
                      school[key] // Display regular data if not in selected row
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button style={buttonStyle} onClick={handleEdit}>Save</button>
        <button style={buttonStyle} onClick={handleDelete}>Delete</button>
      </div>
    </div>
    </div>
  );
};

const thStyle = {
  padding: '10px',
  fontWeight: 'bold',
  position: 'sticky',
  top: '0', // Makes the header sticky
  backgroundColor: '#f5f5f5', // Ensure the header stays visible
  zIndex: '1', // Ensure the header stays on top of the rows
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
