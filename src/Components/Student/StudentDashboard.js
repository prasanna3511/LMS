import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Manager1 from "../../images/Teacher.png";

export default function StudentDashboard() {
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
    width: "320px",
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
    backgroundColor: "#F8F8F8",
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
    fontSize: "15px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "99%",
        marginLeft: 10,
      }}
    >
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
              }}
            />
            <button
              style={{
                backgroundColor: "#1a1a56",
                color: "white",
                padding: "10px 15px",
                borderRadius: "17px",
                border: "none",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Search
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
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
            <img
              style={{ height: 30, width: 30, marginLeft: 20 }}
              src={require("../../images/bell-ringing.png")}
            />
          </div>
        </div>
      </div>
      {/* panel code */}
      <div style={{ display: "flex", flexDirection: "row", marginTop: -25 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            justifyContent: "center",
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
            }}
          >
            <div>
              <h3
                style={{
                  margin: "5px 0",
                  color: "#F75F00",
                }}
              >
                Welcome back, Student
              </h3>
            </div>
            <div>
              <img
                src={Manager1}
                alt="Manager"
                style={{
                  position: "absolute",
                  top: "-37px", // Adjust as needed
                  right: "2px", // Adjust position on the right
                  width: "130px", // Adjust size
                  height: "130px",
                }}
              />
            </div>
          </div>
          {/* 1 */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <div
              style={{
                width: "49%",
                height: 142,
                backgroundColor: "#ABBFFC80",
                borderRadius: 5,
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  backgroundColor: "#241F63",
                  borderRadius: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  marginLeft: 8,
                }}
              >
                <img
                  src={require("../../images/profiile.png")}
                  style={{ height: 30, width: 30 }}
                />
              </div>
              <div style={{ marginTop: -10 }}>
                <p
                  style={{
                    fontSize: 18,
                    color: "#241F63",
                    fontWeight: "800",
                    marginLeft: 10,
                  }}
                >
                  View Myself
                </p>
              </div>
              <div
                style={{
                  width: "80%",
                  height: 35,
                  marginLeft: 8,
                  backgroundColor: "white",
                  marginTop: -9,
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: 10 }}>Name of stduent </p>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "49%",
                height: 142,
                backgroundColor: "#ABBFFC80",
                borderRadius: 5,
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  backgroundColor: "#241F63",
                  borderRadius: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  marginLeft: 8,
                }}
              >
                <img
                  src={require("../../images/profiile.png")}
                  style={{ height: 30, width: 30 }}
                />
              </div>
              <div style={{ marginTop: -10 }}>
                <p
                  style={{
                    fontSize: 18,
                    color: "#241F63",
                    fontWeight: "800",
                    marginLeft: 10,
                  }}
                >
                  Attendance Report
                </p>
              </div>
              <div
                style={{
                  width: "80%",
                  height: 35,
                  marginLeft: 8,
                  backgroundColor: "white",
                  marginTop: -9,
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: 10 }}>8</p>
                  <p style={{ fontSize: 10, marginTop: -10 }}>
                    Completed Session
                  </p>
                </div>
                <div
                  style={{
                    height: "80%",
                    border: "1px solid grey",
                    width: "0.1px",
                  }}
                ></div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: 10 }}>8</p>
                  <p style={{ fontSize: 10, marginTop: -10 }}>
                    Pending Session
                  </p>
                </div>
                <div
                  style={{
                    height: "80%",
                    border: "1px solid grey",
                    width: "0.1px",
                  }}
                ></div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: 10 }}>8</p>
                  <p style={{ fontSize: 10, marginTop: -10 }}>Total Session</p>
                </div>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "49%",
                height: 142,
                backgroundColor: "#ABBFFC80",
                borderRadius: 5,
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  backgroundColor: "#241F63",
                  borderRadius: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  marginLeft: 8,
                }}
              >
                <img
                  src={require("../../images/profiile.png")}
                  style={{ height: 30, width: 30 }}
                />
              </div>
              <div style={{ marginTop: -10 }}>
                <p
                  style={{
                    fontSize: 18,
                    color: "#241F63",
                    fontWeight: "800",
                    marginLeft: 10,
                  }}
                >
                  Speacial Project
                </p>
              </div>
              <div
                style={{
                  width: "80%",
                  height: 35,
                  marginLeft: 8,
                  backgroundColor: "white",
                  marginTop: -9,
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 8,
                  }}
                >
                  <p style={{ fontSize: 10 }}>8 </p>
                  <p style={{ fontSize: 10, marginTop: -10 }}>
                    Number Project Done
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "49%",
                height: 142,
                backgroundColor: "#ABBFFC80",
                borderRadius: 5,
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  backgroundColor: "#241F63",
                  borderRadius: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  marginLeft: 8,
                }}
              >
                <img
                  src={require("../../images/profiile.png")}
                  style={{ height: 30, width: 30 }}
                />
              </div>
              <div style={{ marginTop: -10 }}>
                <p
                  style={{
                    fontSize: 18,
                    color: "#241F63",
                    fontWeight: "800",
                    marginLeft: 10,
                  }}
                >
                  View Holiday
                </p>
              </div>
              <div
                style={{
                  width: "80%",
                  height: 35,
                  marginLeft: 8,
                  backgroundColor: "white",
                  marginTop: -9,
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 8,
                  }}
                >
                  <p style={{ fontSize: 10 }}>Upcoming Holiday</p>
                </div>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "49%",
                height: 142,
                backgroundColor: "#ABBFFC80",
                borderRadius: 5,
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  backgroundColor: "#241F63",
                  borderRadius: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  marginLeft: 8,
                }}
              >
                <img
                  src={require("../../images/profiile.png")}
                  style={{ height: 30, width: 30 }}
                />
              </div>
              <div style={{ marginTop: -10 }}>
                <p
                  style={{
                    fontSize: 18,
                    color: "#241F63",
                    fontWeight: "800",
                    marginLeft: 10,
                  }}
                >
                  Test Report
                </p>
              </div>
              <div
                style={{
                  width: "80%",
                  height: 35,
                  marginLeft: 8,
                  backgroundColor: "white",
                  marginTop: -9,
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "center",
                    marginLeft: 8,
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: 10 }}>86</p>
                  <p style={{ fontSize: 10, marginTop: -10 }}>
                    Total Test Created
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "49%",
                height: 142,
                backgroundColor: "#ABBFFC80",
                borderRadius: 5,
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  backgroundColor: "#241F63",
                  borderRadius: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  marginLeft: 8,
                }}
              >
                <img
                  src={require("../../images/profiile.png")}
                  style={{ height: 30, width: 30 }}
                />
              </div>
              <div style={{ marginTop: -10 }}>
                <p
                  style={{
                    fontSize: 18,
                    color: "#241F63",
                    fontWeight: "800",
                    marginLeft: 10,
                  }}
                >
                  View Question Bank
                </p>
              </div>
              <div
                style={{
                  width: "80%",
                  height: 35,
                  marginLeft: 8,
                  backgroundColor: "white",
                  marginTop: -9,
                  borderRadius: 10,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "center",
                    marginLeft: 8,
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: 10 }}>100</p>
                  <p style={{ fontSize: 10, marginTop: -10 }}>Questions</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div style={{width:'50%',height:142,backgroundColor:'#ABBFFC80'}}></div>
          <div style={{width:'50%',height:142,backgroundColor:'#ABBFFC80'}}></div>
          <div style={{width:'50%',height:142,backgroundColor:'#ABBFFC80'}}></div>
          <div style={{width:'50%',height:142,backgroundColor:'#ABBFFC80'}}></div> */}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginLeft: "20px",
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
                  style={{ borderRadius: "10px", height: "100%" }}
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
