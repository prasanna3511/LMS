import React, { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import { useNavigate } from "react-router-dom";

export default function StudentLogin() {
  const [formData, setFormData] = useState({
    studentName: "",
    grade: "",
    password: "",
    parentName: "",
    whatsapp: "",
    email: "",
    address: "",
    mobile: "",
    dob: "",
  });
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) newErrors.studentName = "Required";
    if (!formData.grade) newErrors.grade = "Select a grade";
    if (!formData.schoolId) newErrors.schoolId = "Select a School";
    if (!formData.password) newErrors.password = "Required";
    if (!formData.parentName.trim()) newErrors.parentName = "Required";
    if (!/^\d{10}$/.test(formData.whatsapp)) newErrors.whatsapp = "Enter 10-digit number";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.address.trim()) newErrors.address = "Required";
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Enter 10-digit number";
    if (!formData.dob) newErrors.dob = "Select date of birth";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const [getAllSchool , setGetAllSchool]=useState([])

  const handleSave = async () => {
    if (validate()) {
      // alert("Form is valid, ready to submit!");
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
      const payload = {
        full_name: formData.studentName,
        email: formData.email,
        role: "student",
        address: formData.address,
        password: formData.password,
        mobile_number: formData.mobile,
        school_name: "Your School Name",     // Adjust this as needed
        whatsapp_number: formData.whatsapp,
        date_of_birth: formData.dob,
        username: formData.studentName,      // You can use email or another unique ID if preferred
        grade: formData.grade,
        parent_name: formData.parentName,
        relation: "Father",                  // Adjust as needed
        school_id: userData.role === 'principle'?userData.school_id:formData.schoolId,                      // Adjust as needed,
        date_of_joining:formattedDate
      };
      try {
        const result = await apiRequest({
          endpoint: "users/create.php", // change to your correct endpoint
          method: "POST",
          data: payload,
        });
    
        if (result.status === "success") {
          alert('Student Added Successfully')
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

  useEffect(()=>{
    const fetchSchoolData = async()=>{
      try {
        const result = await apiRequest({
          endpoint: "school/getallschool.php",
          method: "GET",
          data: {},
        });
    
        if (result.status === "success") {
          // alert("Session creation completed");
          setGetAllSchool(result.data)
          console.log("result school",result)
          // navigate("/dashboard");
        } else {
          alert(result.message || "Session creation failed");
        }
      } catch (err) {
        alert(err.message || "Something went wrong");
      }
    }
    fetchSchoolData()
      },[])
  return (
    <div style={{ margin: "0", marginLeft: "20px" }}>
      <h2 style={{ color: "orangered", textAlign: "left", fontSize: "30px", paddingLeft: "3%" }}>
        Student Login
      </h2>
      <div style={containerStyle}>
        <div style={formStyle}>
          <label style={labelStyle}>Student Name</label>
          <input
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            type="text"
            placeholder="Your Name"
            style={inputStyle}
          />
          {errors.studentName && <div style={errorStyle}>{errors.studentName}</div>}

          <label style={labelStyle}>Grade</label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            style={{ ...inputStyle, backgroundColor:'white'}}
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
          {errors.grade && <div style={errorStyle}>{errors.grade}</div>}
         
          { userData.role !== 'principle'&&<>
          <label style={labelStyle}>School</label>
          <select
            name="schoolId"
            value={formData.schoolId}
            onChange={handleChange}
            style={{ ...inputStyle, backgroundColor:'white'}}
          >
            <option value="">Select School</option>
            {getAllSchool.map((school) => {
                  return (
                    <option key={school.id} value={school.id}>
                      {school.school_name}
                    </option>
                  );
                })}
          </select>
          {errors.schoolId && <div style={errorStyle}>{errors.schoolId}</div>}
          </>}
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

          <label style={labelStyle}>Parent Name</label>
          <input
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            type="text"
            placeholder="Parent Name"
            style={inputStyle}
          />
          {errors.parentName && <div style={errorStyle}>{errors.parentName}</div>}

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
        </div>
      </div>

      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={()=>navigate(-1)}>Back</button>
        <button style={buttonStyle} onClick={handleSave}>Create Student Login</button>
      </div>
    </div>
  );
}
