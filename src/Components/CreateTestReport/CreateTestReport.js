import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import apiRequest from '../../utils/apiRequest';

const StudentAttendance = () => {
  const [testId, setTestId] = useState("");
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
      const payload = {school_id:Number(userData.school_id)};
      
      const result = await apiRequest({
        endpoint: "createTest/getAllTestPapers.php", // Adjust to your actual endpoint
        method: "POST",
        data: payload,
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
        console.log("student data : ",result.data)
        setStudents(result.data.map(student => ({
          ...student,
          present: false,
          marks: "",
          out_of_marks: ""
        })));
        
        // navigate("/dashboard");
      } else {
        // alert(result.message || "Session creation failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  }
  const handleMarksChange = (id, value) => {
    const updatedStudents = students.map(student =>
      student.id === id ? { ...student, marks: value } : student
    );
    setStudents(updatedStudents);
  };
  
  const handleOutOfMarksChange = (id, value) => {
    const updatedStudents = students.map(student =>
      student.id === id ? { ...student, out_of_marks: value } : student
    );
    setStudents(updatedStudents);
  };
  
  const session_id = JSON.parse(localStorage.getItem('sessionIdForAttendance'))
  const addAttendance = async () => {
    try {
      if (!testId) {
        alert("Please select a test from the dropdown.");
        return;
      }
  
      // 2. Validate at least one student has entered marks
      const hasAtLeastOneMark = students.some(
        (student) => student.marks !== "" && !isNaN(student.marks)
      );
  
      if (!hasAtLeastOneMark) {
        alert("Please enter marks for at least one student.");
        return;
      }
  
      const selectedStudents = students.filter(s => s.present !== undefined); 
  
      // if (selectedStudents.length === 0) {
      //   alert("No student selected.");
      //   return;
      // }
  
      for (const student of students) {
        const result = await apiRequest({
          endpoint: "student_test_report/add_marks.php",
          method: "POST",
          data: {
            student_id: student.id,
            test_id: testId,
            marks: Number(student.marks),
            out_of_marks: Number(student.out_of_marks),
            teacher_id: Number(userData.id),
            school_id: Number(userData.school_id)
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
  
  const handleCheckboxChange = (id) => {
    const updatedStudents = students.map(student => {
      if (student.id === id) {
        return { ...student, present: !student.present };
      }
      return student;
    });
    setStudents(updatedStudents);
  };
  
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
        {/* <div style={{ display: 'flex', alignItems: 'center' }}>
          <input type="text" placeholder="Search..." style={{ padding: '8px 12px', borderRadius: '17px', border: '1px solid #ccc',  width: '250px' }} />
          <button style={{ backgroundColor: '#3A2D7D', color: '#fff', border: 'none', borderRadius: 20, cursor: 'pointer',padding:8 }}>Search</button>
        </div> */}
        {/* <select style={{ padding: '8px 12px', fontSize: '14px',width:200 }}>
          <option>Select Std</option>
          <option>Class 1</option>
          <option>Class 2</option>
        </select> */}
         <select
                style={{ padding: '8px 12px', fontSize: '14px',width:200,borderRadius:17}}
                value={testId}
                onChange={(e) => setTestId(e.target.value)}
              >
                <option value="">Select Test</option>
                {allSessions.map((number) => {
                  return <option key={number.id} value={`${number.id}`}>{number.name}</option>
                })}
              </select>
        <Navbar />
      </div>

      <h2 style={{ color: '#F75F00', marginBottom: '20px' }}>Create Test Report</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '10px' }}>Student Name</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Marks </th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Out of </th>
            {/* <th style={{ textAlign: 'left', padding: '10px' }}>Session</th> */}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td style={{ padding: '10px' }}>{student.full_name}</td>
         
              <td style={{ padding: '10px' }}>
  <input
    type="number"
    placeholder="Marks"
    value={student.marks}
    onChange={(e) => handleMarksChange(student.id, e.target.value)}
    style={{ width: '90%', padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
  />
</td>
<td style={{ padding: '10px' }}>
  <input
    type="number"
    placeholder="Out of"
    value={student.out_of_marks}
    onChange={(e) => handleOutOfMarksChange(student.id, e.target.value)}
    style={{ width: '90%', padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
  />
</td>

         
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
    Submit Marks
  </button>
</div>
    </div>
  );
};

export default StudentAttendance;
