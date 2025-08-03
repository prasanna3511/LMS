import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './StudentReportPage.css';
import apiRequest from '../../utils/apiRequest';


const TestReportPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRow, setSelectedRow] = useState(null); // To track selected row
  const [testData, setTestData] = useState([
  ]);

  // Filtered test data based on search term
  const filteredData = testData.filter((test) =>
    test?.full_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleRowClick = (index) => {
    setSelectedRow(index === selectedRow ? null : index); // Toggle row selection
  };

  const handleInputChange = (e, key, index) => {
    const updatedData = [...testData];
    updatedData[index][key] = e.target.value;
    setTestData(updatedData);
  };

  const handleEdit = async() => {
    if (selectedRow !== null) {
      const editedRow = testData[selectedRow];
    console.log("Edited row data:", editedRow);
    const payload = {
      id : Number(editedRow.id),
      marks:Number(editedRow.marks),
      out_of_marks:Number(editedRow.out_of_marks),
    }
    try {
      const result = await apiRequest({
        endpoint: "student_test_report/update_testMarks.php", 
        method: "POST",
        data: payload,
      });
  
      if (result.status === "success") {
        alert('Marks Updated')
      } else {
        alert(result.message || "Failed to add question");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
      setSelectedRow(null); // Deselect after editing (Optional)
    }
  };

  const userData = JSON.parse(localStorage.getItem('userData'))

  const fetchAllTestReport = async()=>{
    let api = userData.role === 'admin' ?`student_test_report/getTestReport.php`:`student_test_report/getTestReport.php?school_id=${Number(userData.school_id)}`;
    try {
      const result = await apiRequest({
        endpoint: api,
        method: "GET",
      });
      if (result.status === "success") {
        setTestData(result.data);
      } else {
        // alert(result.message || "Session creation failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  }
useEffect(()=>{
  fetchAllTestReport()
},[])
  const handleDelete =async () => {
    if (selectedRow !== null) {
      const updatedData = testData.filter((_, index) => index !== selectedRow);
      const editedRow = testData[selectedRow];
      const payload = {
        id : Number(editedRow.id),
        marks:Number(editedRow.marks),
        out_of_marks:Number(editedRow.out_of_marks),
      }
      try {
        const result = await apiRequest({
          endpoint: "student_test_report/delete_marks.php", 
          method: "POST",
          data: payload,
        });
    
        if (result.status === "success") {
          alert('Report for the selected deleted')
        } else {
          alert(result.message || "Failed to add question");
        }
      } catch (err) {
        alert(err.message || "Something went wrong");
      }
      setTestData(updatedData);
      setSelectedRow(null); // Deselect after delete
    }
  };

  return (
    <div style={{width:'100%'}}>
            <div className="header-container">
         <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '17px', border: '1px solid #ccc' }}
        />
<Navbar/>
    </div>
    <div style={{ paddingTop: '30px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    
      </div>

      <h2 style={{ color: '#F75F00', marginTop: '30px' }}>Test Report</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
  <tr style={{ textAlign: 'left', backgroundColor: '#f5f5f5' }}>
    <th style={thStyle}>Student Name</th>
    <th style={thStyle}>Test Name</th>
    <th style={thStyle}>Marks Obtained</th>
    <th style={thStyle}>Out of</th>
    <th style={thStyle}>Remaining</th>
  </tr>
</thead>
<tbody>
  {filteredData.map((test, index) => (
    <tr
      key={index}
      onClick={() => handleRowClick(index)}
      style={{
        backgroundColor: selectedRow === index ? '#e0e0e0' : 'transparent',
        cursor: 'pointer',
      }}
    >
      <td style={tdStyle}>
        {
        // selectedRow === index ? (
        //   <input
        //     type="text"
        //     value={test.full_name}
        //     onClick={(e) => e.stopPropagation()}
        //     onChange={(e) => handleInputChange(e, 'full_name', index)}
        //     style={{ padding: '5px', width: '100%', borderRadius: '5px' }}
        //   />
        // ) : (
          test.full_name
        // )
        }
      </td>
      <td style={tdStyle}>
        {
        // selectedRow === index ? (
        //   <input
        //     type="text"
        //     value={test.test_name}
        //     onClick={(e) => e.stopPropagation()}
        //     onChange={(e) => handleInputChange(e, 'test_name', index)}
        //     style={{ padding: '5px', width: '100%', borderRadius: '5px' }}
        //   />
        // ) : (
          test.test_name
        // )
        }
      </td>
      <td style={tdStyle}>
        {selectedRow === index ? (
          <input
            type="text"
            value={test.marks}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleInputChange(e, 'marks', index)}
            style={{ padding: '5px', width: '100%', borderRadius: '5px' }}
          />
        ) : (
          test.marks
        )}
      </td>
      <td style={tdStyle}>
        {selectedRow === index ? (
          <input
            type="text"
            onClick={(e) => e.stopPropagation()}
            value={test.out_of_marks}
            onChange={(e) => handleInputChange(e, 'out_of_marks', index)}
            style={{ padding: '5px', width: '100%', borderRadius: '5px' }}
          />
        ) : (
          test.out_of_marks
        )}
      </td>
      <td style={tdStyle}>
        {test.out_of_marks - test.marks}
      </td>
    </tr>
  ))}
</tbody>

      </table>

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
