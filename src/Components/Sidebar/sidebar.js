import React from "react";
import logout from '../../images/logout1.png'
import Dashboard from "../Dashboard";

const Sidebar = () => {
  const sidebarStyle = {
    width: "200px",
    backgroundColor: "#1a1a56",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
    margin: "1% 1% 0 2%",
    height: "90vh",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const sectionTitleStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    // marginTop: "15px",
    color: "#ffffff",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    display: "block",
    padding: "3px 0",
    cursor: "pointer",
    fontSize: "12px",
    marginLeft: "5px",
  };

  const logoutButtonStyle = {
    marginTop: "40px",
    padding: "10px",
    display:'flex',
    justifyContent:'space between'
  };

  return (
    <div style={{display:'flex', flexDirection:'row', width:'100%'}} >
      <div style={sidebarStyle}>
        <div style={titleStyle}>📚 Eduonix™ Dashboard</div>

        <div style={sectionTitleStyle}>Create</div>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <a href="#" style={linkStyle}>
              Create Session
            </a>
          </li>
          <li>
            <a href="#" style={linkStyle}>
              Create Question Bank
            </a>
          </li>
          <li>
            <a href="#" style={linkStyle}>
              Create Test
            </a>
          </li>
          <li>
            <a href="#" style={linkStyle}>
              Create Holiday
            </a>
          </li>
          <li>
            <a href="#" style={linkStyle}>
              Create Expense
            </a>
          </li>
          <li>
            <a href="#" style={linkStyle}>
              Create New Subject
            </a>
          </li>
        </ul>

        <div style={sectionTitleStyle}>Reports</div>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <a href="#" style={linkStyle}>
              Teacher Report
            </a>
          </li>
          <li>
            <a href="#" style={linkStyle}>
              Student Report
            </a>
          </li>
          <li>
            <a href="#" style={linkStyle}>
              Test Report
            </a>
          </li>
          <li>
            <a href="#" style={linkStyle}>
              School Report
            </a>
          </li>
          <li>
            <a href="#" style={linkStyle}>
              Principle/Admin Report
            </a>
          </li>
        </ul>

        <div style={sectionTitleStyle}>View</div>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <a href="#" style={linkStyle}>
              Question Bank
            </a>
          </li>
          <li>
            <a href="#" style={linkStyle}>
              Tests
            </a>
          </li>
          <li>
            <a href="#" style={linkStyle}>
              Accounts
            </a>
          </li>
          <li>
            <a href="#" style={linkStyle}>
              School Holidays
            </a>
          </li>
        </ul>

        {/* <button style={logoutButtonStyle}>
            <
            <img style={{marginTop:'10px'}} src={logout} />Logout
            </button> */}
            <div style={logoutButtonStyle} >
            <img style={{marginTop:'15px', height:30}} onClick={()=>console.log("clicked")} src={logout} />
            <h3 style={{cursor:'pointer'}}  onClick={()=>console.log("clicked")} >Logout</h3>
            </div>
      </div>

      <Dashboard/>
    </div>
  );
};

export default Sidebar;
