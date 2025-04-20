// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Manager1 from "../../images/Teacher.png";

// export default function Dashboard() {
//   const [present, setPresent] = useState(30);
//   const [absent, setAbsent] = useState(2);
//   const total = present + absent;
//   const attendancePercentage =
//     total > 0 ? ((present / total) * 100).toFixed(1) : 0;

//   const navigate = useNavigate();
//   const handleContact = () => {
//     navigate("/Login");
//   };

//   const containerStyle = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "20px",
//     width: "320px",
//     marginBottom: "2%",
//   };

//   const sectionStyle = {
//     backgroundColor: "#F8F8F8",
//     padding: "20px",
//     borderRadius: "10px",
//     textAlign: "center",
//   };

//   const titleStyle1 = {
//     fontSize: "16px",
//     fontWeight: "bold",
//     color: "#d9534f",
//     marginBottom: "10px",
//   };

//   const chartContainerStyle = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   };

//   const chartStyle = {
//     width: "80px",
//     height: "80px",
//     borderRadius: "50%",
//     border: "8px solid #1a1a56",
//     borderTopColor: "transparent",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontWeight: "bold",
//     fontSize: "14px",
//   };

//   const textRowStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     fontSize: "12px",
//     marginTop: "10px",
//   };

//   const inputStyle = {
//     padding: "5px",
//     width: "70px",
//     margin: "5px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//     textAlign: "center",
//   };

//   const cardStyle = {
//     // backgroundColor: "#ABBFFC",
//     backgroundColor: "#F8F8F8",
//     padding: "15px",
//     borderRadius: "10px",
//     width: "250px",
//   };

//   const titleStyle = {
//     fontSize: "20px",
//     fontWeight: "bold",
//     color: "#d9534f",
//     marginBottom: "10px",
//   };

//   const buttonStyle = {
//     backgroundColor: "#1a1a56",
//     color: "white",
//     padding: "10px",
//     borderRadius: "20px",
//     border: "none",
//     width: "100%",
//     textAlign: "center",
//     cursor: "pointer",
//     marginTop: "20px",
//     height: "40px",
//     fontSize: "15px",
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", width: "80%" ,marginLeft:10}}>
//       <div>
//         <div
//           style={{
//             padding: "15px",
//             borderRadius: "10px",
//             marginBottom: "20px",
//             display: "flex",
//             justifyContent: "space-evenly",
//             alignItems: "center",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <input
//               type="text"
//               placeholder="Select School"
//               style={{
//                 padding: "10px",
//                 borderRadius: "17px",
//                 border: "1px solid #ccc",
//                 outline: "none",
//                 fontSize: "15px",
//               }}
//             />
//             <button
//               style={{
//                 backgroundColor: "#1a1a56",
//                 color: "white",
//                 padding: "10px 15px",
//                 borderRadius: "17px",
//                 border: "none",
//                 cursor: "pointer",
//                 fontSize: "15px",
//               }}
//             >
//               Search
//             </button>
//           </div>
  

             
//           <button
//             onClick={handleContact}
//             style={{
//               backgroundColor: "#1a1a56",
//               color: "white",
//               padding: "10px 15px",
//               borderRadius: "17px",
//               border: "none",
//               cursor: "pointer",
//               fontSize: "15px",
//               width:'180px'
//             }}
//           >
//             <a style={{ color: "white", textDecoration: "none" }}>
//               Add New School
//             </a>
//           </button>
//           <button
//             onClick={handleContact}
//             style={{
//               backgroundColor: "#1a1a56",
//               color: "white",
//               padding: "10px 15px",
//               borderRadius: "17px",
//               border: "none",
//               cursor: "pointer",
//               fontSize: "15px",
//               width:'180px'

//             }}
//           >
//             <a style={{ color: "white", textDecoration: "none" }}>
//              Create Login
//             </a>
//           </button>


// <div style={{display:'flex', flexDirection:'row'}}>

