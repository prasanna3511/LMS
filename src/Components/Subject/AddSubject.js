import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import apiRequest from "../../utils/apiRequest";

const AddSubject = () => {
  const [subjects, setSubjects] = useState(["AI", "IOT"]);
  const [newSubject, setNewSubject] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [subjectupdateId , setSubjectupdateid] = useState({})
  useEffect(() => {
    const fetchAllSubjects = async () => {
      try {
        const result = await apiRequest({
          endpoint: "subject/getallsubject.php",
          method: "GET",
          data: {},
        });


        if (result.status === "success") {
          // Extract only the subject_name values
          const subjectNames = result.data.map((sub) => sub.subject_name);
          setSubjects(result.data); // Set all at once
        } else {
          alert(result.message || "Session creation failed");
        }
      } catch (err) {
        alert(err.message || "Something went wrong");
      }
    };
    fetchAllSubjects();
  }, []);


  const handleSave = async () => {
    const trimmedSubject = newSubject.trim();


    if (!trimmedSubject) return;


    try {
      const result = await apiRequest({
        endpoint: "subject/addSubject.php",
        method: "POST",
        data: {
          subject_name: trimmedSubject,
          // You can optionally pass other fields like subject_code, standard, etc.
        },
      });


      if (result.status === "success") {
        setSubjects([...subjects, trimmedSubject]);
        setNewSubject("");
        alert("Subject added successfully!");
      } else {
        alert(result.message || "Failed to add subject");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const handleSave = () => {
  //   if (newSubject.trim()) {
  //     setSubjects([...subjects, newSubject.trim()]);
  //     setNewSubject("");
  //   }
  // };

  const handleEdit = async(index,id) => {
    setEditIndex(index);
    setEditValue(subjects[index].subject_name);
  setSubjectupdateid(subjects[index]);
   
  };

  const handleUpdate = async() => {
    if (editValue.trim()) {
      const updated = [...subjects];
      updated[editIndex] = {
        ...updated[editIndex],
        subject_name: editValue.trim()
      };
      setSubjects(updated);
      setEditIndex(null);
      setEditValue("");
    }
    console.log("subjectupdateId.id : ",subjectupdateId.id , editValue.trim())
    try {
      const result = await apiRequest({
        endpoint: "subject/updatesubject.php",
        method: "POST",
        data: {
          subject_name: editValue.trim(),
          id:subjectupdateId.id
          // You can optionally pass other fields like subject_code, standard, etc.
        },
      });


      if (result.status === "success") {
        // setSubjects([...subjects, trimmedSubject]);
        // setNewSubject("");
        alert("Subject updated successfully!");
      } else {
        alert(result.message || "Failed to add subject");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  const handleDelete =async (index) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
    setSubjectupdateid(subjects[index]);
    try {
      const result = await apiRequest({
        endpoint: "subject/deletesubject.php",
        method: "POST",
        data: {
          subject_name: editValue.trim(),
          id:subjects[index].id
          // You can optionally pass other fields like subject_code, standard, etc.
        },
      });


      if (result.status === "success") {
        alert("Subject Deleted successfully!");
      } else {
        alert(result.message || "Failed to add subject");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  const containerStyle = {
    padding: isMobile ? "20px" : "40px",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "30px",
    width:'90%',
    justifyContent:'space-between'
  };

  const formStyle = {
    // flex: 1,
    minWidth: isMobile ? "100%" : "500px",
  };

  const listStyle = {
    // flex: 1,
    minWidth: isMobile ? "100%" : "300px",
    border: "1px solid #eee",
    padding: "20px",
    borderRadius: "10px",
    marginTop:10,
    backgroundColor:'#F8F8F8'
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#1d0e6f",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
  };

  const smallButton = {
    padding: "5px 10px",
    borderRadius: "4px",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginRight: "5px",
  };

  return (
    <div style={{width:'100%'}}>
<div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>

    <Navbar/>
</div>
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={{ color: "#ff6600" }}>Create New Subject</h2>

        <label>Enter New Subject</label>
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          style={inputStyle}
        />
        <br />
        <button onClick={handleSave} style={buttonStyle}>
          Save
        </button>

        {editIndex !== null && (
          <div style={{marginTop:30}}>
            <label>Subject Name</label>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              style={inputStyle}
            />
            <br />
            <button onClick={handleUpdate} style={buttonStyle}>
              Update
            </button>
          </div>
        )}
      </div>

      {/* <div style={{
    ...listStyle,
    maxHeight: "300px",        // Adjust height as needed
    overflowY: "auto",         // Enable vertical scroll
    border: "1px solid #ccc",  // Optional: visual boundary
    paddingRight: "10px",      // To prevent scrollbar overlapping
  }}>
        <h3>Existing Subjects</h3>
        <ol>
          {subjects.map((subject, index) => (
            <li key={index} style={{ marginBottom: "10px" ,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <span style={{ marginRight: "10px" }}>{subject}</span>
              <div>

              <button
                onClick={() => handleEdit(index)}
                style={{ ...smallButton, backgroundColor: "#1d0e6f" }}
                >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                style={{ ...smallButton, backgroundColor: "red" }}
                >
                Delete
              </button>
                  </div>
            </li>
          ))}
        </ol>
      </div> */}
      <div
  style={{
    ...listStyle,
    maxHeight: "300px",
    overflowY: "auto",
    border: "1px solid #ccc",
    paddingRight: "10px",
  }}
>
  <h3 style={{ marginBottom: "10px", fontSize: 16, fontWeight: "700" }}>
    Existing Subjects
  </h3>
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th
          style={{
            textAlign: "left",
            padding: "8px",
            fontSize: 14,
            fontWeight: "600",
          }}
        >
          Subject Name
        </th>
        <th style={{ padding: "8px", fontSize: 14, fontWeight: "600" }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {subjects.map((subject, index) => (
        <tr key={index}>
          <td style={{ padding: "8px", fontSize: 13 }}>{subject.subject_name}</td>
          <td style={{ padding: "8px", fontSize: 13 }}>
            <button
              onClick={() => {handleEdit(index,subject.id);setSubjectupdateid(subject)}}
              style={{
                ...smallButton,
                backgroundColor: "#1d0e6f",
                marginRight: "5px",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(index)}
              style={{ ...smallButton, backgroundColor: "red" }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
    </div>

  );
};

export default AddSubject;
