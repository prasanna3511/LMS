import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

const AddSubject = () => {
  const [subjects, setSubjects] = useState(["AI", "IOT"]);
  const [newSubject, setNewSubject] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSave = () => {
    if (newSubject.trim()) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject("");
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(subjects[index]);
  };

  const handleUpdate = () => {
    if (editValue.trim()) {
      const updated = [...subjects];
      updated[editIndex] = editValue.trim();
      setSubjects(updated);
      setEditIndex(null);
      setEditValue("");
    }
  };

  const handleDelete = (index) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
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

      <div style={listStyle}>
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
      </div>
    </div>
    </div>

  );
};

export default AddSubject;
