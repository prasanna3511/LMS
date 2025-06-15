import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./StudentReportPage.css";
import apiRequest from "../../utils/apiRequest";

const SchoolReportPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null); // To track selected row
  const [schoolData, setSchoolData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [originalData, setOriginalData] = useState(null); // Store original data for comparison

  // Filtered school data based on search term
  const filteredData = schoolData.filter((school) =>
    school.school_info.school_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (index,event) => {
    if (event.target.tagName.toLowerCase() === "input") return;
    setSelectedRow(index === selectedRow ? null : index); // Toggle row selection
  };
  const handleInputChange = (e, keyPath, index) => {
    const updatedData = [...schoolData];
    const keys = keyPath.split(".");
    if (keys.length === 2) {
      updatedData[index][keys[0]][keys[1]] = e.target.value;
    } else {
      updatedData[index][keyPath] = e.target.value;
    }
    setSchoolData(updatedData);
  };
  const handleSave = async() => {
    if (selectedRow !== null && originalData) {
      const current = schoolData[selectedRow];
  
      // Optional: print which fields were edited
      const editedFields = {};
      const fieldsToCheck = [
        "id",
        "school_name",
        "school_contact_number",
        "school_mobile_number",
        "school_email_id",
        "chairman_name"
      ];
  
      fieldsToCheck.forEach((field) => {
        const oldVal = originalData.school_info[field];
        const newVal = current.school_info[field];
        if (oldVal !== newVal) {
          editedFields[field] = { old: oldVal, new: newVal };
        }
      });
  
      console.log("Edited fields (diff):", editedFields); // Optional
      console.log("Updated full row:", current);           // ✅ Full updated row
  
      setEditMode(false);
      setOriginalData(null);
      let payload = {
        "id":current.school_info.id        ,
        "school_name":current.school_info.school_name,
        "school_contact_number":current.school_info.school_contact_number,
        "school_mobile_number":current.school_info.school_mobile_number,
        "school_email_id":current.school_info.school_email_id,
        "chairman_name":current.school_info.chairman_name
      }
      try {
        const result = await apiRequest({
          endpoint: "school/updateSchoolFromReport.php",
          method: "POST",
          data: payload,
        });
    
        if (result.status === "success") {
          alert('School info updated')
        } else {
        }
      } catch (err) {
        alert(err.message || "Something went wrong");
      }
    }
  };
  

  const handleEdit = () => {
    if (selectedRow !== null) {
      // Here, the selected row's columns are editable already, no need for extra logic for editing.
      setOriginalData(JSON.parse(JSON.stringify(schoolData[selectedRow])));
      setEditMode(true);
    }
  };

  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    getStduentReport();
  }, []);
  const getStduentReport = async () => {
    const payload = {
      // name:enterTestName,
      school_id: Number(userData.school_id),
      teacher_id: Number(userData.id),
    };

    try {
      const result = await apiRequest({
        endpoint: "reports/schoolReport.php",
        method: "POST",
        data: userData.role === "admin" ? {} : payload,
      });

      if (result.status !== true) {
        return;
      }
      setSchoolData(result.data);
    } catch (err) {
      alert("Save failed: " + err.message);
      return;
    }
  };

  const handleDelete = async() => {
    if (selectedRow !== null) {
      const updatedData = schoolData.filter(
        (_, index) => index !== selectedRow
      );
      setSchoolData(updatedData);
      const deletedRow = schoolData[selectedRow]; // 👈 Capture before deletion
    console.log("Deleted row data:", deletedRow);
      console.log("selected Row : ",selectedRow)
      try {
        const result = await apiRequest({
          endpoint: "school/deleteschool.php",
          method: "POST",
          data: {id:deletedRow.school_info.id  },
        });
    
        if (result.status === "success") {
          alert('School info Deleted')
        } else {
        }
      } catch (err) {
        alert(err.message || "Something went wrong");
      }
      setSelectedRow(null); // Deselect after delete
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="header-container">
        <input
          type="text"
          placeholder="Search by school name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "17px",
            border: "1px solid #ccc",
          }}
        />

        <Navbar />
      </div>
      <div style={{ paddingTop: "30px", fontFamily: "sans-serif" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></div>

        <h2 style={{ color: "#F75F00", marginTop: "30px" }}>School Report</h2>

        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", backgroundColor: "#f5f5f5" }}>
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
      onClick={(e) => handleRowClick(index , e)}
      style={{
        backgroundColor: selectedRow === index ? "#e0e0e0" : "transparent",
        cursor: "pointer",
      }}
    >
      <td style={tdStyle}>{school.school_info.id}</td>

      {/* School Name */}
      <td style={tdStyle}>
        {editMode && selectedRow === index ? (
          <input
            type="text"
            value={school.school_info.school_name}
            onChange={(e) =>
              handleInputChange(e, "school_info.school_name", index)
            }
          />
        ) : (
          school.school_info.school_name
        )}
      </td>

      {/* Contact No. */}
      <td style={tdStyle}>
        {editMode && selectedRow === index ? (
          <input
            type="text"
            value={school.school_info.school_contact_number}
            onChange={(e) =>
              handleInputChange(e, "school_info.school_contact_number", index)
            }
          />
        ) : (
          school.school_info.school_contact_number
        )}
      </td>

      {/* Mobile No. */}
      <td style={tdStyle}>
        {editMode && selectedRow === index ? (
          <input
            type="text"
            value={school.school_info.school_mobile_number}
            onChange={(e) =>
              handleInputChange(e, "school_info.school_mobile_number", index)
            }
          />
        ) : (
          school.school_info.school_mobile_number
        )}
      </td>

      {/* WhatsApp No. (assumed same as mobile) */}
      <td style={tdStyle}>
        {editMode && selectedRow === index ? (
          <input
            type="text"
            value={school.school_info.school_mobile_number}
            onChange={(e) =>
              handleInputChange(e, "school_info.school_mobile_number", index)
            }
          />
        ) : (
          school.school_info.school_mobile_number
        )}
      </td>

      {/* Email Address */}
      <td style={tdStyle}>
        {editMode && selectedRow === index ? (
          <input
            type="text"
            value={school.school_info.school_email_id}
            onChange={(e) =>
              handleInputChange(e, "school_info.school_email_id", index)
            }
          />
        ) : (
          school.school_info.school_email_id
        )}
      </td>

      {/* Chairman */}
      <td style={tdStyle}>
        {editMode && selectedRow === index ? (
          <input
            type="text"
            value={school.school_info.chairman_name}
            onChange={(e) =>
              handleInputChange(e, "school_info.chairman_name", index)
            }
          />
        ) : (
          school.school_info.chairman_name
        )}
      </td>

      {/* Principal (assumed same as chairman) */}
      <td style={tdStyle}>{school.school_info.chairman_name}</td>

      <td style={tdStyle}>{school.teacher_count}</td>
      <td style={tdStyle}>{school.school_info.school_student_count}</td>
      <td style={tdStyle}>{school.student_count}</td>
      <td style={tdStyle}>{school.school_info.date_of_joining}</td>
      <td style={tdStyle}>{school.holiday_count}</td>
      <td style={tdStyle}>₹ 0</td>
      <td style={tdStyle}>0</td>
      <td style={tdStyle}>{school.school_info.school_address}</td>
      <td style={tdStyle}>
        <img
          src="school.jpg"
          alt="school"
          style={{ width: "40px", height: "40px" }}
        />
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {!editMode &&<button style={buttonStyle} onClick={handleEdit}>
            Edit
          </button>}
          {editMode &&<button style={buttonStyle} onClick={handleSave}>
            Save
          </button>}
          <button style={buttonStyle} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const thStyle = {
  padding: "10px",
  fontWeight: "bold",
  position: "sticky",
  top: "0", // Makes the header sticky
  backgroundColor: "#f5f5f5", // Ensure the header stays visible
  zIndex: "1", // Ensure the header stays on top of the rows
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

const buttonStyle = {
  backgroundColor: "#1A1457",
  color: "white",
  padding: "10px 20px",
  margin: "0 10px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default SchoolReportPage;
