import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Manager1 from "../images/Teacher.png";
import Login from "../Components/Login";
import Navbar from "./Navbar/Navbar";
import './Dashboard.css'

export default function Dashboard() {
  const [present, setPresent] = useState(30);
  const [absent, setAbsent] = useState(2);
  const total = present + absent;
  const attendancePercentage =
    total > 0 ? ((present / total) * 100).toFixed(1) : 0;

  const navigate = useNavigate();
  const handleContact = () => {
    navigate("/Login");
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "320px",
    marginBottom: "2%",
  };

  const sectionStyle = {
    backgroundColor: "#F8F8F8",
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
    flexWrap: "wrap",
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
    backgroundColor: "#F8F8F8",
    padding: "15px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "250px",
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
    fontSize: "15px",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "99%", marginLeft: 10 }}>
   <div
  style={{
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
  }}
>
  {/* Search + Buttons Section */}
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      flex: "1 1 300px",
      gap: "10px",
      order: 1, // comes first on mobile
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        flexWrap: "wrap",
      }}
    >
      <input
        type="text"
        placeholder="Select School"
        style={{
          padding: "10px",
          borderRadius: "17px",
          border: "1px solid #ccc",
          outline: "none",
          fontSize: "15px",
          // flex: 1,
          width: "200px",
        }}
      />
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
      }}
    >
      <button
        onClick={handleContact}
        style={{
          backgroundColor: "#1a1a56",
          color: "white",
          padding: "10px 15px",
          borderRadius: "17px",
          border: "none",
          cursor: "pointer",
          fontSize: "15px",
          width: "180px",
        }}
      >
        <a style={{ color: "white", textDecoration: "none" }}>
          Add New School
        </a>
      </button>
      <button
        onClick={handleContact}
        style={{
          backgroundColor: "#1a1a56",
          color: "white",
          padding: "10px 15px",
          borderRadius: "17px",
          border: "none",
          cursor: "pointer",
          fontSize: "15px",
          width: "180px",
        }}
      >
        <a style={{ color: "white", textDecoration: "none" }}>
          Create Login
        </a>
      </button>
    </div>
    </div>

  </div>

  {/* Navbar (Shown right in desktop, bottom in mobile) */}
  <div
    style={{
      flex: "1 1 200px",
      display: "flex",
      justifyContent: "flex-end",
      order: 2, // comes after search/buttons on mobile
    }}
  >
    <Navbar />
  </div>