//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//             }}
//           >
//             <div
//               style={{
//                 width: "40px",
//                 height: "40px",
//                 borderRadius: "50%",
//                 backgroundColor: "#f0f0f0",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 fontWeight: "bold",
//               }}
//             >
//               👤
//             </div>
//             <div>
//               <p style={{ margin: 0, fontWeight: "bold" }}>Bhavin</p>
//               <p style={{ margin: 0, fontSize: "12px", color: "gray" }}>
//                 Admin
//               </p>
//             </div>
//           </div>
//           <img style={{height:30, width:30, marginLeft:20}} src={require('../../images/bell-ringing.png')} />

// </div>

//         </div>
//       </div>
//       {/* panel code */}
//       <div style={{ display: "flex", flexDirection: "row",marginTop:-25 }}>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             width: "70%",
//             justifyContent: "center",
//           }}
//         >
//          <div
//   style={{
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#ABBFFC80",
//     padding: "10px",
//     borderRadius: "10px",
//     position: "relative",
//     overflow: "visible", 
//     height:75 
//   }}
// >
//   <div>
//     <h3
//       style={{
//         margin: "5px 0",
//         color: "#F75F00",
//       }}
//     >
//       Welcome back, Admin
//     </h3>
//   </div>
//   <div>
//     <img
//       src={Manager1}
//       alt="Manager"
//       style={{
//         position: "absolute",
//         top: "-37px", // Adjust as needed
//         right: "2px", // Adjust position on the right
//         width: "130px", // Adjust size
//         height: "130px",
//       }}
//     />
//   </div>
// </div>
// {/* 1 */}
// <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:10,height:'70%'}}>

//           <div style={{width:'49%',height:'95%',backgroundColor:'#ABBFFC80',borderRadius:5,marginTop:10,display:'flex',flexDirection:'column'}}>
//             <div style={{width:'45px',height:'45px',backgroundColor:'#241F63',borderRadius:30,display:'flex', justifyContent:'center',alignItems:'center',marginTop:10,marginLeft:8}}>
//             <img src={require('../../images/profiile.png')} style={{height:30,width:30}}/>
//             </div>
//             <div style={{marginTop:-10}}>
//               <p style={{fontSize:18, color:'#241F63',fontWeight:'800',marginLeft:10}}>Student Report</p>
//             </div>
//             <div style={{width:'80%',height:35,marginLeft:8,backgroundColor:'white',marginTop:-9,borderRadius:10,display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}} >
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//               <div style={{height:'80%',border:'1px solid grey',width:'0.1px'}}></div>
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//               <div style={{height:'80%',border:'1px solid grey',width:'0.1px'}}></div>
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//             </div>
//           </div>
//           <div style={{width:'49%',height:142,backgroundColor:'#ABBFFC80',borderRadius:5,marginTop:10,display:'flex',flexDirection:'column'}}>
//             <div style={{width:'45px',height:'45px',backgroundColor:'#241F63',borderRadius:30,display:'flex', justifyContent:'center',alignItems:'center',marginTop:10,marginLeft:8}}>
//             <img src={require('../../images/profiile.png')} style={{height:30,width:30}}/>
//             </div>
//             <div style={{marginTop:-10}}>
//               <p style={{fontSize:18, color:'#241F63',fontWeight:'800',marginLeft:10}}>Student Report</p>
//             </div>
//             <div style={{width:'80%',height:35,marginLeft:8,backgroundColor:'white',marginTop:-9,borderRadius:10,display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}} >
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//               <div style={{height:'80%',border:'1px solid grey',width:'0.1px'}}></div>
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//               <div style={{height:'80%',border:'1px solid grey',width:'0.1px'}}></div>
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//             </div>
//           </div>
// </div>
// {/* 2 */}
// {/* <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

