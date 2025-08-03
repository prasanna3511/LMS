import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import apiRequest from "../../utils/apiRequest";

const SpecialProjectReportForm = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [formData, setFormData] = useState({
    schoolName: "",
    fullName: "",
    grade: "",
    address: "",
    dob: "",
    parentEmail: "",
    loginPassword: "",
    userName: "",
    fatherMobile: "",
    fatherName: "",
    motherMobile: "",
    motherName: "",
    mobileNumber: "",
    guardianName: "",
    changePassword: "",
    relation: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("formdata : ", formData);
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  // if (formData.changePassword && formData.changePassword !== formData.confirmPassword) {
  //   alert("Passwords do not match!");
  //   return;
  // }

  const payload = {
    id: userData.id,
    full_name: formData.fullName,
    grade: formData.grade,
    address: formData.address,
    date_of_birth: formData.dob,
    email: formData.parentEmail,
    username: formData.userName,
    mobile_number: formData.mobileNumber,
    parent_name: formData.guardianName,
    relation: formData.relation,
    father_name: formData.fatherName,
    father_mobile_number: formData.fatherMobile,
    mother_name: formData.motherName,
    mother_mobile_number: formData.motherMobile,
    school_name: formData.schoolName,
    // ...(formData.changePassword && { password: formData.changePassword }),
  };

  try {
    const result = await apiRequest({
      endpoint: "users/updateStudent.php",
      method: "POST",
      data: payload,
    });

    if (result.status === "success") {
      alert("Profile updated successfully!");
    } else {
      alert(result.message || "Update failed");
    }
  } catch (err) {
    alert(err.message || "Something went wrong");
  }
};

  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchAllSubjects = async () => {
      try {
        const result = await apiRequest({
          endpoint: "users/getUserDetails.php",
          method: "POST",
          data: { id: userData.id },
        });
        if (result.status === "success") {
          const { user, school } = result.data;
          // setFormData((prev) => ({
          //   ...prev,
          //   schoolName: school?.school_name || "",
          //   fullName: user?.full_name || "",
          //   grade: user?.grade || "",
          //   address: user?.address || "",
          //   dob: user?.date_of_birth || "",
          //   parentEmail: user?.email || "",
          //   userName: user?.username || "",
          //   mobileNumber: user?.mobile_number || "",
          //   relation: user?.relation || "",
          //   guardianName: user?.parent_name || "",
          //   // Note: loginPassword, confirmPassword, changePassword will remain empty for security reasons.
          // }));
          setFormData({
            schoolName: school?.school_name || "",
            fullName: user?.full_name || "",
            grade: user?.grade || "",
            address: user?.address || "",
            dob: user?.date_of_birth || "",
            parentEmail: user?.email || "",
            userName: user?.username || "",
            mobileNumber: user?.mobile_number || "",
            guardianName: user?.parent_name || "",
            relation: user?.relation || "",
            fatherName: user?.father_name || "",
            fatherMobile: user?.father_mobile_number || "",
            motherName: user?.mother_name || "",
            motherMobile: user?.mother_mobile_number || "",
  
            // These are always kept empty for security
            loginPassword: "",
            changePassword: "",
            confirmPassword: "",
          });
        } else {
          alert(result.message || "users data fetching failed");
        }
      } catch (err) {
        alert(err.message || "Something went wrong");
      }
    };
    fetchAllSubjects();
  }, []);

  const containerStyle = {
    maxWidth: "1200px",
    padding: "30px",
    borderRadius: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#ff6600",
    marginBottom: "20px",
  };

  const rowStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "15px",
  };

  const columnStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    fontSize: "14px",
    marginBottom: "5px",
  };

  const inputStyle = {
    padding: "8px 12px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    outline: "none",
  };

  const imageBoxStyle = {
    width: "150px",
    height: "150px",
    backgroundColor: "#eee",
    borderRadius: "15px",
    marginBottom: "15px",
  };

  const buttonStyle = {
    backgroundColor: "#1a1259",
    color: "white",
    padding: "10px 30px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    marginTop: "20px",
  };

  return (
    <>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Navbar />
      </div>
      <div style={containerStyle}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
          }}
        >
          <div style={titleStyle}>View Myself</div>

          <div style={{ ...rowStyle, marginLeft: isMobile ? 0 : 20 }}>
            <div style={columnStyle}>
              <label style={labelStyle}>School Name</label>
              <input
                type="text"
                disabled
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                style={{ ...inputStyle }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: isMobile ? "block" : "flex", width: "100%" }}>
          <div style={{ ...imageBoxStyle }} />
          <div>
            <div style={{ ...rowStyle, marginLeft: isMobile ? 0 : 20 }}>
              <div style={columnStyle}>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  style={{ ...inputStyle, width: "100%" }}
                />
              </div>
              <div style={{ ...columnStyle, marginLeft: isMobile ? 0 : 20 }}>
                <label style={labelStyle}>Grade</label>
                <input
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  type="text"
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ ...rowStyle, marginLeft: isMobile ? 0 : 20 }}>
              <div style={columnStyle}>
                <label style={labelStyle}>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  style={{ ...inputStyle, width: "100%" }}
                />
              </div>
              <div style={{ ...columnStyle, marginLeft: isMobile ? 0 : 20 }}>
                <label style={labelStyle}>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={rowStyle}>
          <div style={columnStyle}>
            <label style={labelStyle}>Parent Email ID</label>
            <input
              type="email"
              name="parentEmail"
              value={formData.parentEmail}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={columnStyle}>
            <label style={labelStyle}>Your Login Password</label>
            <input type="password" placeholder="*********" disabled style={inputStyle} />
          </div>
        </div>

        <div style={rowStyle}>
          <div style={columnStyle}>
            <label style={labelStyle}>User Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={columnStyle}>
            <label style={labelStyle}>Father Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={rowStyle}>
          <div style={columnStyle}>
            <label style={labelStyle}>Father Name</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={columnStyle}>
            <label style={labelStyle}>Mother Mobile Number</label>
            <input
              type="text"
              name="fatherMobile"
              value={formData.fatherMobile}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={rowStyle}>
          <div style={columnStyle}>
            <label style={labelStyle}>Mother Name</label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={columnStyle}>
            <label style={labelStyle}>Mobile Number</label>
            <input
              type="text"
              name="motherMobile"
              value={formData.motherMobile}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={rowStyle}>
          <div style={columnStyle}>
            <label style={labelStyle}>Guardian Name</label>
            <input
              type="text"
              name="guardianName"
              value={formData.guardianName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={columnStyle}>
            <label style={labelStyle}>Change Password</label>
            <input
              type="password"
              name="changePassword"
              value={formData.changePassword}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={rowStyle}>
          <div style={columnStyle}>
            <label style={labelStyle}>Relation with Student</label>
            <input type="text" name="relation" value={formData.relation}
              onChange={handleChange} style={inputStyle} />
          </div>
          <div style={columnStyle}>
            <label style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-end",
          }}
        >
          <button style={buttonStyle} onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default SpecialProjectReportForm;
