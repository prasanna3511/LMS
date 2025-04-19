import React from "react";

export default function Admin() {
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
  };

  return (
    <div style={{ margin:"0", marginLeft:"20px" }}>
      <h2 style={{ color: "orangered", textAlign: "left", fontSize:"30px",paddingLeft:"3%" }}>School Information</h2>
      <div style={containerStyle}>
        <div style={formStyle}>
          <label style={labelStyle}>User Name</label>
          <input type="text" style={inputStyle} />

          <label style={labelStyle}>Role</label>
          <select style={{...inputStyle , width: "520px"}} >
            <option>Select Role</option>
            <option>Principle</option>
            <option>Class Teacher</option>
            <option>Admin</option>
          </select>

          <label style={labelStyle}>Password</label>
          <input type="password"  style={inputStyle} />

          <label style={labelStyle}>Whatsapp Number</label>
          <input type="text" style={inputStyle} />

          <label style={labelStyle}>Mobile Number</label>
          <input type="text" style={inputStyle} />
        </div>

        <div style={formStyle}>
          <label style={labelStyle}>Email Id</label>
          <input type="email" style={inputStyle} />

          <label style={labelStyle}>Address</label>
          <textarea style={{...inputStyle , height:"70px"}}></textarea>

          <label style={labelStyle}>School Name</label>
          <input type="text" style={inputStyle} />

          <label style={labelStyle}>Date of Birth</label>
          <input type="date" style={inputStyle} />

          <label style={labelStyle}>Date of Joining</label>
          <input type="date" style={inputStyle} placeholder="" />
        </div>
      </div>

      <div style={buttonContainerStyle}>
        <button style={buttonStyle}>Back</button>
        <button style={buttonStyle}>Create Login</button>
      </div>
    </div>
  );
};


