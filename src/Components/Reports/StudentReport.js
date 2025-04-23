import React, { useState } from 'react';

const StudentReportPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRow, setSelectedRow] = useState(null); // Track selected row
  const [editData, setEditData] = useState(null); // Track data for editing

  const studentData = [
    {
      id: '1',
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
      id: '2',
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

  const filteredData = studentData.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (id) => {
    setSelectedRow(id === selectedRow ? null : id); // Toggle selection on click
    if (editData && editData.id === id) {
      setEditData(null); // Remove edit mode if row is clicked
    }
  };

  const handleEdit = (student) => {
    setEditData(student); // Set edit mode for the selected student
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedData = studentData.map((student) =>
      student.id === editData.id ? editData : student
    );
    alert('Changes saved'); // For demonstration
    setEditData(null); // Exit edit mode
    setSelectedRow(null); // Deselect row
  };

  const handleDelete = () => {
    if (selectedRow) {
      const updatedData = studentData.filter(student => student.id !== selectedRow);
      alert('Row deleted'); // For demonstration
      setSelectedRow(null); // Deselect row after deletion
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '17px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      <h2 style={{ color: '#F75F00' }}>Student Report</h2>

      <div style={{ flex: 1, overflowX: 'auto', maxHeight: '400px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1200px' }}>
          <thead>
            <tr style={{ textAlign: 'left', backgroundColor: '#f5f5f5' }}>
              {[
                'Student ID', 'Name', 'Grade', 'School Name', 'Teacher Name', 'Parent Name', 'Relation',
                'Email ID', 'DOB', 'Contact No.', 'WhatsApp No.', 'Address', 'Total Session',
                'Attended Session', 'Absent', 'Work Progress', 'New Projects', 'Total Tests Given',
                'Appeared', 'Skipped', 'Total Marks', 'Scored(%)', 'Photo'
              ].map((header, i) => (
                <th key={i} style={thStyle}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(student.id)} // Row click handler
                style={{
                  backgroundColor: selectedRow === student.id ? '#e0e0e0' : 'transparent',
                  cursor: 'pointer'
                }}
              >
                {Object.keys(student).map((key) => key !== 'photo' && (
                  <td key={key} style={tdStyle}>
                    {selectedRow === student.id && editData ? (
                      // Show input fields in edit mode
                      <input
                        type="text"
                        name={key}
                        value={editData[key] || student[key]}
                        onChange={handleInputChange}
                        style={{
                          padding: '5px',
                          width: '100%',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                        }}
                      />
                    ) : (
                      key === 'photo' ? (
                        <img src={student[key]} alt="profile" style={{ borderRadius: '50%' }} />
                      ) : (
                        student[key]
                      )
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button style={buttonStyle} onClick={handleSave}>Save Changes</button>
        <button onClick={handleDelete} style={buttonStyle}>Delete</button>
        <button style={buttonStyle} onClick={() => handleEdit(studentData.find(student => student.id === selectedRow))}>Edit</button>
      </div>
    </div>
  );
};

const thStyle = {
  padding: '10px',
  fontWeight: 'bold',
  borderBottom: '1px solid #ddd',
  position: 'sticky',
  top: 0,
  backgroundColor: '#f5f5f5',
  zIndex: 1
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #eee',
  whiteSpace: 'nowrap'
};

const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  backgroundColor: '#241F63',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default StudentReportPage;
