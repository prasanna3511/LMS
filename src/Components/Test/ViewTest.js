import React, { useState } from 'react';

const ViewTestPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTests, setFilteredTests] = useState(testData);

  const handleSearch = () => {
    const filtered = testData.filter(test =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTests(filtered);
  };
  const handleDelete = (indexToDelete) => {
    const updatedTests = filteredTests.filter((_, index) => index !== indexToDelete);
    setFilteredTests(updatedTests);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              width: '300px',
              borderRadius: '17px',
              border: '1px solid #ccc',
              marginRight: '10px'
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              backgroundColor: '#1A1457',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              cursor: 'pointer',
              padding: 8,
              width: 100
            }}
          >
            Search
          </button>
        </div>
        <div></div>
      </div>

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10
        }}
      >
        <h2 style={{ color: '#F75F00', marginRight: '30px' }}>View Test</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          <select
            style={{
              padding: '7px 10px',
              borderRadius: 20,
              border: '1px solid #ccc',
              backgroundColor: 'white'
            }}
          >
            <option>Select Subject</option>
            <option>Math</option>
            <option>Science</option>
          </select>
          <select
            style={{
              padding: '10px',
              borderRadius: 20,
              border: '1px solid #ccc',
              backgroundColor: 'white'
            }}
          >
            <option>Select Class</option>
            <option>8th</option>
            <option>9th</option>
          </select>
        </div>
      </div>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#f8f8f8',
          borderRadius: '10px'
        }}
      >
        <thead
          style={{ backgroundColor: '#e6e6e6', textAlign: 'left', borderRadius: 20 }}
        >
          <tr style={{ textAlign: 'left', backgroundColor: '#f5f5f5', borderRadius: 20 }}>
            <th style={{ padding: '12px' }}>Test Name</th>
            <th style={{ padding: '12px' }}>Date</th>
            <th style={{ padding: '12px' }}>Subject</th>
            <th style={{ padding: '12px' }}>Standard</th>
            <th style={{ padding: '12px' }}></th>
          </tr>
        </thead>
        <tbody>
          {filteredTests.map((test, index) => (
            <tr key={index}>
              <td style={{ padding: '12px' }}>{test.name}</td>
              <td style={{ padding: '12px' }}>{test.date}</td>
              <td style={{ padding: '12px' }}>{test.subject}</td>
              <td style={{ padding: '12px' }}>{test.standard}</td>
              <td style={{ padding: '12px' }}>
                <button style={buttonStyle}>Edit</button>
                <button onClick={() => handleDelete(index)} style={buttonStyle}>Delete</button>
                <button style={buttonStyle}>Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#1A1457',
  color: 'white',
  padding: '8px 16px',
  marginRight: '10px',
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
  width: 100
};

// ✅ Dummy Test Data
const testData = [
  {
    name: 'Midterm 1',
    date: '2024-05-12',
    subject: 'Math',
    standard: '8th'
  },
  {
    name: 'Final Exam',
    date: '2024-12-01',
    subject: 'Science',
    standard: '9th'
  }
];

export default ViewTestPage;
