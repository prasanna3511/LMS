import React, { useState } from 'react';

const TestReportPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRow, setSelectedRow] = useState(null); // To track selected row
  const [testData, setTestData] = useState([
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
  ]);

  // Filtered test data based on search term
  const filteredData = testData.filter((test) =>
    test.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (index) => {
    setSelectedRow(index === selectedRow ? null : index); // Toggle row selection
  };

  const handleInputChange = (e, key, index) => {
    const updatedData = [...testData];
    updatedData[index][key] = e.target.value;
    setTestData(updatedData);
  };

  const handleEdit = () => {
    if (selectedRow !== null) {
      setSelectedRow(null); // Deselect after editing (Optional)
    }
  };

  const handleDelete = () => {
    if (selectedRow !== null) {
      const updatedData = testData.filter((_, index) => index !== selectedRow);
      setTestData(updatedData);
      setSelectedRow(null); // Deselect after delete
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '20px', border: '1px solid #ccc' }}
        />
      </div>

      <h2 style={{ color: '#F75F00', marginTop: '30px' }}>Test Report</h2>

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
          {filteredData.map((test, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(index)} // Click to select row
              style={{
                backgroundColor: selectedRow === index ? '#e0e0e0' : 'transparent',
                cursor: 'pointer',
              }}
            >
              {Object.keys(test).map((key, idx) => (
                <td key={idx} style={tdStyle}>
                  {selectedRow === index ? (
                    // Show editable input fields if row is selected
                    <input
                      type="text"
                      value={test[key]}
                      onChange={(e) => handleInputChange(e, key, index)}
                      style={{ padding: '5px', width: '100%', borderRadius: '5px' }}
                    />
                  ) : (
                    test[key] // Display regular data
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button style={buttonStyle} onClick={handleEdit}>Save</button>
        <button style={buttonStyle} onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

const thStyle = {
  padding: '10px',
  fontWeight: 'bold',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #ddd',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #eee',
};

const buttonStyle = {
  backgroundColor: '#1A1457',
  color: 'white',
  padding: '10px 20px',
  margin: '0 10px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};

export default TestReportPage;
