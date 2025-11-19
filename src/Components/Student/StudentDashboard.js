import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Manager1 from "../../images/Teacher.png";
import apiRequest from "../../utils/apiRequest";
import Navbar from "../Navbar/Navbar";
import MessageBox from "../MessageComponent";

export default function StudentDashboard() {
  const [present, setPresent] = useState(30);
  const [absent, setAbsent] = useState(2);
  const [specialProjectCount, setSpecialProjectCount] = useState(0);
  const [specialProjects, setSpecialProjects] = useState([]);

  const total = present + absent;
  const user = JSON.parse(localStorage.getItem("userData"));
  const attendancePercentage =
    total > 0 ? ((present / total) * 100).toFixed(1) : 0;
  const fetchSpecialProjectCount = async () => {
    try {
      const studentId = user?.id;

      if (!studentId) {
        console.error("Student ID not found in local storage");
        return;
      }

      const result = await apiRequest({
        endpoint: "specialproject/getspecialprojectbystudentid.php", // 👈 your PHP API endpoint
        method: "POST", // or "GET" if you prefer
        data: { student_id: studentId },
      });

      if (result.status === "success") {
        setSpecialProjectCount(result.data.project_count || 0);
      } else {
        console.error("Failed to fetch project count:", result.message);
      }
    } catch (error) {
      console.error("Error fetching project count:", error);
    }
  };

  useEffect(() => {
    fetchHolidays("1");
    fetchSpecialProjectCount();
  }, []);
  const navigate = useNavigate();
  const handleContact = () => {
    navigate("/Login");
  };
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchHolidays = async (schoolId = null) => {
    try {
      setLoading(true);
      const payload = schoolId ? { school_id: schoolId } : {};

      const result = await apiRequest({
        endpoint: "holidays/getholidaybyschoolid.php",
        method: "POST",
        data: payload,
      });

      if (result.status === "success") {
        setHolidays(result.data || []);
      } else {
        console.error("Failed to fetch holidays:", result.message);
        setHolidays([]);
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
      setHolidays([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchSpecialProjects = async () => {
    try {
      setLoading(true);
      const payload = { student_id: Number(user?.id) };

      const result = await apiRequest({
        endpoint: "specialproject/getSpecialProjectDetailsByStudentId.php",
        method: "POST",
        data: payload,
      });

      if (result.status === "success") {
        setSpecialProjects(result.data || []);
      } else {
        console.error("Failed to fetch holidays:", result.message);
        setSpecialProjects([]);
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
      setHolidays([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHolidays(user.school_id);
    fetchSpecialProjects();
  }, []);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const startOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
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
    return holidays.some((holiday) => {
      const holidayDate = new Date(holiday.date || holiday.holiday_date);
      return isSameDay(date, holidayDate);
    });
  };

  // Get holiday info for a specific date
  const getHolidayInfo = (date) => {
    return holidays.find((holiday) => {
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
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "320px",
    marginBottom: "2%",
  };
  const titleStyle1 = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: "10px",
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
            // marginBottom: "20px",
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
          <Navbar />
        </div>
      </div>
      {/* panel code */}
      <div style={{ display: "flex", flexDirection: "row", flexWrap:'wrap' }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            justifyContent: "center",
            minWidth:400
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
            <div style={{marginTop:10}}>
              <h3
                style={{
                  margin: "5px 0",
                  color: "#F75F00",
                }}
              >
                Welcome back, Student
              </h3>
              <p style={{marginTop:-5, fontSize:10,color:'#676767'}}>

          {JSON.parse(localStorage.getItem('userData')).user_school_name}
          </p>
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
              flexWrap:'wrap'
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
                minWidth:300
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
                  <p style={{ fontSize: 10 }}>{user?.full_name}</p>
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
                minWidth:300,
                alignSelf:'center'
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
              flexWrap:'wrap'
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
                minWidth:300,

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
                  <p style={{ fontSize: 10 }}>{specialProjectCount} </p>
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
                minWidth:300,
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
              flexWrap:'wrap'
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
                minWidth:300,

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
                minWidth:300,

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
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginLeft: "20px",
          }}
        >
          <div style={containerStyle}>
        
            <div>
              <p style={titleStyle1}>Holidays</p>

              <div
                style={{
                  width: "98%",
                  padding: "10px",
                  fontFamily: "Arial, sans-serif",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  marginBottom: 10,
                  backgroundColor: "#F8F8F8",
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
                        title={
                          holiday
                            ? `Holiday: ${
                                holidayInfo?.name ||
                                holidayInfo?.holiday_name ||
                                "Holiday"
                              }`
                            : ""
                        }
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
                  {/* Holiday Legend */}
                         </div>
              </div>
            </div>
            {/* Message Box */}
            <MessageBox />

            {/* Special Projects */}
            <div
              style={{
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              <p style={titleStyle1}>Special Projects</p>
              <div
                style={{
                  backgroundColor: "#F8F8F8",
                  padding: "10px",
                  borderRadius: "10px",
                  textAlign: "left",
                  minHeight: "100px",
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {specialProjects.length > 0 ? (
                  specialProjects.map((proj) => (
                    <div
                      key={proj.id}
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <strong>{proj.project_name}</strong> <br />
                      <span style={{ fontSize: "12px", color: "#555" }}>
                        Guide: {proj.guide_name}
                      </span>
                      <br />
                      <span style={{ fontSize: "12px", color: "#777" }}>
                        {new Date(proj.created_date).toLocaleDateString()}
                      </span>
                      <br />
                      <span style={{ fontSize: "12px" }}>
                        {proj.description}
                      </span>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: "14px", color: "#999" }}>
                    No projects found
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
