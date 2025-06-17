import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./StudentReportPage.css";
import apiRequest from "../../utils/apiRequest";

const TeacherReportPage = () => {
  const [teacherData, setTeacherData] = useState([
    {
      id: "1",
      name: "Rajesh Kumar",
      school: "Greenwood High",
      password: "****",
      mobile: "9876543210",
      whatsapp: "9876543210",
      email: "rajesh@example.com",
      dob: "1980-01-15",
      joiningDate: "2010-06-01",
      address: "Mumbai",
      totalAttendance: 180,
      presentDays: 175,
      absentDays: 5,
      totalSession: 40,
      completedSessions: 38,
      pendingTests: 2,
      createdTests: 5,
      photo: "https://via.placeholder.com/40",
    },
    {
      id: "2",
      name: "Anita Sharma",
      school: "Sunrise Academy",
      password: "****",
      mobile: "9123456780",
      whatsapp: "9123456780",
      email: "anita@example.com",
      dob: "1985-03-22",
      joiningDate: "2012-08-10",
      address: "Pune",
      totalAttendance: 175,
      presentDays: 170,
      absentDays: 5,
      totalSession: 38,
      completedSessions: 35,
      pendingTests: 3,
      createdTests: 4,
      photo: "https://via.placeholder.com/40",
    },
  ]);
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    getTeacherReport();
  }, []);
  const getTeacherReport = async () => {
    let payload = {
      // name:enterTestName,
      teacher_id: Number(userData.id),
    };
    if(userData.role === 'principle')
      
    payload={school_id: Number(userData.school_id)}

    try {
      console.log("payload",payload)
      const result = await apiRequest({
        endpoint: "reports/teacherReport.php",
        method: "POST",
        data: userData.role === "admin" ? {} : payload,
      });

      console.log("result data : ", result);
      if (result.status !== true) {
        // alert("Failed to save a question: " + result.message);

        ///// prasannna set data below
        return;
      }
      // return result.data.id
      // setFilteredTests(result.data)
      // setTeacherData(result.data)
      const formattedData = result.data.map((item) => ({
        id: item.teacher_info.id,
        name: item.teacher_info.full_name,
        school: item.teacher_info.school_name,
        password: item.teacher_info.password,
        mobile: item.teacher_info.mobile_number,
        whatsapp: item.teacher_info.whatsapp_number,
        email: item.teacher_info.email,
        dob: item.teacher_info.date_of_birth,
        joiningDate: item.teacher_info.date_of_joining,
        address: item.teacher_info.address,
        totalAttendance: item.attendance_count,
        presentDays: item.present_days || 0, // if available
        absentDays: item.absent_days || 0, // if available
        totalSession: item.session_count,
        completedSessions: item.school_session_count,
        pendingTests: item.pending_test_count || 0,
        createdTests: item.test_created_count,
        photo: item.teacher_info.photo || "https://via.placeholder.com/40",
      }));

      setTeacherData(formattedData);
    } catch (err) {
      alert("Save failed: " + err.message);
      return;
    }
  };

  const [selectedRow, setSelectedRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  const handleRowClick = (index, event) => {
    if (event.target.tagName.toLowerCase() === "input") {
      return; // Don't change selection if clicking inside an input
    }
    setSelectedRow(index);
    setEditMode(false); // Reset edit mode when selecting a new row
  };

  const handleEdit = () => {
    if (selectedRow !== null) {
      setEditData({ ...teacherData[selectedRow] });
      setEditMode(true);
    }
  };

  const handleDelete = async() => {
    if (selectedRow !== null) {
      const updatedData = [...teacherData];
      updatedData.splice(selectedRow, 1);
      setTeacherData(updatedData);
      setSelectedRow(null);
      setEditMode(false);
      try {
        const result = await apiRequest({
          endpoint: "users/deleteuser.php",
          method: "POST",
          data: {id:editData.id},
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
    }
  };

  const handleChange = (e, key) => {
    setEditData({ ...editData, [key]: e.target.value });
  };

  const handleSave = async() => {
    console.log("Updated data to be saved:", editData);
    const updatedData = [...teacherData];
    updatedData[selectedRow] = { ...editData };
    setTeacherData(updatedData);
    setEditMode(false);
    const payload = {
      full_name:editData.name,
      email:editData.email,
      mobile_number:editData.mobile,
      whatsapp_number:editData.whatsapp,
      date_of_birth:editData.dob,
      id:editData.id
    }

    try {
      const result = await apiRequest({
        endpoint: "users/updateUserFromReports.php",
        method: "POST",
        data: payload,
      });
  
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

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Navbar />
      </div>

      <div style={{ paddingTop: "30px", fontFamily: "sans-serif" }}>
        <h2 style={{ color: "#F75F00", marginTop: "30px" }}>Teacher Report</h2>

        <div style={{ overflowX: "auto", marginTop: "20px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              whiteSpace: "nowrap",
            }}
          >
            <thead>
              <tr style={{ textAlign: "left", backgroundColor: "#f5f5f5" }}>
                {[
                  "Teacher ID",
                  "Name",
                  "School Name",
                  "Password",
                  "Mobile No.",
                  "WhatsApp No.",
                  "Email ID",
                  "DOB",
                  "Joining Date",
                  "Address",
                  "Total Attendance",
                  "PresentDay",
                  "Absent Day",
                  "Total Session",
                  "Completed Sessions",
                  "Pending Tests",
                  "Created",
                  "Photo",
                ].map((title) => (
                  <th key={title} style={thStyle}>
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teacherData.map((teacher, index) => (
                <tr
                  key={index}
                  onClick={(e) => handleRowClick(index, e)}
                  style={{
                    backgroundColor:
                      selectedRow === index ? "#e0f7fa" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  {Object.entries(teacher).map(([key, value]) => (
                    <td key={key} style={tdStyle}>
                      {editMode &&
                      selectedRow === index &&
                      [
                        "name",
                        "dob",
                        "address",
                        "mobile",
                        "whatsapp",
                        "email",
                      ].includes(key) ? (
                        <input
                          type="text"
                          value={editData[key] || ""}
                          onChange={(e) => handleChange(e, key)}
                          style={{ width: "100%" }}
                        />
                      ) : key === "photo" ? (
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

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {editMode ? (
            <button style={buttonStyle} onClick={handleSave}>
              Save
            </button>
          ) : (
            <button
              style={buttonStyle}
              onClick={handleEdit}
              disabled={selectedRow === null}
            >
              Edit
            </button>
          )}
          {
            userData.role === 'admin' &&
          <button
            style={buttonStyle}
            onClick={handleDelete}
            disabled={selectedRow === null}
          >
            Delete
          </button>
          }
        </div>
      </div>
    </div>
  );
};

const thStyle = {
  padding: "10px",
  fontWeight: "bold",
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

export default TeacherReportPage;
