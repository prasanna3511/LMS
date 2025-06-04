import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import apiRequest from "../../utils/apiRequest";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todaysSession , setTodaysSession] = useState([])
  const startOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    return new Date(d.setDate(diff));
  };

  const getWeekDates = (date) => {
    const start = startOfWeek(date);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const isSameDay = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const goToPreviousWeek = () => {
    const prev = new Date(currentDate);
    prev.setDate(currentDate.getDate() - 7);
    setCurrentDate(prev);
  };

  const goToNextWeek = () => {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() + 7);
    setCurrentDate(next);
  };

  const monthYear = `${currentDate.toLocaleString("default", {
    month: "long",
  })} ${currentDate.getFullYear()}`;
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
  const weekDates = getWeekDates(currentDate);
  const sessionData = [
    {
      grade: 6,
      topic: "Math Basics",
      description: "Introduction to fractions",
      completed: false,
    },
    {
      grade: 7,
      topic: "Algebra",
      description: "Linear equations",
      completed: true,
    },
    {
      grade: 8,
      topic: "Geometry",
      description: "Angles and lines",
      completed: false,
    },
  ];
  const userData = JSON.parse(localStorage.getItem('userData'))
  const fetchHolidays = async () => {
    const res = await apiRequest({
      endpoint: 'teacherSession/getTodaysSession.php', // your actual PHP file
      method: 'POST',
      data: {
        school_id: userData.school_id,
      },
    });
    if (res.status === 'success') {
      console.log("res getTodaysSession: ",res)
      setTodaysSession(res.data);
    } else {
      console.error(res.message);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            style={{ padding: "8px", width: "300px", borderRadius: 17 }}
          />
          <div>
            <button
              style={{
                margin: "0 5px",
                padding: "8px 16px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: 20,
              }}
            >
              Start Day
            </button>
            <button
              style={{
                margin: "0 5px",
                padding: "8px 16px",
                backgroundColor: "#A9290E",
                color: "white",
                border: "none",
                borderRadius: 20,
              }}
            >
              End Day
            </button>
            <button
              style={{
                margin: "0 5px",
                padding: "8px 16px",
                backgroundColor: "#241F63",
                color: "white",
                border: "none",
                borderRadius: 20,
              }}
            >
              Create Student Login
            </button>
          </div>
          {/* <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://via.placeholder.com/40"
              alt="avatar"
              style={{ borderRadius: "50%" }}
            />
            <div style={{ marginLeft: "10px" }}>
              <div>Sangeeta</div>
              <small>Teacher</small>
            </div>
          </div> */}
          <Navbar />
        </div>

        <div
          style={{
            width: "67%",
            height: 100,
            backgroundColor: "#ABBFFC80",
            display: "flex",
            alignItems: "center",
            marginTop: 10,
            borderRadius: 10,
          }}
        >
          <h2 style={{ color: "#ff6600", marginLeft: 5 }}>
            Welcome Back Teacher !
          </h2>
        </div>
        <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", marginTop: "20px", width: "80%" }}>
            {/* Today's Session */}
            <div
              style={{
                marginRight: "20px",
                backgroundColor: "#dbe6ff",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#241F63",
                  height: 45,
                  width: 45,
                  borderRadius: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -2,
                  marginBottom: 3,
                }}
              >
                <img src={require("../../images/Vector (3).png")} />
              </div>
              <p
                style={{
                  color: "#241F63",
                  fontWeight: 800,
                  marginTop: -2,
                  paddingTop: 3,
                }}
              >
                Today's session
              </p>
              <table
                style={{
                  width: "100%",
                  marginTop: -10,
                  backgroundColor: "#ffffff",
                  height: "80%",
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                <thead>
                  <tr>
                    <th>Grade</th>
                    <th>Name of the topic</th>
                    <th>Description</th>
                    <th>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {todaysSession.map((session, index) => (
                    <tr key={index}>
                      <td>{session.standard}</td>
                      <td>{session.name_of_session}</td>
                      <td>{session.topic_description}</td>
                      <td>
                        <input
                          type="checkbox"
                          defaultChecked={session.completed}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 2.5,
                }}
              >
                <button
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#372b7e",
                    color: "white",
                    border: "none",
                    alignSelf: "flex-end",
                    borderRadius: 10,
                  }}
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Right Side Widgets */}
            <div style={{width:'35%'}}>
              <div
                style={{
                  backgroundColor: "#dbe6ff",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  height: 130,
                  width:'100%'
                }}
              >
                <div
                  style={{
                    backgroundColor: "#241F63",
                    height: 45,
                    width: 45,
                    borderRadius: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={require("../../images/Vector (3).png")} />
                </div>{" "}
                <div style={{ marginTop: -5 }}>
                  <p style={{ color: "#241F63", fontWeight: 800 }}>
                    Create Holiday
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 1,
                      backgroundColor: "white",
                    }}
                  >
                    <p style={{ fontSize: 10 }}>86</p>
                    <p style={{ fontSize: 10, marginTop: -10 }}>
                      Total Tests Created
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#dbe6ff",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  height: 130,
                  width:'100%'
                }}
              >
                <div
                  style={{
                    backgroundColor: "#241F63",
                    height: 45,
                    width: 45,
                    borderRadius: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={require("../../images/Vector (4).png")} />
                </div>
                <div style={{ marginTop: -5 }}>
                  <p style={{ color: "#241F63", fontWeight: 800 }}>
                    Create Test Result{" "}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 1,
                      backgroundColor: "white",
                    }}
                  >
                    <p style={{ fontSize: 10 }}>86</p>
                    <p style={{ fontSize: 10, marginTop: -10 }}>
                      Total Tests Created
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#dbe6ff",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  height: 130,
                  width: '100%',
                }}
              >
                <div
                  style={{
                    backgroundColor: "#241F63",
                    height: 45,
                    width: 45,
                    borderRadius: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={require("../../images/Vector (5).png")} />
                </div>{" "}
                <div style={{ marginTop: -5 }}>
                  <p style={{ color: "#241F63", fontWeight: 800 }}>
                    Create Question Bank
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: 1,
                      backgroundColor: "white",
                    }}
                  >
                    <p style={{ fontSize: 10 }}>86</p>
                    <p style={{ fontSize: 10, marginTop: -10 }}>
                      Total Question Bank Created
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 15,
              width:'30%',
              
              justifyContent:'center',
              alignItems:'center'
            }}
          >
            {/* Calendar */}
            
            <div
      style={{
        width: "98%",
        padding: "10px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "white",
        borderRadius: "10px",
        marginBottom:10,
        backgroundColor:'#F8F8F8'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "14px",
          marginBottom: "15px",
        }}
      >
        <div style={{ cursor: "pointer" }} onClick={goToPreviousWeek}>
          ❮
        </div>
        <div style={{ fontWeight: "bold" }}>{monthYear}</div>
        <div style={{ cursor: "pointer" }} onClick={goToNextWeek}>
          ❯
        </div>
      </div>

      {/* Week Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {weekDates.map((date, index) => {
          const selected = isSameDay(date, selectedDate);
          return (
            <div
              key={index}
              onClick={() => setSelectedDate(date)}
              style={{
                width: "32px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  backgroundColor: selected ? "#43369d" : "transparent",
                  color: selected ? "white" : "#333",
                  borderRadius: "25px",
                  padding: "6px 0",
                  height: "60px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  border: selected ? "2px solid #261d82" : "none",
                }}
              >
                <div style={{ fontSize: "12px" }}>{weekDays[index]}</div>
                <div
                  style={{
                    marginTop: "4px",
                    width: "24px",
                    height: "24px",
                    lineHeight: "24px",
                    fontSize: "13px",
                    borderRadius: "50%",
                    backgroundColor: selected ? "#b0a7f9" : "#eee",
                    color: selected ? "#000" : "#555",
                    border: selected ? "1px solid #43369d" : "none",
                  }}
                >
                  {date.getDate()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
            {/* Message Box */}
            <div
              style={{
                flex: 2,
                backgroundColor: "#f5f7fb",
                padding: "20px",
                borderRadius: "10px",
                width:'90%',marginBottom:2
                
              }}
            >
              <h4>Message box:</h4>
              <textarea rows="4" style={{ width: "100%" }}></textarea>
            </div>

            {/* Special Project */}
            <div
              style={{
                flex: 1,
                backgroundColor: "#f5f7fb",
                padding: "20px",
                borderRadius: "10px",
                width:'90%'
              }}
            >
              <h4>Special project by Student :</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
