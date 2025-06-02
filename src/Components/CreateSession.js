import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import apiRequest from '../utils/apiRequest';

const CreateSession = () => {
  const [sessionName, setSessionName] = useState('');
  const [subject, setSubject] = useState('');
  const [division, setDivision] = useState('');
  const [school, setschool] = useState('');
  const [standard, setStandard] = useState('');
  const [description, setDescription] = useState('');
  const [practicalName, setPracticalName] = useState('');
  const [practicalDesc, setPracticalDesc] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [demoDesc, setDemoDesc] = useState('');
  const [errors, setErrors] = useState({});
  const [selectedSchool , setSelectedSchool]= useState('')
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [getAllSchool , setGetAllSchool]=useState([])
  const [allSessions , setAllSessions]=useState([]);
  const [editingSession, setEditingSession] = useState(null);
  const resetForm = () => {
    setSessionName('');
    setSubject('');
    setDivision('');
    setStandard('');
    setDescription('');
    setPracticalName('');
    setDemoLink('');
    setDemoDesc('');
    setErrors({});
    setEditingSession(null);
  };
  useEffect(()=>{
const fetchSchoolData = async()=>{
  try {
    const result = await apiRequest({
      endpoint: "school/getallschool.php",
      method: "GET",
      data: {},
    });

    if (result.status === "success") {
      // alert("Session creation completed");
      setGetAllSchool(result.data)
      console.log("result",result)
      // navigate("/dashboard");
    } else {
      alert(result.message || "Session creation failed");
    }
  } catch (err) {
    alert(err.message || "Something went wrong");
  }
}
fetchSchoolData()
fetchAllSessions()
  },[])
  const fetchAllSessions = async()=>{
    try {
      const result = await apiRequest({
        endpoint: "sessions/getsessionbyschoolid.php",
        method: "GET",
        data: {},
      });
  
      if (result.status === "success") {
        // alert("Session creation completed");
        // setGetAllSchool(result.data)
        setAllSessions(result.data)
        // navigate("/dashboard");
      } else {
        alert(result.message || "Session creation failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  }
  const validateForm = () => {
    const newErrors = {};
    if (!sessionName.trim()) newErrors.sessionName = "Session name is required.";
    if (!subject) newErrors.subject = "Subject is required.";
    if (!division && !editingSession) newErrors.division = "Division is required.";
    if (!standard) newErrors.standard = "Standard is required.";
    if (!description.trim()) newErrors.description = "Topic description is required.";
    if (!practicalName.trim()) newErrors.practicalName = "Practical name is required.";
    // if (!practicalDesc.trim()) newErrors.practic alDesc = "Practical description is required.";
    // if (demoLink && !/^https?:\/\/.+/.test(demoLink)) {
    //   newErrors.demoLink = "Demo link must be a valid URL.";
    // }
    if (!demoDesc.trim()) newErrors.demoDesc = "Demo description is required.";
    console.log("newErrors : ",newErrors)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // const handleSave =async()=>{
  //   console.log("clicking")
  //   if (validateForm()) {

  //     let apidata = {
        // subject:subject,
        // standard:standard,
  //       topic_description:description,
  //       name_of_session:sessionName,
  //       practical_name:practicalName,
  //       // practical_description:'  ',
  //       demo_link:demoLink,
  //       demo_description:demoDesc,
  //       status:'active',
  //       school_id:selectedSchool
  //     }
  //         try {
  //           let result;

  //           if (editingSession) {
  //             // UPDATE logic
  //             result = await apiRequest({
  //               endpoint: "sessions/updatesession.php",
  //               method: "POST",
  //               data: { ...apidata, id: editingSession.id }, // include ID for update
  //             });
  //           } else {
  //             result = await apiRequest({
  //             endpoint: "sessions/createsessions.php",
  //             method: "POST",
  //             data: apidata,
  //           });}
        
  //           if (result.status === "success") {
  //             editingSession ? alert("Session updated!") :alert("Session creation completed");
  //             fetchAllSessions()
  //             resetForm()
  //             // navigate("/dashboard");
  //           } else {
  //             alert(result.message || "Session creation failed");
  //           }
  //         } catch (err) {
  //           alert(err.message || "Something went wrong");
  //         }
  //   }
  // }
  const handleSave = async () => {
    if (validateForm()) {
      try {
        for (let school_id of selectedSchools) {
          console.log(school_id)
          const apidata = {
            subject:subject,
            standard:standard,
            topic_description: description,
            name_of_session: sessionName,
            practical_name: practicalName,
            demo_link: demoLink,
            demo_description: demoDesc,
            status: 'active',
            school_id,
            practical_description:'  '
          };
  
          let result;
  
          if (editingSession) {
            result = await apiRequest({
              endpoint: "sessions/updatesession.php",
              method: "POST",
              data: { ...apidata, id: editingSession.id },
            });
          } else {
            result = await apiRequest({
              endpoint: "sessions/createsessions.php",
              method: "POST",
              data: apidata,
            });
          }
  
          if (result.status !== "success") {
            alert(result.message || "Session creation failed for one of the schools");
          }
        }
  
        alert(editingSession ? "Session updated!" : "Sessions created!");
        fetchAllSessions();
        resetForm();
      } catch (err) {
        alert(err.message || "Something went wrong");
      }
    }
  };
  
  const handleDeleteSession =async(session)=>{
    alert(`Delete ${session.id}`)
    try {
      const result = await apiRequest({
        endpoint: "sessions/deletesession.php",
        method: "POST",
        data: {id:session.id},
      });
  
      if (result.status === "success") {
        fetchAllSessions()
        alert("Session Deleted");
        // navigate("/dashboard");
      } else {
        alert(result.message || "Session Deletion failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  }
  return (
    <div style={{ width: '100%' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Navbar />
      </div>
      
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <div style={{width:'90%' , display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>

          <h1 style={styles.header}>Create Session</h1>
          {/* <select style={{ padding: '8px', borderRadius: '15px', border: '1px solid #ccc', width: 216 ,height:35}}
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}>
                    <option value="">School</option>
                    {getAllSchool.map((school)=>(
                      <option value={school.id}>{school.school_name}</option>
                    ))}
                  </select> */}
                  <div style={{ position: 'relative', display: 'inline-block', width: 216 }}>
  <div
    onClick={() => setDropdownOpen(!dropdownOpen)}
    style={{
      border: '1px solid #ccc',
      padding: '8px',
      borderRadius: '15px',
      cursor: 'pointer',
      backgroundColor: '#fff'
    }}
  >
    {selectedSchools.length === 0 ? "Select School(s)" : `${selectedSchools.length} selected`}
  </div>

  {dropdownOpen && (
    <div style={{
      position: 'absolute',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '10px',
      marginTop: 5,
      maxHeight: 200,
      overflowY: 'auto',
      zIndex: 1000,
      width: '100%',
      padding: '10px'
    }}>
      {getAllSchool.map((school) => (
        <div key={school.id}>
          <label>
            <input
              type="checkbox"
              value={school.id}
              checked={selectedSchools.includes(school.id)}
              onChange={(e) => {
                const checked = e.target.checked;
                setSelectedSchools((prev) =>
                  checked ? [...prev, school.id] : prev.filter((id) => id !== school.id)
                );
              }}
            />
            {' '}
            {school.school_name}
          </label>
        </div>
      ))}
    </div>
  )}
</div>

          </div>

          <div style={{ ...styles.formInnerContainer, width: '90%' }}>
            <div style={{ ...styles.section, width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, width: '100%', flexWrap: 'wrap' }}>
                <h2 style={styles.label}>Session : 1 Name of the session</h2>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginLeft:9 }}>
                  <select style={{ padding: '8px', borderRadius: '15px', border: '1px solid #ccc', flex: 1, width: 100 }}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}>
                    <option value="">Subject</option>
                    <option value="math">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="history">History</option>
                    {/* Add more subjects as needed */}
                  </select>
                  <select style={{ padding: '8px', borderRadius: '15px', border: '1px solid #ccc', flex: 1, width: 100 }}
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}>
                    <option value="">div</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    {/* Add more subjects as needed */}
                  </select>
                  

                  <select style={{ padding: '8px', borderRadius: '15px', border: '1px solid #ccc', flex: 1, width: 100 }}
                  onChange={(e)=>{setStandard(e.target.value)}} value={standard}
                  >
                    <option value="">std</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>

              {/* <input placeholder="Description of the Topic :" style={styles.textarea} /> */}
              <input
                placeholder="Session Name"
                style={{...styles.textarea,minHeight:10,marginBottom:10}}
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
              />
              {errors.sessionName && <p style={styles.error}>{errors.sessionName}</p>}
              <input
                placeholder="Description of the Topic :"
                style={styles.textarea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && <p style={styles.error}>{errors.description}</p>}
            </div>

            {/* Practical Section */}
            <div style={styles.section}>
              <h2 style={styles.label}>Practical : Name of Practical</h2>
              <input placeholder="Description of the Practical :" style={styles.textarea}    value={practicalName}
                onChange={(e) => setPracticalName(e.target.value)}
              />
              {errors.practicalName && <p style={styles.error}>{errors.practicalName}</p>}
            </div>

            {/* Demo Link Section */}
            <div style={styles.section}>
              <h2 style={styles.label}>Demo Link</h2>
              <input type="text" placeholder="Link of video" style={styles.input}  value={demoLink}
                onChange={(e) => setDemoLink(e.target.value)}
              />
              {errors.demoLink && <p style={styles.error}>{errors.demoLink}</p>}
              <input placeholder="Description of the Demo :" style={styles.textarea}  value={demoDesc}
                onChange={(e) => setDemoDesc(e.target.value)}
              />
              {errors.demoDesc && <p style={styles.error}>{errors.demoDesc}</p>}
            </div>

            {/* Save Button */}
            <div style={{ width: '100%', display: "flex", justifyContent: 'center' }}>
              <button style={styles.button} onClick={() => {
 handleSave()
}}>{editingSession ? "Update" : "Save"}</button>
            </div>
          </div>
        </div>

        {/* Previous Sessions */}
        <div style={styles.sessionsContainer}>
          <div style={styles.sessionsHeader}>
            Previous Sessions
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Edit</th>
                <th style={styles.tableHeader}>Delete</th>
              </tr>
            </thead>
            {/* <tbody>
              <tr>
                <td style={styles.tableCell}>xcvdfhgfghfug</td>
                <td></td>
                <td>
                  <button
                    style={styles.deleteButton}
                    onClick={() => alert('Delete clicked')}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody> */}
            <tbody>
  {allSessions.length === 0 ? (
    <tr>
      <td colSpan="3" style={{ textAlign: 'center' }}>No sessions found</td>
    </tr>
  ) : (
    allSessions.map((session, index) => (
      <tr key={index}>
        <td style={styles.tableCell}>{session.name_of_session}</td>
        <td style={styles.tableCell}>
          {/* <button onClick={() => alert(`Edit ${session.id}`)}>✏️</button> */}
          <button onClick={() => {
  setEditingSession(session); // store session in state
  setSessionName(session.name_of_session);
  setSubject(session.subject);
  setDivision(session.division);
  setStandard(session.standard);
  setDescription(session.topic_description);
  setPracticalName(session.practical_name);
  setDemoLink(session.demo_link);
  setDemoDesc(session.demo_description);
  setSelectedSchool(session.school_id); // optional, based on your logic
}}>✏️</button>

        </td>
        <td style={styles.tableCell}>
          <button
            style={styles.deleteButton}
            onClick={() => handleDeleteSession(session)}
          >
            🗑️
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '30px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: '0 auto',
    borderRadius: '10px',
    flexWrap: 'wrap', // Key for responsive layout
  },
  header: {
    color: '#ff6600',
    marginBottom: '20px',
  },
  formContainer: {
    flex: '1 1 600px', // Flexible width with minimum 600px
    marginRight: '20px',
    marginBottom: '20px',

  },
  formInnerContainer: {
    width: '90%',
  },
  row: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  dropdown: {
    padding: '10px',
    width: '48%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px', 
  },
  section: {
    marginBottom: '25px',
  },
  label: {
    color: '#333399',
    marginBottom: '10px',
    fontWeight: '600',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #F8F8F8',
    backgroundColor: '#F8F8F8'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    minHeight: '80px',
    borderRadius: '5px',
    border: '1px solid #F8F8F8',
    backgroundColor: '#F8F8F8'
  },
  button: {
    backgroundColor: '#1a1352',
    color: '#fff',
    padding: '10px 30px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px',
    width: 120,
    alignSelf: 'center'
  },
  sessionsContainer: {
    flex: '1 1 400px', // Flexible width with minimum 400px
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    padding: '20px',
    height: 300,
    marginTop: '80px',
  },
  sessionsHeader: {
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom: '15px',
    color: '#2c2c74',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    textAlign: 'left',
    fontSize: '14px',
    paddingBottom: '10px',
  },
  tableCell: {
    fontSize: '13px',
    paddingBottom: '10px',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  error:{
    color:'red'
  }
};

export default CreateSession;