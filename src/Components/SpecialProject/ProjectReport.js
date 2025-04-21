import React from "react";

const SpecialProjectReportForm = () => {
  const containerStyle = {
    maxWidth: "1200px",
    margin: "20px auto",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
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
    <div style={containerStyle}>
        <div style={{width:'100%', display:'flex', flexDirection:'row' , alignItems:'center'}} >
        <div style={titleStyle}>Special Project Report</div>

<div style={{...rowStyle,marginLeft:20}}>
  <div style={columnStyle}>
    <label style={labelStyle}>School Name</label>
    <input type="text" style={inputStyle} />
  </div>
</div>
        </div>
  <div style={{ ...imageBoxStyle }} />
   

      <div style={rowStyle}>
        <div style={columnStyle}>
          <label style={labelStyle}>Full Name</label>
          <input type="text" style={inputStyle} />
        </div>
        <div style={columnStyle}>
          <label style={labelStyle}>Grade</label>
          <input type="text" style={inputStyle} />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={columnStyle}>
          <label style={labelStyle}>Address</label>
          <input type="text" style={inputStyle} />
        </div>
        <div style={columnStyle}>
          <label style={labelStyle}>Date of Birth</label>
          <input type="date" style={inputStyle} />
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

      <button style={buttonStyle}>Save</button>
    </div>
  );
};

export default SpecialProjectReportForm;
