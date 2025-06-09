import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate()
  const sidebarStyle = {
    width: "200px",
    backgroundColor: "#1a1a56",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
    margin: "2%",
  };
  const logout = () => {
    localStorage.clear();
    navigate('/');
  };
  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const sectionTitleStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "15px",
    color: "#ffcc00",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    display: "block",
    padding: "3px 0",
    cursor: "pointer",
    fontSize: "15px"
  };

  const logoutButtonStyle = {
    marginTop: "50px",
    padding: "10px",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
  };

  return (
    <div style={sidebarStyle}>
      <div style={titleStyle}>📚 Eduonix™ Dashboard</div>

      <div style={sectionTitleStyle}>Create</div>
      <a href="#" style={linkStyle}>Create Lecture</a>
      <a href="#" style={linkStyle}>Create Practical</a>
      <a href="#" style={linkStyle}>Create Demo</a>
      <a href="#" style={linkStyle}>Create Login</a>
      <a href="#" style={linkStyle}>Create Event</a>
      <a href="#" style={linkStyle}>Create Test</a>
      <a href="#" style={linkStyle}>Create Question Bank</a>
      <a href="#" style={linkStyle}>Create Competition</a>

      <div style={sectionTitleStyle}>Reports</div>
      <a href="#" style={linkStyle}>Attendance Report</a>
      <a href="#" style={linkStyle}>Teacher Report</a>
      <a href="#" style={linkStyle}>Student Report</a>
      <a href="#" style={linkStyle}>Test Report</a>
      <a href="#" style={linkStyle}>Event Report</a>
      <a href="#" style={linkStyle}>Material Report</a>
      <a href="#" style={linkStyle}>Furniture Report</a>
      <a href="#" style={linkStyle}>School Report</a>
      <a href="#" style={linkStyle}>Principle Report</a>


      <div style={sectionTitleStyle}>View</div>
      <a href="#" style={linkStyle}>Events</a>
      <a href="#" style={linkStyle}>Teachers</a>
      <a href="#" style={linkStyle}>Schools</a>
      <a href="#" style={linkStyle}>Principles</a>
      <a href="#" style={linkStyle}>Tests</a>
      <a href="#" style={linkStyle}>Accounts</a>

      <button style={logoutButtonStyle} onClick={logout}>Logout</button>
    </div>
  );
};

export default Sidebar;
