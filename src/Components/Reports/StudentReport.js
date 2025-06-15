import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./StudentReportPage.css";
import apiRequest from "../../utils/apiRequest";

const StudentReportPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null); // Track selected row
  const [editData, setEditData] = useState(null); // Track data for editing
  const [studentData, setStudentData] = useState([]);

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
        endpoint: "reports/studentReport.php",
        method: "POST",
        data: userData.role === "admin" ? {} : payload,
      });

      console.log("result data student report: ", result);
      if (result.status !== true) {
        // alert("Failed to save a question: " + result.message);

        ///// prasannna set data below
        return;
      }
      setStudentData(result.data);
    } catch (err) {
      alert("Save failed: " + err.message);
      return;
    }
  };

  const filteredData = studentData.filter((student) =>
    student?.student_info?.full_name?.includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (id) => {
    setSelectedRow(id === selectedRow ? null : id); // Toggle selection on click
    if (editData && editData.id === id) {
      setEditData(null); // Remove edit mode if row is clicked
    }
  };

  const handleEdit = (student) => {
    console.log("student : ",student)
    setEditData(student); // Set edit mode for the selected student
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave =async () => {
    const updatedData = studentData.map((student) =>
    student.student_info.id === editData.student_info.id ? editData : student
  );
  console.log("updated student data : ",editData)

  setStudentData(updatedData); 
    setEditData(null); // Exit edit mode
    setSelectedRow(null); // Deselect row
    const payload = {
      full_name:editData.student_info.full_name,
      email:editData.student_info.email,
      mobile_number:editData.student_info.mobile_number,
      whatsapp_number:editData.student_info.whatsapp_number,
      date_of_birth:editData.student_info.date_of_birth,
      id:editData.student_info.id
    }

    try {
      const result = await apiRequest({
        endpoint: "users/updateUserFromReports.php",
        method: "POST",
        data: payload,
      });
      console.log(payload)
      if (result.status === "success") {
        alert('User Updated Successfully')
        
        // navigate("/dashboard");
      } else {
        // alert(result.message || "Session creation failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  const handleDelete = async() => {
    if (selectedRow) {
      const updatedData = studentData.filter(
        (student) => student.id !== selectedRow
      );
      // console.log(selectedRow )
      try {
        const result = await apiRequest({
          endpoint: "users/deleteuser.php",
          method: "POST",
          data: {id:selectedRow},
        });
    
        if (result.status === "success") {
          alert('User Deleted')
          
          // navigate("/dashboard");
        } else {
          // alert(result.message || "Session creation failed");
        }
      } catch (err) {
        alert(err.message || "Something went wrong");
      }
      setSelectedRow(null); // Deselect row after deletion
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="header-container">
        <input
          type="text"
          placeholder="Search by name"
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

      <div
        style={{
          paddingTop: "30px",
          fontFamily: "sans-serif",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ color: "#F75F00" }}>Student Report</h2>

        <div style={{ flex: 1, overflowX: "auto", maxHeight: "400px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "1200px",
            }}
          >
            <thead>
              <tr style={{ textAlign: "left", backgroundColor: "#f5f5f5" }}>
                {[
                  "Student ID",
                  "Name",
                  "Grade",
                  "School Name",
                  "Teacher Name",
                  "Parent Name",
                  "Relation",
                  "Email ID",
                  "DOB",
                  "Contact No.",
                  "WhatsApp No.",
                  "Address",
                  "Total Session",
                  "Attended Session",
                  "Absent",
                  "Work Progress",
                  "New Projects",
                  "Total Tests Given",
                  "Appeared",
                  "Skipped",
                  "Total Marks",
                  "Scored(%)",
                  "Photo",
                ].map((header, i) => (
                  <th key={i} style={thStyle}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
  {filteredData.map((student, index) => {
    const info = student.student_info;
    const isEditing =
      editData && editData.student_info.id === student.student_info.id;

    return (
      <tr
        key={index}
        onClick={() => handleRowClick(info.id)}
        style={{
          backgroundColor:
            selectedRow === info.id ? "#e0e0e0" : "transparent",
          cursor: "pointer",
        }}
      >
        <td style={tdStyle}>{info.id}</td>

        {/* Full Name */}
        <td style={tdStyle}>
          {isEditing ? (
            <input
              name="full_name"
              value={editData.student_info.full_name}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  student_info: {
                    ...prev.student_info,
                    full_name: e.target.value,
                  },
                }))
              }
            />
          ) : (
            info.full_name
          )}
        </td>

        {/* Grade dropdown */}
        <td style={tdStyle}>
          {isEditing ? (
            <select
              value={editData.student_info.grade}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  student_info: {
                    ...prev.student_info,
                    grade: e.target.value,
                  },
                }));
              }}
            >
              <option value="">Select Grade</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
                  return (
                    <option key={number} value={`${number}`}>
                      {number}
                    </option>
                  );
                })}
            </select>
          ) : (
            info.grade
          )}
        </td>

        <td style={tdStyle}>{info.school_name}</td>
        <td style={tdStyle}>N/A</td>
        <td style={tdStyle}>{info.parent_name}</td>
        <td style={tdStyle}>{info.relation}</td>

        {/* Email */}
        <td style={tdStyle}>
          {isEditing ? (
            <input
              name="email"
              value={editData.student_info.email}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  student_info: {
                    ...prev.student_info,
                    email: e.target.value,
                  },
                }))
              }
            />
          ) : (
            info.email
          )}
        </td>

        <td style={tdStyle}>{info.date_of_birth}</td>

        {/* Contact Number */}
        <td style={tdStyle}>
          {isEditing ? (
            <input
              name="mobile_number"
              value={editData.student_info.mobile_number}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  student_info: {
                    ...prev.student_info,
                    mobile_number: e.target.value,
                  },
                }))
              }
            />
          ) : (
            info.mobile_number
          )}
        </td>

        {/* WhatsApp Number */}
        <td style={tdStyle}>
          {isEditing ? (
            <input
              name="whatsapp_number"
              value={editData.student_info.whatsapp_number}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  student_info: {
                    ...prev.student_info,
                    whatsapp_number: e.target.value,
                  },
                }))
              }
            />
          ) : (
            info.whatsapp_number
          )}
        </td>

        {/* Address */}
        <td style={tdStyle}>
          {isEditing ? (
            <input
              name="address"
              value={editData.student_info.address}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  student_info: {
                    ...prev.student_info,
                    address: e.target.value,
                  },
                }))
              }
            />
          ) : (
            info.address
          )}
        </td>

        <td style={tdStyle}>{student.total_session_count}</td>
        <td style={tdStyle}>{student.attendance_count}</td>
        <td style={tdStyle}>
          {student.total_session_count - student.attendance_count}
        </td>

        <td style={tdStyle}>N/A</td>
        <td style={tdStyle}>N/A</td>
        <td style={tdStyle}>N/A</td>
        <td style={tdStyle}>N/A</td>
        <td style={tdStyle}>N/A</td>
        <td style={tdStyle}>N/A</td>

        <td style={tdStyle}>
          {info.photo ? (
            <img
              src={info.photo}
              alt="profile"
              style={{
                borderRadius: "50%",
                width: "40px",
                height: "40px",
              }}
            />
          ) : (
            "No Photo"
          )}
        </td>
      </tr>
    );
  })}
</tbody>


          </table>
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {editData && <button style={buttonStyle} onClick={handleSave}>
            Save Changes
          </button> }
          {
            userData.role === 'admin' &&
          <button onClick={handleDelete} style={buttonStyle}>
            Delete
          </button>
          }
          <button
            style={buttonStyle}
            onClick={() =>
              handleEdit(studentData.find((student) => student.student_info.id === selectedRow))
            }
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

const thStyle = {
  padding: "10px",
  fontWeight: "bold",
  borderBottom: "1px solid #ddd",
  position: "sticky",
  top: 0,
  backgroundColor: "#f5f5f5",
  zIndex: 1,
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
  whiteSpace: "nowrap",
};

const buttonStyle = {
  margin: "10px",
  padding: "10px 20px",
  backgroundColor: "#241F63",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default StudentReportPage;
