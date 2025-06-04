import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';

const SpecialProjectForm = () => {
  const [formData, setFormData] = useState({
    standard: '',
    subject: '',
    projectName: '',
    studentName: '',
    description: '',
    schoolName: '',
    guideName: '',
    creationDate: '',
    additionalStudents: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addStudent = () => {
    if (formData.studentName.trim()) {
      setFormData(prev => ({
        ...prev,
        additionalStudents: [...prev.additionalStudents, prev.studentName],
        studentName: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const styles = {
    container: {
      padding: '20px',
      // maxWidth: '900px',
      margin: 'auto',
      fontFamily: 'Arial, sans-serif'
    },
    heading: {
      color: 'orange',
      fontSize: '24px',
      marginBottom: '20px',
      fontWeight:'bold'
    },
    row: {
      display: 'flex',
      gap: '20px',
      marginBottom: '15px'
    },
    column: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    input: {
      padding: '10px',
      borderRadius: '20px',
      border: '1px solid #ccc',
      marginTop: '5px'
    },
    textarea: {
      width: '100%',
      height: '120px',
      padding: '10px',
      borderRadius: '20px',
      border: '1px solid #ccc',
      resize: 'none',
      marginTop: '5px'
    },
    button: {
      padding: '10px 25px',
      backgroundColor: '#1a1a7c',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer'
    },
    addButton: {
      marginTop: '8px',
      background: 'none',
      border: 'none',
      color: '#1a1a7c',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    label: {
      fontSize: '14px',
      fontWeight: 'bold'
    }
  };

  return (
    <>
    <div style={{width:'100%',display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>

    <Navbar />
    </div>
    <form onSubmit={handleSubmit} style={styles.container}>
      <div style={{display:'flex',flexDirection:'row' , alignItems:'center'}} >

      <div style={styles.heading}>Special Project </div>
      <div style={{...styles.row,marginLeft:10}}>
        <div style={styles.column}>
          <label style={styles.label}>Standard</label>
          <input
            name="standard"
            style={styles.input}
            value={formData.standard}
            onChange={handleChange}
          />
        </div>
        <div style={styles.column}>
          <label style={styles.label}>Subject</label>
          <input
            name="subject"
            style={styles.input}
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
      </div>
      </div>
     

      <div style={styles.row}>
        <div style={styles.column}>
          <label style={styles.label}>Project Name</label>
          <input
            name="projectName"
            style={styles.input}
            value={formData.projectName}
            onChange={handleChange}
          />
        </div>
        <div style={styles.column}>
          <label style={styles.label}>Student Name</label>
          <input
            name="studentName"
            style={styles.input}
            value={formData.studentName}
            onChange={handleChange}
          />
          <button type="button" onClick={addStudent} style={styles.addButton}>
            + Add Student Name
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={styles.label}>Description About Project</label>
        <textarea
          name="description"
          style={styles.textarea}
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div style={styles.row}>
        <div style={styles.column}>
          <label style={styles.label}>School Name</label>
          <input
            name="schoolName"
            style={styles.input}
            value={formData.schoolName}
            onChange={handleChange}
          />
        </div>
        <div style={styles.column}>
          <label style={styles.label}>Guide Name</label>
          <input
            name="guideName"
            style={styles.input}
            value={formData.guideName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div style={styles.column}>
        <label style={styles.label}>Creation Date</label>
        <input
          type="date"
          name="creationDate"
          style={{...styles.input,width:'47%'}}
          value={formData.creationDate}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <button type="submit" style={styles.button}>Save</button>
      </div>
    </form>
    </>

  );
};

export default SpecialProjectForm;
