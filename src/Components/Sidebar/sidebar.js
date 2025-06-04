import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logout from "../../images/logout1.png";
import Dashboard from "../Dashboard";
import TeacherDashboard from "../Teacher/TeacherDashboard";
import MaterialAndFurnituresForm from "../material/MaterialInput";
import MaterialsTable from "../material/MaterialTable";
import HolidayManager from "../HolidayManager/HolidayInput";
import HolidayTablePage from "../HolidayManager/HolidayTable";
import SpecialProjectForm from "../SpecialProject/SpecialProject";
import SpecialProjectReport from "../SpecialProject/ProjectReport";
import SpecialProjectTable from "../SpecialProject/ProjectTable";
import { CreateTest } from "../Test/CreateTest";
import StudentDashboard from "../Student/StudentDashboard";
import PrincipleDashboard from "../Principle/Principle";
import QuestionBank from "../QuestionBank/QuestionBank";
import QuestionBankTable from "../QuestionBank/QuestionBankTable";
import UserProfilesTable from "../Admin/UserProfiles";
import StudentAttendance from "../Student/StudentAttendance";
import ViewTestPage from "../Test/ViewTest";
import StudentReportPage from "../Reports/StudentReport";
import TeacherReportPage from "../Reports/TeacherReport";
import TestReportPage from "../Reports/TestReportAdmin";
import SchoolReportPage from "../Reports/SchoolReport";
import CreateSession from "../CreateSession";
import AddSubject from "../Subject/AddSubject";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // const [role, setRole] = useState("home");
  const [role, setRole] = useState("home");
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Auto-close sidebar on mobile, auto-open on desktop
      setSidebarOpen(!mobile);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarStyle = {
    width: isMobile ? "250px" : "200px",
    backgroundColor: "#1a1a56",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    borderRadius: isMobile ? "0 20px 20px 0" : "20px",
    margin: isMobile ? 0 : "1% 1% 0 2%",
    height: isMobile ? "100vh" : "90vh",
    transition: "transform 0.3s ease",
    transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
    position: isMobile ? "fixed" : "relative",
    zIndex: 1000,
    boxShadow: isMobile ? "5px 0 15px rgba(0,0,0,0.2)" : "none",
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
    marginTop: "auto",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#2a2a76",
    },
  };

  const mobileToggleStyle = {
    display: isMobile ? "block" : "none",
    position: "fixed",
    top: "20px",
    left: "20px",
    zIndex: 1100,
    background: sidebarOpen ? "none" : "#1a1a56",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  };

  const overlayStyle = {
    display: isMobile && sidebarOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 900,
  };

  const contentStyle = {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    width: "100%",
    transition: "margin-left 0.3s ease",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
    display: isMobile ? "block" : "none",
  };

  const handleLinkClick = (newRole) => {
    setRole(newRole);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  const getUserRole = JSON.parse(localStorage.getItem("userData"));
  console.log("getUserRole : ",getUserRole)

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          style={mobileToggleStyle}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? null : <FaBars size={20} />}
        </button>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div style={overlayStyle} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div style={sidebarStyle}>
        {isMobile && (
          <button
            style={closeButtonStyle}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        )}

        <div style={titleStyle}>Eduonix™ Dashboard</div>

        <div style={sectionTitleStyle}>Create</div>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <a
              onClick={() => handleLinkClick("home")}
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2a2a76")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Home
            </a>
          </li>
          {(getUserRole.role === "admin" ) && (
            <li>
              <a
                onClick={() => handleLinkClick("createSession")}
                style={linkStyle}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2a2a76")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Create Session
              </a>
            </li>
          )}
          {(getUserRole.role === "admin" || getUserRole.role === "teacher") && (
            <li>
              <a
                onClick={() => handleLinkClick("questionBank")}
                style={linkStyle}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2a2a76")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Create Question Bank
              </a>
            </li>
          )}
          {(getUserRole.role === "admin" || getUserRole.role === "teacher") && (
            <li>
              <a
                onClick={() => handleLinkClick("test")}
                style={linkStyle}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2a2a76")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Create Test
              </a>
            </li>
          )}
          {(getUserRole.role === "admin" || getUserRole.role === "teacher"|| getUserRole.role === "principle") && (
            <li>
              <a
                onClick={() => handleLinkClick("holidayInput")}
                style={linkStyle}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2a2a76")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Create Holiday
              </a>
            </li>
          )}
          {(getUserRole.role === "admin" || getUserRole.role === "principle") && (
            <li>
              <a
                onClick={() => handleLinkClick("material")}
                style={linkStyle}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2a2a76")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Create Expense
              </a>
            </li>
          )}
           {( getUserRole.role === "principle") && (
            <li>
              <a
                // onClick={() => handleLinkClick("Student")}
                onClick={()=>navigate('/Student')}
                style={linkStyle}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2a2a76")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Student Login
              </a>
            </li>
          )}
          {getUserRole.role === "admin" && (
            <li>
              <a
                onClick={() => handleLinkClick("addSubject")}
                style={linkStyle}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2a2a76")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Add Subject
              </a>
            </li>
          )}
          {getUserRole.role === "student" && (
            <li>
              <a
                onClick={() => handleLinkClick("specialProject")}
                style={linkStyle}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2a2a76")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Special Project
              </a>
            </li>
          )}
          {/* {getUserRole.role === "student" && (
            <li>
              <a
                onClick={() => handleLinkClick("specialProject")}
                style={linkStyle}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2a2a76")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Create Profile
              </a>
            </li>
          )} */}
        </ul>

        <div style={sectionTitleStyle}>Reports</div>
        <ul style={{ paddingLeft: "20px" }}>
        {(
            getUserRole.role === "admin" ||
            getUserRole.role === "teacher" ||  getUserRole.role === "principle") && (
          <li>
            <a
              onClick={() => handleLinkClick("teacherReport")}
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2a2a76")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Teacher Report
            </a>
          </li>)}
          {/* {(
            getUserRole.role === "admin" ||
            getUserRole.role === "teacher" ||  getUserRole.role === "principle") && (
          <li>
            <a
              onClick={() => handleLinkClick("studentReport")}
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2a2a76")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Student Report
            </a>
          </li>)} */}
          {(getUserRole.role === "student" ||
            getUserRole.role === "admin" ||
            getUserRole.role === "teacher" ||  getUserRole.role === "principle") && (
            <li>
              <a
                onClick={() => handleLinkClick("testReport")}
                style={linkStyle}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2a2a76")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Test Report
              </a>
            </li>
          )}
          {/* {getUserRole.role === "student" && (
            <li>
              <a
                onClick={() => handleLinkClick("testReport")}
                style={linkStyle}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2a2a76")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Attendance Report
              </a>
            </li>
          )} */}
          {(
            getUserRole.role === "admin" ||  getUserRole.role === "principle") && (
          <li>
            <a
              onClick={() => handleLinkClick("schoolReport")}
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2a2a76")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              School Report
            </a>
          </li>)}
          {/* {(
            getUserRole.role === "admin" ||  getUserRole.role === "principle") && (
          <li>
            <a
              onClick={() => handleLinkClick("schoolReport")}
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2a2a76")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Session Report
            </a>
          </li>)} */}
        </ul>

        <div style={sectionTitleStyle}>View</div>
        <ul style={{ paddingLeft: "20px" }}>
        {(getUserRole.role === "student" ||
            getUserRole.role === "admin" ||
            getUserRole.role === "teacher") && (
          <li>
            <a
              onClick={() => handleLinkClick("questionBankTable")}
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2a2a76")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Question Bank
            </a>
          </li>
            )
        }
        {(getUserRole.role === "student" ||
            getUserRole.role === "admin" ||
            getUserRole.role === "teacher" ||  getUserRole.role === "principle") && (
          <li>
            <a
              onClick={() => handleLinkClick("viewTest")}
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2a2a76")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Tests
            </a>
          </li>
            )}
            {/* {(
            getUserRole.role === "admin" ) && (
          <li>
            <a
              onClick={() => handleLinkClick("userProfiles")}
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2a2a76")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Accounts
            </a>
          </li>
            )} */}
             {(
            getUserRole.role === "teacher" ) && (
          <li>
            <a
              onClick={() => handleLinkClick("userProfiles")}
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2a2a76")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              View Session
            </a>
          </li>
            )}
            {(getUserRole.role === "student" ||
            getUserRole.role === "admin" ||
            getUserRole.role === "teacher"||  getUserRole.role === "principle") && (
          <li>
            <a
              onClick={() => handleLinkClick("holidayTable")}
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2a2a76")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              School Holidays
            </a>
          </li>)}
        </ul>

        <div
          style={logoutButtonStyle}
          onClick={() => {localStorage.clear();navigate('/')}}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#2a2a76")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <img src={logout} alt="Logout" style={{ height: "20px" }} />
          <span>Logout</span>
        </div>
      </div>

      {/* Main content */}
      <div style={contentStyle}>
        {role === "home" && getUserRole.role === "admin" && <Dashboard />}
        {role === "home" && getUserRole.role === "teacher" && (
          <TeacherDashboard />
        )}
        {role === "home" && getUserRole.role === "student" && (
          <StudentDashboard />
        )}
        {/* {role === "test" && <TeacherDashboard />} */}
        {role === "home"&& getUserRole.role === "principle"  && <PrincipleDashboard />}
        {role === "material" && <MaterialAndFurnituresForm setRole={setRole} />}
        {role === "materialtable" && <MaterialsTable />}
        {role === "holidayInput" && <HolidayManager />}
        {role === "holidayTable" && <HolidayTablePage />}
        {role === "specialProject" && <SpecialProjectForm />}
        {role === "projectReport" && <SpecialProjectReport />}
        {role === "projectReportTable" && <SpecialProjectTable />}
        {role === "test" && <CreateTest />}
        {role === "studentTable" && <StudentDashboard />}
        
        {role === "questionBank" && <QuestionBank setRole={setRole} />}
        {role === "questionBankTable" && <QuestionBankTable />}
        {role === "studentAttendance" && <StudentAttendance />}
        {role === "viewTest" && <ViewTestPage />}
        {role === "studentReport" && <StudentReportPage />}
        {role === "teacherReport" && <TeacherReportPage />}
        {role === "schoolReport" && <SchoolReportPage />}
        {role === "testReport" && <TestReportPage />}
        {role === "userProfiles" && <UserProfilesTable />}
        {role === "createSession" && <CreateSession />}
        {role === "addSubject" && <AddSubject />}
      </div>
    </div>
  );
};

export default Sidebar;
