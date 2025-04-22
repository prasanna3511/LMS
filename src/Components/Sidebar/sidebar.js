import React, { useState } from "react";
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
import PrincipleDashboard from '../Principle/Principle'
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
    display: "flex",
    justifyContent: "space between",
  };

  const [role, setRole] = useState("createSession");
  // const [userT]

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden",width:'100%'}}>
      <div style={sidebarStyle}>
        <div style={titleStyle}>📚 Eduonix™ Dashboard</div>

        <div style={sectionTitleStyle}>Create</div>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
            <a onClick={()=>{setRole('createSession')}} href="#" style={linkStyle}>
              Create Session
            </a>
          </li>
          <li>
          <a onClick={()=>{setRole('questionBank')}} href="#" style={linkStyle}>
              Create Question Bank
            </a>
          </li>
          <li>
          <a onClick={()=>{setRole('test')}} href="#" style={linkStyle}>
              Create Test
            </a>
          </li>
          <li>
          <a onClick={()=>{setRole('holidayInput')}} href="#" style={linkStyle}>
              Create Holiday
            </a>
          </li>
          <li>
          <a onClick={()=>{setRole('material')}} href="#" style={linkStyle}>
              Create Expense
            </a>
          </li>
        </ul>

        <div style={sectionTitleStyle}>Reports</div>
        <ul style={{ paddingLeft: "20px" }}>
          <li>
          <a onClick={()=>{setRole('teacherReport')}} href="#" style={linkStyle}>
              Teacher Report
            </a>
          </li>
          <li>
          <a onClick={()=>{setRole('studentReport')}} href="#" style={linkStyle}>
              Student Report
            </a>
          </li>
          <li>
          <a onClick={()=>{setRole('testReport')}} href="#" style={linkStyle}>

              Test Report
            </a>
          </li>
          <li>
          <a onClick={()=>{setRole('schoolReport')}} href="#" style={linkStyle}>
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
          <a onClick={()=>{setRole('questionBankTable')}} href="#" style={linkStyle}>

              Question Bank
            </a>
          </li>
          <li>
          <a onClick={()=>{setRole('viewTest')}} href="#" style={linkStyle}>
              Tests
            </a>
          </li>
          <li>
          <a onClick={()=>{setRole('userProfiles')}} href="#" style={linkStyle}>
              Accounts
            </a>
          </li>
          <li>
          <a onClick={()=>{setRole('holidayTable')}} href="#" style={linkStyle}>
              School Holidays
            </a>
          </li>
        </ul>

        {/* <button style={logoutButtonStyle}>
            <
            <img style={{marginTop:'10px'}} src={logout} />Logout
            </button> */}
        <div style={logoutButtonStyle}>
          <img
            style={{ marginTop: "15px", height: 30 }}
            onClick={() => console.log("clicked")}
            src={logout}
          />
          <h3
            style={{ cursor: "pointer" }}
            onClick={() => console.log("clicked")}
          >
            Logout
          </h3>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px", width:'100%' }}>
        {role === "admin" && <Dashboard />}
        {role === "teacher" && <TeacherDashboard />}
        {role === "material" && <MaterialAndFurnituresForm  setRole={setRole} />}
        {role === "materialtable" && <MaterialsTable />}
        {role === "holidayInput" && <HolidayManager />}
        {role === "holidayTable" && <HolidayTablePage />}
        {role === "specialProject" && <SpecialProjectForm />}
        {role === "projectReport" && <SpecialProjectReport />}
        {role === "projectReportTable" && <SpecialProjectTable />}
        {role === "test" && <CreateTest />}
        {role === "studentTable" && <StudentDashboard />}
        {role === "principle" && <PrincipleDashboard />}
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
      </div>
    </div>
  );
};

export default Sidebar;