//           <div style={{width:'49%',height:142,backgroundColor:'#ABBFFC80',borderRadius:5,marginTop:10,display:'flex',flexDirection:'column'}}>
//             <div style={{width:'45px',height:'45px',backgroundColor:'#241F63',borderRadius:30,display:'flex', justifyContent:'center',alignItems:'center',marginTop:10,marginLeft:8}}>
//             <img src={require('../../images/profiile.png')} style={{height:30,width:30}}/>
//             </div>
//             <div style={{marginTop:-10}}>
//               <p style={{fontSize:18, color:'#241F63',fontWeight:'800',marginLeft:10}}>Student Report</p>
//             </div>
//             <div style={{width:'80%',height:35,marginLeft:8,backgroundColor:'white',marginTop:-9,borderRadius:10,display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}} >
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//               <div style={{height:'80%',border:'1px solid grey',width:'0.1px'}}></div>
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//               <div style={{height:'80%',border:'1px solid grey',width:'0.1px'}}></div>
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//             </div>
//           </div>
//           <div style={{width:'49%',height:142,backgroundColor:'#ABBFFC80',borderRadius:5,marginTop:10,display:'flex',flexDirection:'column'}}>
//             <div style={{width:'45px',height:'45px',backgroundColor:'#241F63',borderRadius:30,display:'flex', justifyContent:'center',alignItems:'center',marginTop:10,marginLeft:8}}>
//             <img src={require('../../images/profiile.png')} style={{height:30,width:30}}/>
//             </div>
//             <div style={{marginTop:-10}}>
//               <p style={{fontSize:18, color:'#241F63',fontWeight:'800',marginLeft:10}}>Student Report</p>
//             </div>
//             <div style={{width:'80%',height:35,marginLeft:8,backgroundColor:'white',marginTop:-9,borderRadius:10,display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}} >
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//               <div style={{height:'80%',border:'1px solid grey',width:'0.1px'}}></div>
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//               <div style={{height:'80%',border:'1px solid grey',width:'0.1px'}}></div>
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//             </div>
//           </div>
// </div> */}
// {/* 3 */}
// {/* <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

//           <div style={{width:'49%',height:142,backgroundColor:'#ABBFFC80',borderRadius:5,marginTop:10,display:'flex',flexDirection:'column'}}>
//             <div style={{width:'45px',height:'45px',backgroundColor:'#241F63',borderRadius:30,display:'flex', justifyContent:'center',alignItems:'center',marginTop:10,marginLeft:8}}>
//             <img src={require('../../images/profiile.png')} style={{height:30,width:30}}/>
//             </div>
//             <div style={{marginTop:-10}}>
//               <p style={{fontSize:18, color:'#241F63',fontWeight:'800',marginLeft:10}}>Student Report</p>
//             </div>
//             <div style={{width:'80%',height:35,marginLeft:8,backgroundColor:'white',marginTop:-9,borderRadius:10,display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}} >
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//               <div style={{height:'80%',border:'1px solid grey',width:'0.1px'}}></div>
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//               <div style={{height:'80%',border:'1px solid grey',width:'0.1px'}}></div>
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//             </div>
//           </div>
//           <div style={{width:'49%',height:142,backgroundColor:'#ABBFFC80',borderRadius:5,marginTop:10,display:'flex',flexDirection:'column'}}>
//             <div style={{width:'45px',height:'45px',backgroundColor:'#241F63',borderRadius:30,display:'flex', justifyContent:'center',alignItems:'center',marginTop:10,marginLeft:8}}>
//             <img src={require('../../images/profiile.png')} style={{height:30,width:30}}/>
//             </div>
//             <div style={{marginTop:-10}}>
//               <p style={{fontSize:18, color:'#241F63',fontWeight:'800',marginLeft:10}}>Student Report</p>
//             </div>
//             <div style={{width:'80%',height:35,marginLeft:8,backgroundColor:'white',marginTop:-9,borderRadius:10,display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}} >
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//               <div style={{height:'80%',border:'1px solid grey',width:'0.1px'}}></div>
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//               <div style={{height:'80%',border:'1px solid grey',width:'0.1px'}}></div>
//               <div style={{display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',alignItems:'center'}}>
//                 <p style={{fontSize:10}}>86</p>
//                 <p style={{fontSize:10,marginTop:-10}}>Total  Present </p>

//               </div>
//             </div>
//           </div>
// </div> */}

