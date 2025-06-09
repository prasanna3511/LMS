import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import apiRequest from '../../utils/apiRequest';

const StudentAttendance = () => {
  const [standard, setStandard] = useState("");
  const [allSessions ,setAllSessions ] = useState([])

  const [students, setStudents] = useState([
  ]);
  const userData = JSON.parse(localStorage.getItem('userData'))
  useEffect(()=>{
    fetchAllSessions()
    fetchAllStudents()
  },[])
  const fetchAllSessions = async()=>{
    try {
      const result = await apiRequest({
        endpoint: "sessions/getsessionbyschoolid.php",
        method: "GET",
        data: {school_id : userData.school_id},
      });
  
      if (result.status === "success") {
        // alert("Session creation completed");
        console.log(result.data)
        setAllSessions(result.data)
        // navigate("/dashboard");
      } else {
        alert(result.message || "Session creation failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  }
  const fetchAllStudents = async()=>{
    try {
      const result = await apiRequest({
        endpoint: "users/getStudentBySchoolId.php",
        method: "POST",
        data: {school_id : userData.school_id},
      });
  
      if (result.status === "success") {
        // alert("Session creation completed");
        // console.log("users",result.data)
        // setStudents(result.data)
        setStudents(result.data.map(student => ({
          ...student,
          present: false,
          description: ""
        })));
        
        // navigate("/dashboard");
      } else {
        // alert(result.message || "Session creation failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  }
  // const addAttendance = async()=>{
  //   try {
  //     const result = await apiRequest({
  //       endpoint: "studenattendance/addstudentattendance.php",
  //       method: "POST",
  //       data: {session_id : '',student_id:0, teacher_id:Number(userData.id),description:'',attendance:'present/absent'},
  //     });
  
  //     if (result.status === "success") {
  //       // alert("Session creation completed");
  //       // console.log("users",result.data)
  //       setStudents(result.data)
  //       // navigate("/dashboard");
  //     } else {
  //       // alert(result.message || "Session creation failed");
  //     }
  //   } catch (err) {
  //     alert(err.message || "Something went wrong");
  //   }
  // }
  const filteredStudents = standard
  ? students.filter(student => student.grade === standard)
  : students;

  const session_id = JSON.parse(localStorage.getItem('sessionIdForAttendance'))
  const addAttendance = async () => {
    try {
      const selectedStudents = students.filter(s => s.present !== undefined); // only those interacted with
  
      if (selectedStudents.length === 0) {
        alert("No student selected.");
        return;
      }
  
      for (const student of selectedStudents) {
        const result = await apiRequest({
          endpoint: "studenattendance/addstudentattendance.php",
          method: "POST",
          data: {
            session_id: Number(session_id), // You can update this if session is selected
            student_id: Number(student.id),
            teacher_id: Number(userData.id),
            description: student?.description || 'No Description',
            attendance: student.present ? 'present' : 'absent',
          },
        });
        if (result.status !== "success") {
          console.error(`Failed for ${student.full_name}: ${result.message}`);
        }
      }
  
      alert("Attendance submitted successfully.");
    } catch (err) {
      alert(err.message || "Something went wrong during attendance submission.");
    }
  };
  
  // const handleCheckboxChange = (index) => {
  //   const updatedStudents = [...students];
  //   updatedStudents[index].present = !updatedStudents[index].present;
  //   setStudents(updatedStudents);
  // };

  const handleCheckboxChange = (id) => {
    const updatedStudents = students.map(student => {
      if (student.id === id) {
        return { ...student, present: !student.present };
      }
      return student;
    });
    setStudents(updatedStudents);
  };
  
  // const handleDescriptionChange = (index, value) => {
  //   const updatedStudents = [...students];
  //   updatedStudents[index].description = value;
  //   setStudents(updatedStudents);
  // };
  const handleDescriptionChange = (id, value) => {
    const updatedStudents = students.map(student => {
      if (student.id === id) {
        return { ...student, description: value };
      }
      return student;
    });
    setStudents(updatedStudents);
  };
  
  const handleSessionChange = (index, value) => {
    const updatedStudents = [...students];
    updatedStudents[index].session = value;
    setStudents(updatedStudents);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input type="text" placeholder="Search..." style={{ padding: '8px 12px', borderRadius: '17px', border: '1px solid #ccc',  width: '250px' }} />
          <button style={{ backgroundColor: '#3A2D7D', color: '#fff', border: 'none', borderRadius: 20, cursor: 'pointer',padding:8 }}>Search</button>
        </div>
        {/* <select style={{ padding: '8px 12px', fontSize: '14px',width:200 }}>
          <option>Select Std</option>
          <option>Class 1</option>
          <option>Class 2</option>
        </select> */}
         <select
                style={{ padding: '8px 12px', fontSize: '14px',width:200}}
                value={standard}
                onChange={(e) => setStandard(e.target.value)}
              >
                <option value="">Select Standard</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
                  return <option key={number} value={`${number}`}>{number}</option>
                })}
              </select>
        <Navbar />
      </div>

      <h2 style={{ color: 'orange', marginBottom: '20px' }}>Student Attendance</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '10px' }}>Student Name</th>
            <th style={{ padding: '10px' }}>Present / Absent</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Description </th>
            {/* <th style={{ textAlign: 'left', padding: '10px' }}>Session</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td style={{ padding: '10px' }}>{student.full_name}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <input type="checkbox" checked={student.present} onChange={() => handleCheckboxChange(student.id)} />
              </td>
              <td style={{ padding: '10px' }}>
                <input
                  type="text"
                  placeholder="Optional description"
                  value={student.description}
                  onChange={(e) => handleDescriptionChange(student.id, e.target.value)}
                  style={{ width: '90%', padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </td>
              {/* <td style={{ padding: '10px' }}>
                <select
                  value={student.session}
                  onChange={(e) => handleSessionChange(index, e.target.value)}
                  style={{ width: '100%', padding: '6px', borderRadius: '4px' }}
                >
                  <option value="">Select Session</option>
                  {allSessions.map((element)=>(
                     <option value={element.id}>{element.name_of_session}</option>
                  ))}
                </select>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
  <button
    onClick={addAttendance}
    style={{
      backgroundColor: 'rgb(58, 45, 125)',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    }}
  >
    Submit Attendance
  </button>
</div>
    </div>
  );
};

export default StudentAttendance;
