import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './StudentReportPage.css';


const TeacherReportPage = () => {
  const [teacherData, setTeacherData] = useState([
    {
      id: '1',
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
      id: '2',
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
  ]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  const handleRowClick = (index) => {
    setSelectedRow(index);
    setEditMode(false); // Reset edit mode when selecting a new row
  };

  const handleEdit = () => {
    if (selectedRow !== null) {
      setEditData({ ...teacherData[selectedRow] });
      setEditMode(true);
    }
  };

  const handleDelete = () => {
    if (selectedRow !== null) {
      const updatedData = [...teacherData];
      updatedData.splice(selectedRow, 1);
      setTeacherData(updatedData);
      setSelectedRow(null);
      setEditMode(false);
    }
  };

  const handleChange = (e, key) => {
    setEditData({ ...editData, [key]: e.target.value });
  };

  const handleSave = () => {
    const updatedData = [...teacherData];
    updatedData[selectedRow] = { ...editData };
    setTeacherData(updatedData);
    setEditMode(false);
  };

  return (
    <div style={{width:'100%'}}>
           <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>

<Navbar/>
</div>
  
    <div style={{ paddingTop: '30px', fontFamily: 'sans-serif' }}>
   
      <h2 style={{ color: '#F75F00', marginTop: '30px' }}>Teacher Report</h2>

      <div style={{ overflowX: 'auto', marginTop: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', whiteSpace: 'nowrap' }}>
          <thead>
            <tr style={{ textAlign: 'left', backgroundColor: '#f5f5f5' }}>
              {[
                'Teacher ID', 'Name', 'School Name', 'Password', 'Mobile No.',
                'WhatsApp No.', 'Email ID', 'DOB', 'Joining Date', 'Address',
                'Total Attendance', 'PresentDay', 'Absent Day',
                'Total Session', 'Completed Sessions', 'Pending Tests',
                'Created', 'Photo'
              ].map((title) => (
                <th key={title} style={thStyle}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teacherData.map((teacher, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(index)}
                style={{
                  backgroundColor: selectedRow === index ? '#e0f7fa' : 'transparent',
                  cursor: 'pointer'
                }}
              >
                {Object.entries(teacher).map(([key, value]) => (
                  <td key={key} style={tdStyle}>
                    {editMode && selectedRow === index && key !== 'photo' ? (
                      <input
                        type="text"
                        value={editData[key] || ''}
                        onChange={(e) => handleChange(e, key)}
                        style={{ width: '100%' }}
                      />
                    ) : key === 'photo' ? (
                      <img src={value} alt="profile" />
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {editMode ? (
          <button style={buttonStyle} onClick={handleSave}>Save</button>
        ) : (
          <button style={buttonStyle} onClick={handleEdit} disabled={selectedRow === null}>
            Edit
          </button>
        )}
        <button style={buttonStyle} onClick={handleDelete} disabled={selectedRow === null}>
          Delete
        </button>
      </div>
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
