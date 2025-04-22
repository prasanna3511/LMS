import React from 'react';

const ViewTestPage = () => {
  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>

        <input
          type="text"
          placeholder="Search by name"
          style={{ padding: '10px', width: '300px', borderRadius: '20px', border: '1px solid #ccc' }}
        />
          <button style={{ backgroundColor: '#1A1457', color: '#fff', border: 'none', borderRadius: 20, cursor: 'pointer',padding:8,width:100 }}>Search</button>
          </div>
    
        <div>
      
        </div>
      </div>
<div style={{width:'100%', display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>

      <h2 style={{ color: 'orange', marginRight: '30px' }}>View Test</h2>

      <div style={{ display: 'flex', gap: '20px' }}>
        <select style={{ padding: '7px 10px', borderRadius: 20, border: '1px solid #ccc' }}>
          <option>Select Subject</option>
          <option>Math</option>
          <option>Science</option>
        </select>
        <select style={{ padding: '10px', borderRadius: 20, border: '1px solid #ccc' }}>
          <option>Select Class</option>
          <option>8th</option>
          <option>9th</option>
        </select>
      </div>
</div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead >
          <tr style={{ textAlign: 'left', backgroundColor: '#f5f5f5',borderRadius:20 }}>
            <th style={{ padding: '12px' }}>Test Name</th>
            <th style={{ padding: '12px' }}>Date</th>
            <th style={{ padding: '12px' }}>Subject</th>
            <th style={{ padding: '12px' }}>Standard</th>
            <th style={{ padding: '12px' }}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '12px' }}>Midterm 1</td>
            <td style={{ padding: '12px' }}>2024-05-12</td>
            <td style={{ padding: '12px' }}>Math</td>
            <td style={{ padding: '12px' }}>8th</td>
            <td style={{ padding: '12px' }}>
              <button style={buttonStyle}>Edit</button>
              <button style={buttonStyle}>Delete</button>
              <button style={buttonStyle}>Download</button>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}>Final Exam</td>
            <td style={{ padding: '12px' }}>2024-12-01</td>
            <td style={{ padding: '12px' }}>Science</td>
            <td style={{ padding: '12px' }}>9th</td>
            <td style={{ padding: '12px' }}>
              <button style={buttonStyle}>Edit</button>
              <button style={buttonStyle}>Delete</button>
              <button style={buttonStyle}>Download</button>
            </td>
          </tr>
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
  width:100
};

export default ViewTestPage;
