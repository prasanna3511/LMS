import React, { useState } from "react";
import apiRequest from "../utils/apiRequest";
import { useNavigate } from "react-router-dom";

export default function SchoolInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schoolName: "",
    chairmanName: "",
    chairmanMobile: "",
    schoolEmail: "",
    schoolContact: "",
    schoolMobile: "",
    schoolAddress: "",
    studentCount: "",
    schoolGrades: "",
    joiningDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.schoolName.trim()) newErrors.schoolName = "School name is required";
    if (!formData.chairmanName.trim()) newErrors.chairmanName = "Chairman name is required";
    if (!/^\d{10}$/.test(formData.chairmanMobile)) newErrors.chairmanMobile = "Enter valid 10-digit mobile number";
    if (!/\S+@\S+\.\S+/.test(formData.schoolEmail)) newErrors.schoolEmail = "Enter valid email";
    if (!/^\d+$/.test(formData.schoolContact)) newErrors.schoolContact = "Enter valid contact number";
    if (!/^\d+$/.test(formData.schoolMobile)) newErrors.schoolMobile = "Enter valid mobile number";
    if (!formData.schoolAddress.trim()) newErrors.schoolAddress = "Address is required";
    if (!/^\d+$/.test(formData.studentCount)) newErrors.studentCount = "Enter valid student count";
    if (!formData.schoolGrades.trim()) newErrors.schoolGrades = "Grades are required";
    if (!formData.joiningDate.trim()) newErrors.joiningDate = "Date of joining is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =async () => {
    if (validate()) {
      // alert("Form is valid! Ready to send to backend.");
      let apidata = {
        school_name:formData.schoolName,
        chairman_name:formData.chairmanName,
        chairman_mobile_number:formData.chairmanMobile,
        chairman_email_id:'dummy@gmail.com',
        school_email_id:formData.schoolEmail,
        school_contact_number:formData.schoolContact,
        school_mobile_number:formData.schoolMobile,
        school_address:formData.schoolAddress,
        school_student_count:formData.studentCount,school_grades:formData.schoolGrades,
        date_of_joining:formData.joiningDate
      }
          try {
            const result = await apiRequest({
              endpoint: "school/addschool.php",
              method: "POST",
              data: apidata,
            });
        
            if (result.status === "success") {
              alert("School addition completed");
              navigate('/dashboard')
              // navigate("/dashboard");
            } else {
              alert(result.message || "School addition failed");
            }
          } catch (err) {
            alert(err.message || "Something went wrong");
          } console.log(formData);
    } else {
      // alert("Please correct the errors.");
    }
  };
  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "Arial, sans-serif",
  };

  const formStyle = {
    width: "40%",
    marginRight: "6%",
    marginLeft: "3%"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "15px",
    border: "1px solid black",
    fontSize: "16px",
  };

  const labelStyle = {
    fontWeight: "bold",
    display: "block",
    marginTop: "10px",
    // marginLeft: "3px",
    fontSize: "20px"
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  };

  const buttonStyle = {
    backgroundColor: "#1A1A64",
    color: "white",
    padding: "15px 60px",
    borderRadius: "15px",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    margin: "0 10px",
  };  const errorStyle = {
    color: "red",
    fontSize: "14px",
    marginTop: "-10px",
    marginBottom: "10px",
  };

  return (
    <div style={{ margin:"0", marginLeft:"20px" }}>
      <h2 style={{ color: "orangered", textAlign: "left", fontSize:"30px",paddingLeft:"3%" }}>School Information</h2>
      <div style={containerStyle}>
        <div style={formStyle}>
          <label style={labelStyle}>School Name</label>
          <input type="text" value={formData.schoolName}
            onChange={handleChange}
            name="schoolName"
            style={inputStyle}
          />
          {errors.schoolName && <div style={errorStyle}>{errors.schoolName}</div>}

          <label style={labelStyle}>Chairman Name</label>
          <input type="text" value={formData.chairmanName}
           name="chairmanName"
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.chairmanName && <div style={errorStyle}>{errors.chairmanName}</div>}

          <label style={labelStyle}>Chairman Mobile Number</label>
          <input type="password"  value={formData.chairmanMobile}
          name="chairmanMobile"
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.chairmanMobile && <div style={errorStyle}>{errors.chairmanMobile}</div>}

          <label style={labelStyle}>School Email id</label>
          <input type="text" value={formData.schoolEmail}
            onChange={handleChange}
            style={inputStyle}
            name="schoolEmail"
          />
          {errors.schoolEmail && <div style={errorStyle}>{errors.schoolEmail}</div>}

          <label style={labelStyle}>School Contact Number</label>
          <input type="text" value={formData.schoolContact}
            onChange={handleChange}
            style={inputStyle}
            name="schoolContact"
          />
          {errors.schoolContact && <div style={errorStyle}>{errors.schoolContact}</div>}
        </div>

        <div style={formStyle}>
          <label style={labelStyle}>School Mobile Number</label>
          <input type="email"     value={formData.schoolMobile}
            onChange={handleChange}
            style={inputStyle}
            name="schoolMobile"
          />
          {errors.schoolMobile && <div style={errorStyle}>{errors.schoolMobile}</div>}

          <label style={labelStyle}> School Address</label>
          <textarea value={formData.schoolAddress}
            onChange={handleChange}
            style={inputStyle}
            name="schoolAddress"
          ></textarea>
          {errors.schoolAddress && <div style={errorStyle}>{errors.schoolAddress}</div>}

          <label style={labelStyle}>School Student Count</label>
          <input type="text"  value={formData.studentCount}
            onChange={handleChange}
            style={inputStyle}
            name="studentCount"
          />
          {errors.studentCount && <div style={errorStyle}>{errors.studentCount}</div>}

          <label style={labelStyle}>School Grades</label>
          <input type="text"  value={formData.schoolGrades}
            onChange={handleChange}
            style={inputStyle}
            name="schoolGrades"
          />
          {errors.schoolGrades && <div style={errorStyle}>{errors.schoolGrades}</div>}

          <label style={labelStyle}>Date of Joining</label>
          <input type="text"  value={formData.joiningDate}
            onChange={handleChange}
            style={inputStyle}
            name="joiningDate"
          />
          {errors.joiningDate && <div style={errorStyle}>{errors.joiningDate}</div>}
        </div>
      </div>

      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};