</div>

      
      {/* panel code */}
      <div style={{ display: "flex", flexDirection: "row", marginTop: -25, flexWrap: "wrap" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            flex: "1 1 600px",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#ABBFFC80",
              padding: "10px",
              borderRadius: "10px",
              position: "relative",
              overflow: "visible", 
              height: 75,
              marginBottom: "20px",
            }}
          >
            <div>
              <h3
                style={{
                  margin: "5px 0",
                  color: "#F75F00",
                }}
              >
                Welcome back, Admin
              </h3>
            </div>
            <div>
              <img
                src={Manager1}
                alt="Manager"
                style={{
                  position: "absolute",
                  top: "-37px",
                  right: "2px",
                  width: "130px",
                  height: "130px",
                }}
              />
            </div>
          </div>
          
          {/* 1 */}
          <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            flexWrap: "wrap",
            gap: "2%",
          }}>
            <div style={{
              width: "49%",
              flex: "1 1 280px",
              minHeight: 142,
              backgroundColor: "#ABBFFC80",
              borderRadius: 5,
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}>
              <div style={{
                width: "45px",
                height: "45px",
                backgroundColor: "#241F63",
                borderRadius: 30,
                display: "flex", 
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginLeft: 8
              }}>
                <img src={require('../images/profiile.png')} style={{height: 30, width: 30}}/>
              </div>
              <div style={{marginTop: -10}}>
                <p style={{fontSize: 18, color: "#241F63", fontWeight: "800", marginLeft: 10}}>Student Report</p>
              </div>
              <div style={{
                width: "80%",
                height: 35,
                marginLeft: 8,
                backgroundColor: "white",
                marginTop: -9,
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center"
              }}>
                <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center"}}>
                  <p style={{fontSize: 10}}>86</p>
                  <p style={{fontSize: 10, marginTop: -10}}>Total Present</p>
                </div>
                <div style={{height: "80%", border: "1px solid grey", width: "0.1px"}}></div>
                <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center"}}>
                  <p style={{fontSize: 10}}>86</p>
                  <p style={{fontSize: 10, marginTop: -10}}>Total Present</p>
                </div>
                <div style={{height: "80%", border: "1px solid grey", width: "0.1px"}}></div>
                <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center"}}>
                  <p style={{fontSize: 10}}>86</p>
                  <p style={{fontSize: 10, marginTop: -10}}>Total Present</p>
                </div>
              </div>
            </div>
            
            <div style={{
              width: "49%",
              flex: "1 1 280px",
              minHeight: 142,
              backgroundColor: "#ABBFFC80",
              borderRadius: 5,
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}>
              <div style={{
                width: "45px",
                height: "45px",
                backgroundColor: "#241F63",
                borderRadius: 30,
                display: "flex", 
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginLeft: 8
              }}>
                <img src={require('../images/profiile.png')} style={{height: 30, width: 30}}/>
              </div>
              <div style={{marginTop: -10}}>
                <p style={{fontSize: 18, color: "#241F63", fontWeight: "800", marginLeft: 10}}>Teacher Report</p>
              </div>
              <div style={{
                width: "80%",
                height: 35,
                marginLeft: 8,
                backgroundColor: "white",
                marginTop: -9,
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center"
              }}>
                <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center"}}>
                  <p style={{fontSize: 10}}>86</p>
                  <p style={{fontSize: 10, marginTop: -10}}>Test Report</p>
                </div>
                <div style={{height: "80%", border: "1px solid grey", width: "0.1px"}}></div>
                <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center"}}>
                  <p style={{fontSize: 10}}>86</p>
                  <p style={{fontSize: 10, marginTop: -10}}>Absent</p>
                </div>
                <div style={{height: "80%", border: "1px solid grey", width: "0.1px"}}></div>
                <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center"}}>
                  <p style={{fontSize: 10}}>86</p>
                  <p style={{fontSize: 10, marginTop: -10}}>Total</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 2 */}
          <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2%",
          }}>
            <div style={{
              width: "49%",
              flex: "1 1 280px",
              minHeight: 142,
              backgroundColor: "#ABBFFC80",
              borderRadius: 5,
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}>
              <div style={{
                width: "45px",
                height: "45px",
                backgroundColor: "#241F63",
                borderRadius: 30,
                display: "flex", 
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginLeft: 8
              }}>
                <img src={require('../images/profiile.png')} style={{height: 30, width: 30}}/>
              </div>
              <div style={{marginTop: -10}}>
                <p style={{fontSize: 18, color: "#241F63", fontWeight: "800", marginLeft: 10}}>Create Session</p>
              </div>
              <div style={{
                width: "80%",
                height: 35,
                marginLeft: 8,
                backgroundColor: "white",
                marginTop: -9,
                borderRadius: 10,
                display: "flex",
                flexDirection: "row"
              }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 8,
                }}>
                  <p style={{fontSize: 10}}>86</p>
                  <p style={{fontSize: 10, marginTop: -10}}>Total Sessions Created</p>
                </div>
              </div>
            </div>
            
            <div style={{
              width: "49%",
              flex: "1 1 280px",
              minHeight: 142,
              backgroundColor: "#ABBFFC80",
              borderRadius: 5,
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}>
              <div style={{
                width: "45px",
                height: "45px",
                backgroundColor: "#241F63",
                borderRadius: 30,
                display: "flex", 
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginLeft: 8
              }}>
                <img src={require('../images/profiile.png')} style={{height: 30, width: 30}}/>
              </div>
              <div style={{marginTop: -10}}>
                <p style={{fontSize: 18, color: "#241F63", fontWeight: "800", marginLeft: 10}}>Create Test</p>
              </div>
              <div style={{
                width: "80%",
                height: 35,
                marginLeft: 8,
                backgroundColor: "white",
                marginTop: -9,
                borderRadius: 10,
                display: "flex",
                flexDirection: "row"
              }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 8,
                }}>
                  <p style={{fontSize: 10}}>86</p>
                  <p style={{fontSize: 10, marginTop: -10}}>Total Tests Created</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 3 */}
          <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2%",
          }}>
            <div style={{
              width: "49%",
              flex: "1 1 280px",
              minHeight: 142,
              backgroundColor: "#ABBFFC80",
              borderRadius: 5,
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}>
              <div style={{
                width: "45px",
                height: "45px",
                backgroundColor: "#241F63",
                borderRadius: 30,
                display: "flex", 
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginLeft: 8
              }}>
                <img src={require('../images/profiile.png')} style={{height: 30, width: 30}}/>
              </div>
              <div style={{marginTop: -10}}>
                <p style={{fontSize: 18, color: "#241F63", fontWeight: "800", marginLeft: 10}}>Create Question Bank</p>
              </div>
              <div style={{
                width: "80%",
                height: 35,
                marginLeft: 8,
                backgroundColor: "white",
                marginTop: -9,
                borderRadius: 10,
                display: "flex",
                flexDirection: "row"
              }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                  marginLeft: 8,
                  alignItems: "center"
                }}>
                  <p style={{fontSize: 10}}>86</p>
                  <p style={{fontSize: 10, marginTop: -10}}>Total Question Bank Created</p>
                </div>
              </div>
            </div>
            
            <div style={{
              width: "49%",
              flex: "1 1 280px",
              minHeight: 142,
              backgroundColor: "#ABBFFC80",
              borderRadius: 5,
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
            }}>
              <div style={{
                width: "45px",
                height: "45px",
                backgroundColor: "#241F63",
                borderRadius: 30,
                display: "flex", 
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginLeft: 8
              }}>
                <img src={require('../images/profiile.png')} style={{height: 30, width: 30}}/>
              </div>
              <div style={{marginTop: -10}}>
                <p style={{fontSize: 18, color: "#241F63", fontWeight: "800", marginLeft: 10}}>Test Report</p>
              </div>
              <div style={{
                width: "80%",
                height: 35,
                marginLeft: 8,
                backgroundColor: "white",
                marginTop: -9,
                borderRadius: 10,
                display: "flex",
                flexDirection: "row"
              }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                  marginLeft: 8,
                  alignItems: "center"
                }}>
                  <p style={{fontSize: 10}}>86</p>
                  <p style={{fontSize: 10, marginTop: -10}}>Total Tests Created</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "0",
            flex: "1 1 320px",
            marginTop: "20px",
          }}
        >
          <div style={containerStyle}>
            {/* Attendance Report */}
            <div>
              <p style={titleStyle1}>Attendance Report</p>
              <div style={sectionStyle}>
                <div style={chartContainerStyle}>
                  <div style={chartStyle}>{attendancePercentage}%</div>
                </div>
                <div style={textRowStyle}>
                  <span>
                    <input
                      type="number"
                      value={present}
                      onChange={(e) => setPresent(Number(e.target.value))}
                      style={inputStyle}
                      placeholder="Present"
                    />{" "}
                    <br /> Present Students
                  </span>
                  <span>
                    <input
                      type="number"
                      value={absent}
                      onChange={(e) => setAbsent(Number(e.target.value))}
                      style={inputStyle}
                      placeholder="Absent"
                    />{" "}
                    <br /> Absent Students
                  </span>
                  <span>
                    <input
                      type="number"
                      value={total}
                      onChange={(e) => setPresent(Number(e.target.value))}
                      style={inputStyle}
                      placeholder="Total"
                    />{" "}
                    <br /> Total Students
                  </span>
                </div>
              </div>
            </div>

            {/* Message Box */}
            <div>
              <p style={titleStyle1}>Message Box</p>
              <div
                style={{
                  backgroundColor: "#F8F8F8",
                  padding: "20px",
                  borderRadius: "10px",
                  textAlign: "center",
                  height: "100px",
                }}
              >
                &nbsp;{" "}
                <input
                  type="text"
                  style={{ borderRadius: "10px", height: "100%", width: "100%" }}
                />{" "}
              </div>
            </div>

            {/* Special Projects */}
            <div>
              <p style={titleStyle1}>Special Projects</p>
              <div
                style={{
                  backgroundColor: "#F8F8F8",
                  padding: "20px",
                  borderRadius: "10px",
                  textAlign: "center",
                  height: "100px",
                }}
              >
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}