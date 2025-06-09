import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import apiRequest from "../../utils/apiRequest";
import { useNavigate } from "react-router-dom";

const Dashboard = ({setRole}) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todaysSession, setTodaysSession] = useState([]);
  const [sessionCompletion, setSessionCompletion] = useState({});
  const [lastSession, setLastSession] = useState(null);
  const [holidaysLength, setHolidaysLength] = useState(0)
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchholidaycount();
  }, []);
  // const [currentDate, setCurrentDate] = useState(new Date());

  // const [selectedDate, setSelectedDate] = useState(new Date());

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
  const isHoliday = (date) => {
    return holidays.some(holiday => {
      const holidayDate = new Date(holiday.date || holiday.holiday_date);
      return isSameDay(date, holidayDate);
    });
  };

  // Get holiday info for a specific date
  const getHolidayInfo = (date) => {
    return holidays.find(holiday => {
      const holidayDate = new Date(holiday.date || holiday.holiday_date);
      return isSameDay(date, holidayDate);
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

  const userData = JSON.parse(localStorage.getItem("userData"));

  const fetchHolidays = async () => {
    const res = await apiRequest({
      endpoint: "teacherSession/getTodaysSession.php", // your actual PHP file
      method: "POST",
      data: {
        school_id: userData.school_id,
      },
    });
    if (res.status === "success") {
      console.log("res getTodaysSession: ", res);
      setTodaysSession(res.data);
    } else {
      console.error(res.message);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const now = new Date();
  const formattedTime = now.toTimeString().split(" ")[0];
  const handleStartDay = async () => {
    let apiBody = {
      session_id: 3,
      start_day: formattedTime,
      end_day: "00:00:00",
      status: "present",
      date: now.toISOString().split("T")[0],
      teacher_id: Number(userData.id),
    };

    try {
      const result = await apiRequest({
        endpoint: "teacherAttendance/startDay.php",
        method: "POST",
        data: apiBody,
      });

      if (result.status === "success") {
        // navigate("/dashboard");
        alert("Your Day is started");
        console.log("successss ");
      } else {
        alert(result.message || "Session Deletion failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  const handleEndDay = async () => {
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0];

    let apiBody = {
      session_id: 3,
      end_day: formattedTime,
      date: now.toISOString().split("T")[0],
      teacher_id: Number(userData.id),
      end_date: now.toISOString().split("T")[0]
    };

    try {
      const result = await apiRequest({
        endpoint: "teacherAttendance/endDay.php",
        method: "POST",
        data: apiBody,
      });

      if (result.status === "success") {
        alert("Your day has been ended");
        // console.log("End day success");
        getLastSessionCompletetion()
      } else {
        alert(result.message || "Failed to end day");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };
  const getLastSessionCompletetion = async () => {
    try {
      const result = await apiRequest({
        endpoint: "teacherAttendance/getLastSession.php",
        method: "POST",
        data: { teacher_id: userData.id },
      });

      if (result.status === "success") {
        // alert("Your day has been ended");
        setLastSession(result);
        console.log("End day success", result);
      } else {
        alert(result.message || "Failed to end day");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };
  useEffect(() => {
    getLastSessionCompletetion();
  }, []);
  const handleSubmit = async () => {
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0];

    let apiBody = {
      session_id: sessionCompletion.id,
      school_id: userData.school_id,
      start_day: formattedTime,
      end_day: formattedTime,
      is_last_session: true,
      date: now.toISOString().split("T")[0],
      teacher_id: Number(userData.id),
    };

    try {
      const result = await apiRequest({
        endpoint: "teacherSession/createTeacherSession.php",
        method: "POST",
        data: apiBody,
      });

      if (result.status === "success") {
        alert("Your Session Has been submitted succefully");
        localStorage.setItem('sessionIdForAttendance',sessionCompletion.id)
        setRole("studentAttendance")
      } else {
        alert(result.message || "Failed to end day");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };
  const fetchholidaycount = async () => {
    const res = await apiRequest({
      endpoint: 'holidays/getholidaybyschoolid.php', // your actual PHP file
      method: 'POST',
      data:userData.role === 'admin'?{}: {
        school_id: userData.school_id,
      },
    });
    if (res.status === 'success') {
      console.log("res : ",res.data)
      setHolidaysLength(res.data.length);
      console.log("response : ",res)
      setHolidays(res.data)
    } else {
      console.error(res.message);
    }
  };
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const result = await apiRequest({
          endpoint: 'questionbank/getallquestion.php', // change to your actual endpoint name
          method: 'POST',
          data: { school_id: userData.school_id },
        });

        if (result.status === 'success') {
          setQuestions(result.data);
        } else {
          alert(result.message || 'Failed to fetch questions');
        }
      } catch (err) {
        alert(err.message || 'Something went wrong while fetching questions');
      }
    };

    fetchQuestions();
  }, []);


  // Responsive styles
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  };

  const mainContentStyle = {
    flex: 1,
    padding: "20px",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  };

  const searchStyle = {
    padding: "8px",
    width: "100%",
    maxWidth: "300px",
    borderRadius: "17px",
    border: "1px solid #ccc",
  };

  const buttonContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
  };

  const buttonStyle = {
    padding: "8px 16px",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
  };

  const welcomeStyle = {
    width: "100%",
    maxWidth: "70%",
    height: "100px",
    backgroundColor: "#ABBFFC80",
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    borderRadius: "10px",
    padding: "0 20px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
  };

  const mainSectionStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    marginTop: "20px",
  };

  const leftSectionStyle = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: "20px",
  };

  const todaysSessionStyle = {
    backgroundColor: "#dbe6ff",
    padding: "20px",
    borderRadius: "10px",
    flex: "2",
    boxSizing: "border-box",
  };

  const widgetsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: "1",
  };

  const widgetStyle = {
    backgroundColor: "#dbe6ff",
    padding: "10px",
    borderRadius: "10px",
    height: "130px",
    width: "100%",
  };

  const rightSectionStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    maxWidth: "350px",
  };

  const calendarStyle = {
    width: "100%",
    padding: "10px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#F8F8F8",
    borderRadius: "10px",
    marginLeft: 10,
  };

  const messageBoxStyle = {
    backgroundColor: "#f5f7fb",
    padding: "20px",
    borderRadius: "10px",
    width: "100%",
    boxSizing: "border-box",
    marginLeft: 10,
  };

  const specialProjectStyle = {
    backgroundColor: "#f5f7fb",
    padding: "20px",
    borderRadius: "10px",
    width: "100%",
    boxSizing: "border-box",
    marginLeft: 10,
  };

  // Media query styles for mobile
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    mainSectionStyle.flexDirection = "column";
    rightSectionStyle.maxWidth = "100%";
    leftSectionStyle.flexDirection = "column";
    headerStyle.flexDirection = "column";
    headerStyle.alignItems = "stretch";
    searchStyle.width = "100%";
    welcomeStyle.maxWidth = "100%";
    todaysSessionStyle.flex = "none";
    widgetsContainerStyle.flex = "none";
  }

  return (
    <div style={containerStyle}>
      <style>
        {`
          @media (max-width: 768px) {
            .main-section {
              flex-direction: column !important;
            }
            .right-section {
              max-width: 100% !important;
              margin-top: 20px;
            }
            .left-section {
              flex-direction: column !important;
            }
            .todays-session {
              flex: none !important;
            }
            .widgets-container {
              flex-direction: column !important;
              flex: none !important;
            }
            .header-container {
              flex-direction: column !important;
              align-items: stretch !important;
            }
            .search-input {
              width: 100% !important;
              margin-bottom: 10px;
            }
            .welcome-banner {
              max-width: 100% !important;
            }
            .button-container {
              justify-content: center;
            }
            .todays-session-table {
              overflow-x: auto;
            }
            .widget {
              min-width: 100% !important;
            }
          }
        `}
      </style>

      {/* Main Content */}
      <div style={mainContentStyle}>
        <div className="header-container" style={headerStyle}>
          <input
            className="search-input"
            type="text"
            placeholder="Search"
            style={searchStyle}
          />
          <div className="button-container" style={buttonContainerStyle}>
            <button
              style={{ ...buttonStyle, backgroundColor: "green" }}
              onClick={() => handleStartDay()}
            >
              Start Day
            </button>
            <button
              style={{ ...buttonStyle, backgroundColor: "#A9290E" }}
              onClick={() => handleEndDay()}
            >
              End Day
            </button>
            <button
              style={{ ...buttonStyle, backgroundColor: "#241F63" }}
              onClick={() => navigate("/student")}
            >
              Create Student Login
            </button>
          </div>
          <Navbar />
        </div>

        <div className="welcome-banner" style={welcomeStyle}>
          <h2 style={{ color: "#ff6600", margin: "0" }}>
            Welcome Back Teacher !
          </h2>
          {lastSession?.data !== null && (
            <button
              style={{
                // height: 50,
                backgroundColor: "#241F63",
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 20,
              }}
              onClick={()=>handleEndDay()}
            >
              <p style={{ color: "white" }}>Complete your last session</p>
            </button>
          )}
        </div>

        <div className="main-section" style={mainSectionStyle}>
          <div className="left-section" style={leftSectionStyle}>
            {/* Today's Session */}
            <div className="todays-session" style={todaysSessionStyle}>
              <div
                style={{
                  backgroundColor: "#241F63",
                  height: "45px",
                  width: "45px",
                  borderRadius: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={require("../../images/Vector (3).png")}
                  alt="session icon"
                />
              </div>
              <p
                style={{
                  color: "#241F63",
                  fontWeight: "800",
                  margin: "0 0 10px 0",
                }}
              >
                Today's session
              </p>
              <div
                className="todays-session-table"
                style={{ overflowX: "auto" }}
              >
                <table
                  style={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    padding: "5px",
                    borderRadius: "10px",
                    minWidth: "500px",
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
                            disabled={
                              index === todaysSession.length - 1 ? false : true
                            }
                            defaultChecked={session.completed}
                            onChange={(e) => {
                              setSessionCompletion(session);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                <button
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#372b7e",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Widgets Container */}
            <div className="widgets-container" style={widgetsContainerStyle}>
              <div className="widget" style={widgetStyle} onClick={()=>setRole('holidayInput')}>
                <div
                  style={{
                    backgroundColor: "#241F63",
                    height: "45px",
                    width: "45px",
                    borderRadius: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                  
                >
                  <img
                    src={require("../../images/Vector (3).png")}
                    alt="holiday icon"
                  />
                </div>
                <p
                  style={{
                    color: "#241F63",
                    fontWeight: "800",
                    margin: "0 0 10px 0",
                  }}
                  
                >
                  Create Holiday
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <p style={{ fontSize: "10px", margin: "0" }}>{holidaysLength}</p>
                  <p style={{ fontSize: "10px", margin: "0" }}>
                    Total Holidays
                  </p>
                </div>
              </div>

              <div className="widget" style={widgetStyle}>
                <div
                  style={{
                    backgroundColor: "#241F63",
                    height: "45px",
                    width: "45px",
                    borderRadius: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={require("../../images/Vector (4).png")}
                    alt="test result icon"
                  />
                </div>
                <p
                  style={{
                    color: "#241F63",
                    fontWeight: "800",
                    margin: "0 0 10px 0",
                  }}
                >
                  Create Test Result
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <p style={{ fontSize: "10px", margin: "0" }}>86</p>
                  <p style={{ fontSize: "10px", margin: "0" }}>
                    Total Tests Created
                  </p>
                </div>
              </div>

              <div className="widget" style={widgetStyle} onClick={()=>setRole('questionBank')}>
                <div
                  style={{
                    backgroundColor: "#241F63",
                    height: "45px",
                    width: "45px",
                    borderRadius: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={require("../../images/Vector (5).png")}
                    alt="question bank icon"
                  />
                </div>
                <p
                  style={{
                    color: "#241F63",
                    fontWeight: "800",
                    margin: "0 0 10px 0",
                  }}
                >
                  Create Question Bank
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <p style={{ fontSize: "10px", margin: "0" }}>{questions.length}</p>
                  <p style={{ fontSize: "10px", margin: "0" }}>
                    Total Question Bank Created
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Calendar, Message Box, Special Project */}
          <div className="right-section" style={rightSectionStyle}>
            {/* Calendar */}
            <div style={calendarStyle}>
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
                {/* {weekDates.map((date, index) => {
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
                        <div style={{ fontSize: "12px" }}>
                          {weekDays[index]}
                        </div>
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
                })} */}
                  {weekDates.map((date, index) => {
                  const selected = isSameDay(date, selectedDate);
                  const holiday = isHoliday(date);
                  const holidayInfo = getHolidayInfo(date);
                  
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      style={{
                        width: "32px",
                        textAlign: "center",
                        cursor: "pointer",
                        position: "relative",
                      }}
                      title={holiday ? `Holiday: ${holidayInfo?.name || holidayInfo?.holiday_name || 'Holiday'}` : ''}
                    >
                      <div
                        style={{
                          backgroundColor: selected 
                            ? "#43369d" 
                            : holiday 
                            ? "#ff6b6b" 
                            : "transparent",
                          color: selected || holiday ? "white" : "#333",
                          borderRadius: "25px",
                          padding: "6px 0",
                          height: "60px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          border: selected 
                            ? "2px solid #261d82" 
                            : holiday 
                            ? "2px solid #ff4757" 
                            : "none",
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
                            backgroundColor: selected 
                              ? "#b0a7f9" 
                              : holiday 
                              ? "#ffa8a8" 
                              : "#eee",
                            color: selected || holiday ? "#000" : "#555",
                            border: selected 
                              ? "1px solid #43369d" 
                              : holiday 
                              ? "1px solid #ff4757" 
                              : "none",
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
            <div style={messageBoxStyle}>
              <h4 style={{ margin: "0 0 10px 0" }}>Message box:</h4>
              <textarea
                rows="4"
                style={{
                  width: "100%",
                  resize: "vertical",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              ></textarea>
            </div>

            {/* Special Project */}
            <div style={specialProjectStyle}>
              <h4 style={{ margin: "0" }}>Special project by Student :</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