//         </div>

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-evenly",
//             marginLeft: "20px",
//           }}
//         >
//           <div style={containerStyle}>
//             {/* Attendance Report */}
//             <div>
//               <p style={titleStyle1}>Attendance Report</p>
//               <div style={sectionStyle}>
//                 <div style={chartContainerStyle}>
//                   <div style={chartStyle}>{attendancePercentage}%</div>
//                 </div>
//                 <div style={textRowStyle}>
//                   <span>
//                     <input
//                       type="number"
//                       value={present}
//                       onChange={(e) => setPresent(Number(e.target.value))}
//                       style={inputStyle}
//                       placeholder="Present"
//                     />{" "}
//                     <br /> Present Students
//                   </span>
//                   <span>
//                     <input
//                       type="number"
//                       value={absent}
//                       onChange={(e) => setAbsent(Number(e.target.value))}
//                       style={inputStyle}
//                       placeholder="Absent"
//                     />{" "}
//                     <br /> Absent Students
//                   </span>
//                   <span>
//                     <input
//                       type="number"
//                       value={total}
//                       onChange={(e) => setPresent(Number(e.target.value))}
//                       style={inputStyle}
//                       placeholder="Total"
//                     />{" "}
//                     <br /> Total Students
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Message Box */}
//             <div>
//               <p style={titleStyle1}>Message Box</p>
//               <div
//                 style={{
//                   backgroundColor: "#F8F8F8",
//                   padding: "20px",
//                   borderRadius: "10px",
//                   textAlign: "center",
//                   height: "100px",
//                 }}
//               >
//                 &nbsp;{" "}
//                 <input
//                   type="text"
//                   style={{ borderRadius: "10px", height: "100%" }}
//                 />{" "}
//               </div>
//             </div>

//             {/* Special Projects */}
//             <div>
//               <p style={titleStyle1}>Special Projects</p>
//               <div
//                 style={{
//                   backgroundColor: "#F8F8F8",
//                   padding: "20px",
//                   borderRadius: "10px",
//                   textAlign: "center",
//                   height: "100px",
//                 }}
//               >
//                 &nbsp;
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { BellIcon, LogOutIcon, Menu } from "lucide-react";
import React, { useState } from "react";

const createMenuItems = [
  { label: "Create Session", active: true },
  { label: "Create Question Bank" },
  { label: "Create Test" },
  { label: "Create Holiday" },
  { label: "Create Expense" },
];

const reportMenuItems = [
  { label: "Teacher Report" },
  { label: "Student Report" },
  { label: "Test Report" },
  { label: "School Report" },
  { label: "Principal /Admin Report" },
];

const viewMenuItems = [
  { label: "Question bank" },
  { label: "Test" },
  { label: "Accounts" },
  { label: "School Holidays" },
];

