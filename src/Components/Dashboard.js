import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Manager1 from "../images/Teacher.png";
import Login from "../Components/Login";
import Navbar from "./Navbar/Navbar";
import './Dashboard.css'
import apiRequest from "../utils/apiRequest";
import MessageBox from "./MessageComponent";

export default function Dashboard({setRole}) {
  const [present, setPresent] = useState(30);
  const [absent, setAbsent] = useState(2);
  const [getAllSchool, setGetAllSchool] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [studentReportCount, setStudentReportCount] = useState({totalSession:0,totalAttended:0});
  const [specialProjects, setSpecialProjects] = useState([]);

  const [teacherReportData, setTeacherReportData ]= useState({ 
    totalSessions:0,
    totalCompletedSessions:0})
  const [testData, setTestData]= useState(null);
  const total = present + absent;
  const attendancePercentage =
    total > 0 ? ((present / total) * 100).toFixed(1) : 0;
  const userData = JSON.parse(localStorage.getItem('userData'))
  const navigate = useNavigate();
  const handleContact = () => {
    navigate("/school");
  };
  const [holidays, setHolidays] = useState([]);
  const [totalTest, setTotalTest] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchHolidays = async (schoolId = null) => {
    try {
      setLoading(true);
      const payload =  {};
      
      const result = await apiRequest({
        endpoint: "holidays/getholidaybyschoolid.php", // Adjust to your actual endpoint
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
  const fetchTotalTest = async (schoolId = null) => {
    try {
      setLoading(true);
      const payload =selectedSchool?  {school_id:selectedSchool}:{};
      
      const result = await apiRequest({
        endpoint: "createTest/getAllTestPapers.php", // Adjust to your actual endpoint
        method: "POST",
        data: payload,
      });

      if (result.status === "success") {
        setTotalTest(result.data || []);
      } else {
        console.error("Failed to fetch holidays:", result.message);
        setTotalTest([]);
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
      setTotalTest([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchSpecialProjects = async () => {
    try {
      // setLoading(true);
      const payload = { };

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
      // setLoading(false);
    }
  };
  useEffect(()=>{
    fetchHolidays(userData.school_id)
    fetchTotalTest();
    fetchAllTestReport();
    getTeacherReport();

  },[selectedSchool])
  const fetchAllTestReport = async()=>{
    let api = selectedSchool ?`student_test_report/getTestReport.php?school_id=${Number(selectedSchool)}`:`student_test_report/getTestReport.php`;
    try {
      const result = await apiRequest({
        endpoint: api,
        method: "GET",
      });
      if (result.status === "success") {
        setTestData(result.data);
      } else {
        // alert(result.message || "Session creation failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  }
  const getTeacherReport = async () => {
    let payload = {
      teacher_id: Number(userData.id),
    };
  
    if (selectedSchool) {
      payload = { school_id: Number(selectedSchool) };
    }
  
    try {
      const result = await apiRequest({
        endpoint: "reports/teacherReport.php",
        method: "POST",
        data: (userData.role === "admin" && !selectedSchool) ? {} : payload,
      });  
      if (result.status !== true) {
        return;
      }
  
      // Initialize totals
      let totalAttendance = 0;
      let totalPresent = 0;
      let totalAbsent = 0;
      let totalSessions = 0;
      let totalCompletedSessions = 0;
      let totalPendingTests = 0;
      let totalCreatedTests = 0;
  
      const formattedData = result.data.map((item) => {
        const attendance = Number(item.attendance_count || 0);
        const present = Number(item.present_days || 0);
        const absent = Number(item.absent_days || 0);
        const sessions = Number(item.session_count || 0);
        const completed = Number(item.school_session_count || 0);
        const pending = Number(item.pending_test_count || 0);
        const created = Number(item.test_created_count || 0);
  
        // Accumulate totals
        totalAttendance += attendance;
        totalPresent += present;
        totalAbsent += absent;
        totalSessions += sessions;
        totalCompletedSessions += completed;
        totalPendingTests += pending;
        totalCreatedTests += created;
  
        return {
          id: item.teacher_info.id,
          name: item.teacher_info.full_name,
          school: item.teacher_info.school_name,
          password: item.teacher_info.password,
          mobile: item.teacher_info.mobile_number,
          whatsapp: item.teacher_info.whatsapp_number,
          email: item.teacher_info.email,
          dob: item.teacher_info.date_of_birth,
          joiningDate: item.teacher_info.date_of_joining,
          address: item.teacher_info.address,
          totalAttendance: attendance,
          presentDays: present,
          absentDays: absent,
          totalSession: sessions,
          completedSessions: completed,
          pendingTests: pending,
          createdTests: created,
          photo: item.teacher_info.photo || "https://via.placeholder.com/40",
        };
      });

      setTeacherReportData({totalSessions:totalSessions,totalCompletedSessions:totalCompletedSessions})

    } catch (err) {
      alert("Save failed: " + err.message);
      return;
    }
  };
  

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "320px",
    marginBottom: "2%",
  };
  const titleStyle1 = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: "10px",
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [questionCount , setQuestionCount] = useState(0);
  const [sessionCount , setSessionCount] = useState(0);
 
  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const result = await apiRequest({
          endpoint: "school/getallschool.php",
          method: "GET",
          data: {},
        });

        if (result.status === "success") {
          setGetAllSchool(result.data);
        } else {
          alert(result.message || "Session creation failed");
        }
      } catch (err) {
        alert(err.message || "Something went wrong");
      }
    };
    fetchSchoolData();
    getStduentReport();
    getTeacherReport();
fetchSpecialProjects();
  }, []);
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
  const fetchAllQuestions = async () => {
    try {
      const result = await apiRequest({
        endpoint: "questionbank/getallquestion.php",
        method: "POST",
        data:
        selectedSchool?  { school_id: Number(selectedSchool), role: 'teacher' }:userData.role === "admin"
            ? { role: userData.role }
            : { school_id: userData.school_id, role: userData.role },
      });

      if (result.status === "success") {
        setQuestionCount(result.data.length)
      } else {
        alert(result.message || "Session creation failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };
  const fetchAllSession = async () => {
    try {
      const result = await apiRequest({
        endpoint: "sessions/getsessionbyschoolid.php",
        method: "POST",
        data:selectedSchool?{school_id:Number(selectedSchool)}:{},
      });

      if (result.status === "success") {
        setSessionCount(result.data.length)
      } else {
        setSessionCount(0)
        // alert(result.message || "Session creation failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };
  useEffect(() => {
    fetchAllQuestions();
    fetchAllSession();
    getStduentReport();
  }, [selectedSchool]);
  const getStduentReport = async () => {
    const payload = {
      // name:enterTestName,
      school_id: Number(selectedSchool),
      teacher_id: Number(userData.id),
    };

    try {
      const result = await apiRequest({
        endpoint: "reports/studentReport.php",
        method: "POST",
        data: (userData.role === "admin" && !selectedSchool) ? {} : payload,
      });
      const data = result.data;
      let totalSessions = 0;
        let totalAttended = 0;
    
        data.forEach((student) => {
          totalSessions += Number(student.total_session_count || 0);
          totalAttended += Number(student.attendance_count || 0);
        });
        setStudentReportCount({totalSession:totalAttended,totalAttended:totalSessions})
      if (result.status !== true) {
        return;
      }
      // setStudentData(result.data);
    } catch (err) {
      alert("Save failed: " + err.message);
      return;
    }
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
      {/* <input
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
      /> */}
      <div>
 
            <select
              style={{   padding: "10px",
              borderRadius: "17px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "15px",
              // flex: 1,
              width: "200px", backgroundColor: "white" }}
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
            >
              <option value="">School</option>
              {getAllSchool.map((school) => (
                <option value={school.id}>{school.school_name}</option>
              ))}
            </select>
            {/* {errors.schoolName && (
              <div style={errorStyle}>{errors.schoolName}</div>
            )} */}
          </div>
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
          width: "120px",
        }}
      >
        <a style={{ color: "white", textDecoration: "none" }}>
          New School
        </a>
      </button>
      <button
        onClick={()=>navigate('/student')}
        style={{
          backgroundColor: "#1a1a56",
          color: "white",
          padding: "10px 15px",
          borderRadius: "17px",
          border: "none",
          cursor: "pointer",
          fontSize: "15px",
          width: "120px",
        }}
      >
        <a style={{ color: "white", textDecoration: "none" }}>
          Create Login
        </a>
      </button>
      <button
        onClick={()=> navigate('/CreateTeacher',{
          state:{
            data:null
          }
        })}
        style={{
          backgroundColor: "#1a1a56",
          color: "white",
          padding: "10px 15px",
          borderRadius: "17px",
          border: "none",
          cursor: "pointer",
          fontSize: "15px",
          width: "120px",
        }}
      >
        <a style={{ color: "white", textDecoration: "none" }}>
          Create Staff
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
            marginTop:20
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
            }}
            onClick={()=>setRole("studentReport")}
            >
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
                  <p style={{fontSize: 10}}>{studentReportCount.totalAttended}</p>
                  <p style={{fontSize: 10, marginTop: -10}}>Total Present</p>
                </div>
                <div style={{height: "80%", border: "1px solid grey", width: "0.1px"}}></div>
                <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center"}}>
                  <p style={{fontSize: 10}}>{  studentReportCount.totalSession - studentReportCount.totalAttended}</p>
                  <p style={{fontSize: 10, marginTop: -10}}>absent</p>
                </div>
                <div style={{height: "80%", border: "1px solid grey", width: "0.1px"}}></div>
                <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center"}}>
                  <p style={{fontSize: 10}}>{studentReportCount.totalSession}</p>
                  <p style={{fontSize: 10, marginTop: -10}}>Total</p>
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
              
            }}
            onClick={()=>setRole("teacherReport")}
            >
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
                  <p style={{fontSize: 10}}>{teacherReportData.totalSessions}</p>
                  <p style={{fontSize: 10, marginTop: -10}}>Total Sessions</p>
                </div>
                <div style={{height: "80%", border: "1px solid grey", width: "0.1px"}}></div>
                <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center"}}>
                  <p style={{fontSize: 10}}>{teacherReportData.totalCompletedSessions}</p>
                  <p style={{fontSize: 10, marginTop: -10}}>Completed</p>
                </div>
                <div style={{height: "80%", border: "1px solid grey", width: "0.1px"}}></div>
                <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center"}}>
                  <p style={{fontSize: 10}}>{teacherReportData.totalSessions-teacherReportData.totalCompletedSessions}</p>
                  <p style={{fontSize: 10, marginTop: -10}}>Not Completed</p>
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
            }}
            onClick={()=>setRole("createSession")}
            >
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
                  <p style={{fontSize: 10}}>{sessionCount}</p>
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
            }}
            onClick={()=>setRole("test")}
            >
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
                  <p style={{fontSize: 10}}>{totalTest.length}</p>
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
            }}
            onClick={()=>setRole("questionBank")}
            >
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
                  <p style={{fontSize: 10}}>{questionCount}</p>
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
            }}
            onClick={()=>setRole("testReport")}
            
            >
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
                  <p style={{fontSize: 10}}>{testData?.length}</p>
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
      <p style={titleStyle1}>Holidays</p>

            <div
      style={{
        width: "98%",
        padding: "10px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "white",
        borderRadius: "10px",
        marginBottom:10,
        backgroundColor:'#F8F8F8',
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
                        {/* {holiday && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-5px",
                              right: "-5px",
                              width: "12px",
                              height: "12px",
                              backgroundColor: "#ff4757",
                              borderRadius: "50%",
                              fontSize: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            🎉
                          </div>
                        )} */}
                      </div>
                    </div>
                  );
                })}
  
      </div>
    </div>
            </div>
             {/* <p style={titleStyle1}>Holidays</p> */}
       
            {/* Message Box */}
            <MessageBox/>

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
                  maxHeight: "100px",
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