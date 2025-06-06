import "./App.css";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Slider from "./Components/Slider";
import SchoolInfo from "./Components/SchoolInfo";
import StudentLogin from "./Components/StudentLogin"
import Admin from "./Components/Admin"
import CreateSession from './Components/CreateSession'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/sidebar";

function App() {
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
        <Route path="Login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
      
      <div style={{display: "flex"}}>
        <Slider />
        <div style={{ flexGrow: 1, padding: "20px" }}>
          <Dashboard />
        </div>
      </div> */}

      <BrowserRouter> 
      <Routes>
        <Route path="Student" element={<StudentLogin/>}></Route>
        <Route path="/School" element={<SchoolInfo/>}></Route>
        <Route path="/Admin" element={<Admin/>}></Route>
        <Route path="/CreateSession" element={<CreateSession />}></Route>
      </Routes>
      
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Sidebar />} />
              {/* <Route path="/dash" element={<Dashboard />} /> */}
            </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
