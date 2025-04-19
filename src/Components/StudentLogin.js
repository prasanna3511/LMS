import React from "react";

export default function StudentLogin() {
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
    padding: "15px 30px",
    borderRadius: "15px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    margin: "0 10px",
  };

  return (
    <div style={{ margin:"0", marginLeft:"20px" }}>
      <h2 style={{ color: "orangered", textAlign: "left", fontSize:"30px",paddingLeft:"3%" }}>Student Login</h2>
      <div style={containerStyle}>
        <div style={formStyle}>
          <label style={labelStyle}>Student Name</label>
          <input type="text" placeholder="Your Name" style={inputStyle} />

          <label style={labelStyle}>Grade</label>
          <select style={{...inputStyle, width:"520px"}}>
            <option>Select Grade</option>
            <option>11th</option>
            <option>12th</option>
          </select>

          <label style={labelStyle}>Password</label>
          <input type="password" placeholder="Enter Password" style={inputStyle} />

          <label style={labelStyle}>Parent Name</label>
          <input type="text" placeholder="Parent Name" style={inputStyle} />

          <label style={labelStyle}>WhatsApp Number</label>
          <input type="text" placeholder="WhatsApp Number" style={inputStyle} />
        </div>

        <div style={formStyle}>
          <label style={labelStyle}>Email Id</label>
          <input type="email" placeholder="Email Id" style={inputStyle} />

          <label style={labelStyle}>Address</label>
          <textarea placeholder="Address" style={{ ...inputStyle, height: "107px" }}></textarea>

          <label style={labelStyle}>Mobile Number</label>
          <input type="text" placeholder="Mobile Number" style={inputStyle} />

          <label style={labelStyle}>Date of Birth</label>
          <input type="date" style={inputStyle} />
        </div>
      </div>

      <div style={buttonContainerStyle}>
        <button style={buttonStyle}>Back</button>
        <button style={buttonStyle}>Create Login</button>
        <button style={buttonStyle}>Save & Add Student</button>
      </div>
    </div>
  );
};


