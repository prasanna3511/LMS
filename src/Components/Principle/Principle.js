import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Manager1 from "../../images/Teacher.png";
import Navbar from "../Navbar/Navbar";
import apiRequest from "../../utils/apiRequest";

export default function PrincipleDashboard() {
  const [holidays, setHolidays] = useState([]);
  const [reportData , setReportData] = useState({})
  const [nextholiday, setnextholiday] = useState();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const fetchHolidays = async (schoolId = null) => {
    try {
      // setLoading(true);
      const payload = { school_id: schoolId };

      const result = await apiRequest({
        endpoint: "holidays/getholidaybyschoolid.php", // Adjust to your actual endpoint
        method: "POST",
        data: payload,
      });

      if (result.status === "success") {
        setHolidays(result.data || []);
        const allHolidays = result.data || [];
        const today = new Date().toISOString().split("T")[0];
        const futureHolidays = allHolidays.filter(
          (holiday) => holiday.date > today
        );
        futureHolidays.sort((a, b) => a.date.localeCompare(b.date));
        console.log("futureHolidays[0] : ",futureHolidays[0])
        setnextholiday(futureHolidays[0]);
      } else {
        console.error("Failed to fetch holidays:", result.message);
        setHolidays([]);
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
      setHolidays([]);
    } finally {
      // setLoading(false);
    }
  };
  const fetchReportsPrinicple = async (schoolId = null) => {
    try {
      // setLoading(true);
      const payload = { school_id: schoolId };

      const result = await apiRequest({
        endpoint: "reports/principleDashboardReport.php", // Adjust to your actual endpoint
        method: "POST",
        data: payload,
      });

      if (result.status === true) {
        console.log("all data : ",result.data)
        setReportData(result.data)
        // setHolidays(result.data || []);
        // const allHolidays = result.data || [];
        // const today = new Date().toISOString().split("T")[0];
        // const futureHolidays = allHolidays.filter(
        //   (holiday) => holiday.date > today
        // );
        // futureHolidays.sort((a, b) => a.date.localeCompare(b.date));
        // console.log("futureHolidays[0] : ",futureHolidays[0])
        // setnextholiday(futureHolidays[0]);
      } else {
        console.error("Failed to reports holidays:", result);
        setHolidays([]);
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
      setHolidays([]);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    fetchHolidays(userData.school_id);
    fetchReportsPrinicple(userData.school_id)
  }, []);


  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const navigate = useNavigate();
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
            marginBottom: "50px",
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
                Welcome back, Principle
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
                  Student Report
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
                  <p style={{ fontSize: 10 }}>86</p>
                  <p style={{ fontSize: 10, marginTop: -10 }}>Total Present </p>
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
                  <p style={{ fontSize: 10 }}>86</p>
                  <p style={{ fontSize: 10, marginTop: -10 }}>Total Present </p>
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
                  <p style={{ fontSize: 10 }}>86</p>
                  <p style={{ fontSize: 10, marginTop: -10 }}>Total Present </p>
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
                  Teacher Report
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
                  <p style={{ fontSize: 10 }}>86</p>
                  <p style={{ fontSize: 10, marginTop: -10 }}>Test Report </p>
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
                  <p style={{ fontSize: 10 }}>86</p>
                  <p style={{ fontSize: 10, marginTop: -10 }}>Absent</p>
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
                  <p style={{ fontSize: 10 }}>86</p>
                  <p style={{ fontSize: 10, marginTop: -10 }}>Total</p>
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
                  Session Report
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
                  <p style={{ fontSize: 10 }}>{reportData.total_sessions}</p>
                  <p style={{ fontSize: 10, marginTop: -10 }}>Total Sessions</p>
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
                  <p style={{ fontSize: 10 }}>{reportData.total_sessions - reportData.remaining_sessions}</p>
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
                  <p style={{ fontSize: 10 }}>{reportData.remaining_sessions}</p>
                  <p style={{ fontSize: 10, marginTop: -10 }}>Completed Session</p>
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
                  Holiday Report
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
                  <p style={{ fontSize: 10 }}>Upcoming Holiday {nextholiday?.date}</p>
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
                  Expense Report
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
                  <p style={{ fontSize: 10 }}>Total Expense : {reportData.total_bill_amount}</p>
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
                  <p style={{ fontSize: 10 }}>{reportData.test_count}</p>
                  <p style={{ fontSize: 10, marginTop: -10 }}>
                    Total Tests Created
                  </p>
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
            {/* Attendance Report */}
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