const previousSessions = [{ name: "xcvdhfghgfug" }];

 const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" ,width:'100%'}}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative", padding: "0 20px" }}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            position: "fixed",
            top: "16px",
            left: "16px",
            padding: "8px",
            backgroundColor: "#241f63",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            zIndex: 50,
            display: window.innerWidth > 1024 ? "none" : "block"
          }}
        >
          <Menu color="white" size={24} />
        </button>

        {/* Sidebar */}
    

        {/* Main Content */}
        <div style={{  paddingTop: window.innerWidth > 1024 ? "32px" : "64px" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "8px", marginBottom: "32px",width:'100%' }}>
            <div style={{
              width: "31px",
              height: "31px",
              backgroundColor: "#abbffc",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <BellIcon color="#241f63" size={15} />
            </div>

            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "2px solid #925fe2",
              overflow: "hidden"
            }}>
              <img src="/frame-19.svg" alt="Profile" style={{ width: "100%", height: "100%" }} />
            </div>

            <div>
              <div style={{ fontSize: "14px", fontWeight: 600 }}>Bhavin</div>
              <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.5)" }}>Admin</div>
            </div>
          </div>

          <h1 style={{ color: "#f75e00", fontSize: "32px", fontWeight: 600}}>
            Create Session
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: window.innerWidth > 1280 ? "3fr 1fr" : "1fr", gap: "24px" }}>
            <div>
              {/* Session Section */}
              <div style={{ }}>
                <h2 style={{ color: "#241f63", fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>
                  Session : 1 Name of the session
                </h2>

                <div style={{ display: "flex", gap: "16px", marginBottom: "8px" }}>
                  <select style={{
                    width: "162px",
                    height: "40px",
                    border: "1px solid #241f63",
                    borderRadius: "4px",
                    padding: "0 8px"
                  }}>
                    <option value="">Select Subject</option>
                    <option value="subject1">Subject 1</option>
                    <option value="subject2">Subject 2</option>
                  </select>

                  <select style={{
                    width: "162px",
                    height: "40px",
                    border: "1px solid #241f63",
                    borderRadius: "4px",
                    padding: "0 8px"
                  }}>
                    <option value="">Select Std</option>
                    <option value="std1">Std 1</option>
                    <option value="std2">Std 2</option>
                  </select>
                </div>

                <div style={{ backgroundColor: "#f8f8f8", padding: "16px", borderRadius: "13px" }}>
                  <div style={{ marginBottom: "8px" }}>Description of the Topic :</div>
                  <textarea
                    style={{
                      width: "100%",
                      height: "60px",
                      backgroundColor: "transparent",
                      border: "none",
                      resize: "none"
                    }}
                  />
                </div>
              </div>

              {/* Practical Section */}
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ color: "#241f63", fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>
                  Practical : Name of Practical
                </h2>

                <div style={{ backgroundColor: "#f8f8f8", padding: "16px", borderRadius: "13px" }}>
                  <div style={{ marginBottom: "8px" }}>Description of the Practical :</div>
                  <textarea
                    style={{
                      width: "100%",
                      height: "40px",
                      backgroundColor: "transparent",
                      border: "none",
                      resize: "none"
                    }}
                  />
                </div>
              </div>

              {/* Demo Link Section */}
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ color: "#241f63", fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>
                  Demo Link
                </h2>

                <div style={{ backgroundColor: "#f8f8f8", padding: "16px", borderRadius: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <div>Link of video</div>
                  <input
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      border: "none"
                    }}
                  />
                </div>
              </div>

              {/* Demo Description */}
              <div style={{ backgroundColor: "#f8f8f8", padding: "16px", borderRadius: "13px", marginBottom: "24px" }}>
                <div style={{ marginBottom: "8px" }}>Description of the Demo :</div>
                <textarea
                  style={{
                    width: "100%",
                    height: "50px",
                    backgroundColor: "transparent",
                    border: "none",
                    resize: "none"
                  }}
                />
              </div>

              {/* Save Button */}
              <div style={{ display: "flex", justifyContent: window.innerWidth > 768 ? "flex-end" : "center" }}>
                <button
                  style={{
                    width: window.innerWidth > 768 ? "172px" : "100%",
                    height: "43px",
                    backgroundColor: "#241f63",
                    color: "white",
                    border: "none",
                    borderRadius: "18px",
                    fontSize: "18px",
                    fontWeight: 500,
                    cursor: "pointer"
                  }}
                >
                  Save
                </button>
              </div>
            </div>

            {/* Previous Sessions */}
            <div>
              <h2 style={{ color: "#241f63", fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>
                Previous Sessions
              </h2>

              <div style={{ backgroundColor: "#f8f8f8", borderRadius: "13px" }}>
                <div style={{
                  padding: "14px",
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #e5e7eb"
                }}>
                  <div style={{ fontSize: "12px" }}>Name</div>
                  <div style={{ fontSize: "12px" }}>Edit</div>
                  <div style={{ fontSize: "12px" }}>Delete</div>
                </div>

                {previousSessions.map((session, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "14px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div style={{ fontSize: "12px" }}>{session.name}</div>
                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        padding: "4px 8px",
                        cursor: "pointer",
                        fontSize: "12px"
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        padding: "4px 8px",
                        cursor: "pointer"
                      }}
                    >
                      <img
                        src="/vector-2.svg"
                        alt="Delete"
                        style={{ width: "16px", height: "18px" }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard