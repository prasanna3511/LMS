import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './StudentReportPage.css';
import apiRequest from '../../utils/apiRequest';


const SchoolReportPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRow, setSelectedRow] = useState(null); // To track selected row
  const [schoolData, setSchoolData] = useState([]);

  // Filtered school data based on search term
  const filteredData = schoolData.filter((school) =>
  school.school_info.school_name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(()=>{
    getStduentReport()
  },[])
  const getStduentReport = async () => {

    const payload = {
    // name:enterTestName,
    school_id:Number(userData.school_id),
    teacher_id:Number(userData.id)
    };

    try {
      const result = await apiRequest({
        endpoint: "reports/schoolReport.php",
        method: "POST",
        data: userData.role === 'admin'?{}: payload,
      });

      console.log("result data school report: ",result)
      if (result.status !== true) {
        // alert("Failed to save a question: " + result.message);

        ///// prasannna set data below
        return;
      }
      setSchoolData(result.data)
      
    } catch (err) {
      alert("Save failed: " + err.message);
      return;
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
                {/* {Object.keys(school).map((key, idx) => (
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
                ))} */}
                <td style={tdStyle}>{school.school_info.id}</td>
<td style={tdStyle}>{school.school_info.school_name}</td>
<td style={tdStyle}>{school.school_info.school_contact_number}</td>
<td style={tdStyle}>{school.school_info.school_mobile_number}</td>
<td style={tdStyle}>{school.school_info.school_mobile_number}</td> {/* Assuming WhatsApp is same */}
<td style={tdStyle}>{school.school_info.school_email_id}</td>
<td style={tdStyle}>{school.school_info.chairman_name}</td>
<td style={tdStyle}>{school.school_info.chairman_name}</td> {/* Replace if you have principal */}
<td style={tdStyle}>{school.teacher_count}</td>
<td style={tdStyle}>{school.school_info.school_student_count}</td>
<td style={tdStyle}>{school.student_count}</td>
<td style={tdStyle}>{school.school_info.date_of_joining}</td>
<td style={tdStyle}>{school.holiday_count}</td>
<td style={tdStyle}>₹ 0</td> {/* Replace with real annual expenses if available */}
<td style={tdStyle}>0</td> {/* Replace with real total staff if available */}
<td style={tdStyle}>{school.school_info.school_address}</td>
<td style={tdStyle}>
  <img src="school.jpg" alt="school" style={{ width: '40px', height: '40px' }} />
</td>

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
