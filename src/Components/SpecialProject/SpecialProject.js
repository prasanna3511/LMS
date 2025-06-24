import React, { useEffect, useState } from 'react';
import apiRequest from '../../utils/apiRequest';
import Navbar from '../Navbar/Navbar';

const SpecialProjectForm = () => {
  const [allSubjects, setAllSubjects] = useState([]);

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
          setAllSubjects(subjectNames); // Set all at once
          console.log("Subjects fetched:", subjectNames);
        } else {
          alert(result.message || "Session creation failed");
        }
      } catch (err) {
        alert(err.message || "Something went wrong");
      }
    };
    fetchAllSubjects();
  }, []);
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

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("userData"));
      const studentId = user?.id;

      if (!studentId) {
        console.error("Student ID not found in local storage");
        alert("Student ID not found. Please log in again.");
        return;
      }

      const payload = {
        standard: formData.standard,
        subject: formData.subject,
        project_name: formData.projectName,
        student_id: studentId,
        student_name: user.full_name,
        description: formData.description,
        school_name: user.school_name,
        created_date: formData.creationDate,
        guide_name: formData.guideName,
      };

      const result = await apiRequest({
        endpoint: "specialproject/addspecialproject.php", // ✅ update with your actual path if needed
        method: "POST",
        data: payload,
      });

      if (result.status === "success") {
        alert("Project saved successfully!");
        setFormData({
          standard: "",
          subject: "",
          projectName: "",
          studentName: "",
          description: "",
          schoolName: "",
          guideName: "",
          creationDate: "",
          additionalStudents: [],
        });
      } else {
        console.error("Failed to create project:", result.message);
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("Something went wrong while submitting the project.");
    }
  };

  const styles = {
    container: {
      padding: '20px',
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
    <form onSubmit={handleSubmit} style={styles.container}>
      <div style={{width:'100%',display:'flex', justifyContent:'flex-end'}}>
      <Navbar />
        </div>
      <div style={{display:'flex',flexDirection:'row' , alignItems:'center'}} >

      <div style={styles.heading}>Special Project </div>
      <div style={{...styles.row,marginLeft:10}}>
        <div style={styles.column}>
          <label style={styles.label}>Standard</label>
          {/* <input
            name="standard"
            style={styles.input}
            value={formData.standard}
            onChange={handleChange}
          /> */}
          <select
            name="standard"
            value={formData.standard}
            onChange={handleChange}
            style={{ ...styles.input, backgroundColor:'white'}}
          >
            <option value="">Select standard</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
                  return (
                    <option key={number} value={`${number}`}>
                      {number}
                    </option>
                  );
                })}
          </select>
        </div>
        <div style={styles.column}>
          <label style={styles.label}>Subject</label>
          {/* <input
            name="subject"
            style={styles.input}
            value={formData.subject}
            onChange={handleChange}
          /> */}
             <select
                className="selectDropdown"
                value={formData.subject}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Subject</option>
                {allSubjects.map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
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
  );
};

export default SpecialProjectForm;
