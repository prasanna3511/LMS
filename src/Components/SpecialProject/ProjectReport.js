import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

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
    confirmPassword: ""
  });
  
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
  
    if (!formData.schoolName.trim()) newErrors.schoolName = "School Name is required";
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.parentEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.parentEmail = "Valid email is required";
    if (formData.changePassword !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
  
    // Add more validations as needed...
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log("Submitting data:", formData);
      // You can now send formData to your API
    }
  };
      

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
<div style={{width:'100%',display:'flex', justifyContent:'flex-end'}}>
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
            <input type="text" style={{ ...inputStyle }} />
          </div>
        </div>
      </div>

      <div style={{ display: isMobile ? "block" : "flex", width: "100%" }}>
        <div style={{ ...imageBoxStyle }} />
        <div>
          <div style={{ ...rowStyle, marginLeft: isMobile ? 0 : 20 }}>
            <div style={columnStyle}>
              <label style={labelStyle}>Full Name</label>
              <input type="text" style={{ ...inputStyle, width: "100%" }} />
            </div>
            <div style={{ ...columnStyle, marginLeft: isMobile ? 0 : 20 }}>
              <label style={labelStyle}>Grade</label>
              <input type="text" style={inputStyle} />
            </div>
          </div>
          <div style={{ ...rowStyle, marginLeft: isMobile ? 0 : 20 }}>
            <div style={columnStyle}>
              <label style={labelStyle}>Address</label>
              <input type="text" style={{ ...inputStyle, width: "100%" }} />
            </div>
            <div style={{ ...columnStyle, marginLeft: isMobile ? 0 : 20 }}>
              <label style={labelStyle}>Date of Birth</label>
              <input type="date" style={inputStyle} />
            </div>
          </div>
        </div>
      </div>

      <div style={rowStyle}>
        <div style={columnStyle}>
          <label style={labelStyle}>Parent Email ID</label>
          <input type="email" style={inputStyle} />
        </div>
        <div style={columnStyle}>
          <label style={labelStyle}>Your Login Password</label>
          <input type="password" style={inputStyle} />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={columnStyle}>
          <label style={labelStyle}>User Name</label>
          <input type="text" style={inputStyle} />
        </div>
        <div style={columnStyle}>
          <label style={labelStyle}>Father Mobile Number</label>
          <input type="text" style={inputStyle} />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={columnStyle}>
          <label style={labelStyle}>Father Name</label>
          <input type="text" style={inputStyle} />
        </div>
        <div style={columnStyle}>
          <label style={labelStyle}>Mother Mobile Number</label>
          <input type="text" style={inputStyle} />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={columnStyle}>
          <label style={labelStyle}>Mother Name</label>
          <input type="text" style={inputStyle} />
        </div>
        <div style={columnStyle}>
          <label style={labelStyle}>Mobile Number</label>
          <input type="text" style={inputStyle} />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={columnStyle}>
          <label style={labelStyle}>Guardian Name</label>
          <input type="text" style={inputStyle} />
        </div>
        <div style={columnStyle}>
          <label style={labelStyle}>Change Password</label>
          <input type="password" style={inputStyle} />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={columnStyle}>
          <label style={labelStyle}>Relation with Student</label>
          <input type="text" style={inputStyle} />
        </div>
        <div style={columnStyle}>
          <label style={labelStyle}>Confirm Password</label>
          <input type="password" style={inputStyle} />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: isMobile ? "center" : "flex-end",
        }}
      >
        <button style={buttonStyle}>Save</button>
      </div>
    </div>
    </>
  );
};

export default SpecialProjectReportForm;
