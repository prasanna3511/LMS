import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; 
import  Manager1 from "../images/Teacher.png"
import Login from "../Components/Login"

export default function Dashboard() {

    const [present, setPresent] = useState(30);
    const [absent, setAbsent] = useState(2);
    const total = present + absent;
    const attendancePercentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;

    const navigate = useNavigate();
    const handleContact = () => {
      navigate("/Login");
    }
  
    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      width: "320px",
      marginBottom: "2%"
    };
  
    const sectionStyle = {
      backgroundColor: "rgb(211, 214, 243)",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
    };
  
    const titleStyle1 = {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#d9534f",
      marginBottom: "10px",
    };
  
    const chartContainerStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    };
  
    const chartStyle = {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      border: "8px solid #1a1a56",
      borderTopColor: "transparent",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      fontSize: "14px",
    };
  
    const textRowStyle = {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "12px",
      marginTop: "10px",
    };
  
    const inputStyle = {
      padding: "5px",
      width: "70px",
      margin: "5px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      textAlign: "center",
    };

    const cardStyle = {
        // backgroundColor: "#ABBFFC",
        backgroundColor:"rgb(211, 214, 243)",
        padding: "15px",
        borderRadius: "10px",
        width: "250px",
      };
    
      const titleStyle = {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#d9534f",
        marginBottom: "10px",
      };
    
      const buttonStyle = {
        backgroundColor: "#1a1a56",
        color: "white",
        padding: "10px",
        borderRadius: "20px",
        border: "none",
        width: "100%",
        textAlign: "center",
        cursor: "pointer",
        marginTop: "20px",
        height: "40px",
        fontSize: "15px"
      };

  return (
    <>
      <div>
        <div
          style={{
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <input
              type="text"
              placeholder="Select School"
              style={{
                padding: "15px",
                borderRadius: "17px",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "15px"
              }}
            />
            <button
              style={{
                backgroundColor: "#1a1a56",
                color: "white",
                padding: "15px 20px",
                borderRadius: "17px",
                border: "none",
                cursor: "pointer",
                fontSize: "15px"
              }}
            >
              Search
            </button>
          </div>

          <button onClick={handleContact}
            style={{
              backgroundColor: "#1a1a56",
              color: "white",
              padding: "15px 20px",
              borderRadius: "17px",
              border: "none",
              cursor: "pointer",
              fontSize: "15px"
            }}
          >
             <a style={{color: "white", textDecoration: "none"}}>Create Login for Teacher /Principal</a>
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              👤
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: "bold" }}>Bhavin</p>
              <p style={{ margin: 0, fontSize: "12px", color: "gray" }}>
                Admin
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#d3d6f3",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >

        <div>
          <p style={{ fontSize: "14px", color: "#1a1a56", margin: "0" , fontWeight: "500" }}>
            February 4, 2024
          </p>
          <h2 style={{ margin: "5px 0", fontWeight: "bold", color: "#1a1a56" }}>
            Welcome back, Admin
          </h2>
          <p style={{ fontSize: "14px", color: "#1a1a56", margin: "0", fontWeight: "500" }}>
            Always stay updated
          </p>
        </div>


        <div>
          <img src={Manager1} alt=""  />
          {/* <FcManager size={100} /> */}
        </div>
      </div>
      <div style={{display: "flex", justifyContent:"space-evenly"}}>
      <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
        <div>
        <p style={titleStyle}>Allocation</p>
      <div style={cardStyle}>
        
        <button style={buttonStyle}>Lecture Allocation</button>
        <button style={buttonStyle}>Practical Allocation</button>
        <button style={buttonStyle}>Demo Allocation</button>
      </div>
      </div>


<div>
      <p style={titleStyle}>Teacher</p>
      <div style={cardStyle}> 
        <button style={buttonStyle}>Attendance</button>
        <button style={buttonStyle}>Completed Lectures</button>
        <button style={buttonStyle}>Teacher Report</button>
      </div>
      </div>


<div>
      <p style={titleStyle}>Teacher</p>
      <div style={cardStyle}>
        
        <button style={buttonStyle}>Preview Work</button>
        <button style={buttonStyle}>Total Attendance</button>
        <button style={buttonStyle}>Total Student</button>
        <button style={buttonStyle}>Student Work</button>
      </div>
      </div>

<div>
      <p style={titleStyle}>Test</p>
      <div style={cardStyle}>
        <button style={buttonStyle}>Total Test</button>
        <button style={buttonStyle}>Create Test</button>
        <button style={buttonStyle}>View Test</button>
        <button style={buttonStyle}>Create Question Bank</button>
      </div>
      </div>
      </div>

      <div style={containerStyle}>
      {/* Attendance Report */}
      <div>
        <p style={titleStyle1}>Attendance Report</p>
        <div style={sectionStyle}>
          <div style={chartContainerStyle}>
            <div style={chartStyle}>{attendancePercentage}%</div>
          </div>
          <div style={textRowStyle}>
            <span><input
              type="number"
              value={present}
              onChange={(e) => setPresent(Number(e.target.value))}
              style={inputStyle}
              placeholder="Present"
            /> <br /> Present Students</span>
            <span><input
              type="number"
              value={absent}
              onChange={(e) => setAbsent(Number(e.target.value))}
              style={inputStyle}
              placeholder="Absent"
            /> <br /> Absent Students</span>
            <span><input
              type="number"
              value={total}
              onChange={(e) => setPresent(Number(e.target.value))}
              style={inputStyle}
              placeholder="Total"
            /> <br /> Total Students</span>
          </div>
        </div>
      </div>

      {/* Message Box */}
      <div>
        <p style={titleStyle1}>Message Box</p>
        <div style={{backgroundColor: "rgb(211, 214, 243)",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      height: "100px"}}>&nbsp; <input
      type="text" style={{borderRadius:"10px",height:"100%"}}/> </div>
      </div>

      {/* Special Projects */}
      <div>
        <p style={titleStyle1}>Special Projects</p>
        <div style={{ backgroundColor: "rgb(211, 214, 243)",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      height: "100px"}}>&nbsp;</div>
      </div>
    </div>
    </div>
    </>
  );
}
