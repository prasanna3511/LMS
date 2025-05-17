import React, { useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { useLocation } from "react-router-dom";

export default function TeacherPrinciple() {
  const [formData, setFormData] = useState({
    fullname: "",
    role: "",
    password: "",
    username: "",
    whatsapp: "",
    email: "",
    address: "",
    mobile: "",
    dob: "",
    doj:null,
  });
  const location = useLocation();
  const { data } = location.state || {};
  console.log("data : ",data)
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) newErrors.fullname = "Required";
    if (!formData.role) newErrors.role = "Select a role";
    if (!formData.password) newErrors.password = "Required";
    if (!formData.username.trim()) newErrors.username = "Required";
    if (!/^\d{10}$/.test(formData.whatsapp)) newErrors.whatsapp = "Enter 10-digit number";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.address.trim()) newErrors.address = "Required";
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Enter 10-digit number";
    if (!formData.dob) newErrors.dob = "Select date of birth";
    if (!formData.doj) newErrors.doj = "Select date of birth";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validate()) {
      // alert("Form is valid, ready to submit!");
      const payload = {
        full_name: formData.fullname,
        email: formData.email,
        role: formData.role,
        address: formData.address,
        password: formData.password,
        mobile_number: formData.mobile,
        school_name: "Your School Name",     // Adjust this as needed
        whatsapp_number: formData.whatsapp,
        date_of_birth: formData.dob,
        username: formData.username,      // You can use email or another unique ID if preferred
        grade: 'formData.grade',
        parent_name: "formData.username",
        relation: "Father",                  // Adjust as needed
        school_id: data.id,  
        date_of_joining:formData.doj                    // Adjust as needed
      };
      try {
        const result = await apiRequest({
          endpoint: "users/create.php", // change to your correct endpoint
          method: "POST",
          data: payload,
        });
    
        if (result.status === "success") {
          alert('done')
        } else {
          alert(result.message || "Failed to add question");
        }
      } catch (err) {
        alert(err.message || "Something went wrong");
      }
      // Proceed with API call or next steps
    }
  };

  // Style definitions
  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "Arial, sans-serif",
  };

  const formStyle = {
    width: "40%",
    marginRight: "6%",
    marginLeft: "3%",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0 2px",
    borderRadius: "15px",
    border: "1px solid black",
    fontSize: "16px",
  };

  const labelStyle = {
    fontWeight: "bold",
    display: "block",
    marginTop: "10px",
    fontSize: "20px",
  };

  const errorStyle = {
    color: "red",
    fontSize: "13px",
    marginBottom: "5px",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  };

  const buttonStyle = {
    backgroundColor: "#1A1A64",
    color: "white",
    padding: "15px 30px",
    borderRadius: "15px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    margin: "0 10px",
  };

  return (
    <div style={{ margin: "0", marginLeft: "20px" }}>
      <h2 style={{ color: "orangered", textAlign: "left", fontSize: "30px", paddingLeft: "3%" }}>
        Teacher/Principle Login
      </h2>
      <div style={containerStyle}>
        <div style={formStyle}>
          <label style={labelStyle}>Full Name</label>
          <input
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            type="text"
            placeholder="Your Name"
            style={inputStyle}
          />
          {errors.fullname && <div style={errorStyle}>{errors.fullname}</div>}

          <label style={labelStyle}>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ ...inputStyle, backgroundColor:'white'}}
          >
            <option value="">Select role</option>
            <option>teacher</option>
            <option>principle</option>
            <option>admin</option>
          </select>
          {errors.role && <div style={errorStyle}>{errors.role}</div>}

          <label style={labelStyle}>Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Enter Password"
            style={inputStyle}
          />
          {errors.password && <div style={errorStyle}>{errors.password}</div>}

          <label style={labelStyle}>User Name</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="User Name"
            style={inputStyle}
          />
          {errors.username && <div style={errorStyle}>{errors.username}</div>}

          <label style={labelStyle}>WhatsApp Number</label>
          <input
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            type="text"
            placeholder="WhatsApp Number"
            style={inputStyle}
          />
          {errors.whatsapp && <div style={errorStyle}>{errors.whatsapp}</div>}
        </div>

        <div style={formStyle}>
          <label style={labelStyle}>Email Id</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Id"
            style={inputStyle}
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}

          <label style={labelStyle}>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            style={{ ...inputStyle, height: "107px" }}
          />
          {errors.address && <div style={errorStyle}>{errors.address}</div>}

          <label style={labelStyle}>Mobile Number</label>
          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            type="text"
            placeholder="Mobile Number"
            style={inputStyle}
          />
          {errors.mobile && <div style={errorStyle}>{errors.mobile}</div>}

          <label style={labelStyle}>Date of Birth</label>
          <input
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            type="date"
            style={inputStyle}
          />
          {errors.dob && <div style={errorStyle}>{errors.dob}</div>}
          <label style={labelStyle}>Date of Joining</label>

          <input
            name="doj"
            value={formData.doj}
            onChange={handleChange}
            type="date"
            style={inputStyle}
          />
          {errors.doj && <div style={errorStyle}>{errors.doj}</div>}
        </div>
        
      </div>

      <div style={buttonContainerStyle}>
        <button style={buttonStyle}>Back</button>
        <button style={buttonStyle} onClick={handleSave}>Create Student Login</button>
        {/* <button style={buttonStyle}>Save & Add Student</button> */}
      </div>
    </div>
  );
}
