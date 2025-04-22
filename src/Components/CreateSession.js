import React from 'react';

const CreateSession = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Create Session</h1>

      <div style={styles.formContainer}>
        {/* Dropdowns */}
     


        {/* Session Section */}
        <div style={styles.section}>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:2}}>

          <h2 style={styles.label}>Session : 1 Name of the session</h2>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
  <select style={{ padding: '8px', borderRadius: '20px', border: '1px solid #ccc', flex: 1 }}>
    <option value="">Select Subject</option>
    <option value="math">Mathematics</option>
    <option value="science">Science</option>
    <option value="history">History</option>
    {/* Add more subjects as needed */}
  </select>

  <select style={{ padding: '8px', borderRadius: '20px', border: '1px solid #ccc', flex: 1 }}>
    <option value="">Select Unit</option>
    <option value="unit1">Unit 1</option>
    <option value="unit2">Unit 2</option>
    <option value="unit3">Unit 3</option>
    {/* Add more units as needed */}
  </select>
</div>
</div>

          <input placeholder="Description of the Topic :" style={styles.textarea} />
        </div>

        {/* Practical Section */}
        <div style={styles.section}>
          <h2 style={styles.label}>Practical : Name of Practical</h2>
          <input placeholder="Description of the Practical :" style={styles.textarea} />
        </div>

        {/* Demo Link Section */}
        <div style={styles.section}>
          <h2 style={styles.label}>Demo Link</h2>
          <input type="text" placeholder="Link of video" style={styles.input} />
          <input placeholder="Description of the Demo :" style={styles.textarea} />
        </div>

        {/* Save Button */}
        <button style={styles.button}>Save</button>
      </div>

      {/* Previous Sessions */}
      <div style={styles.sessionsContainer}>
        <h2 style={styles.label}>Previous Sessions</h2>
        <div style={styles.sessionItem}>
          <span>xcvdfhfgfhgufg</span>
          <div>
            <button style={styles.iconBtn}>📝</button>
            <button style={styles.iconBtn}>🗑️</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '30px',
    background: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '1200px',
    margin: '0 auto',
    borderRadius: '10px',
  },
  header: {
    color: '#ff6600',
    marginBottom: '20px',
  },
  formContainer: {
    flex: 1,
    width: '65%',
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
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    minHeight: '80px',
    borderRadius: '5px',
    border: '1px solid #ccc',
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
  },
  sessionsContainer: {
    position: 'absolute',
    right: '40px',
    top: '80px',
    width: '250px',
    background: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  sessionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
    padding: '8px 0',
    borderBottom: '1px solid #eee',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginLeft: '5px',
  },
};

export default CreateSession;
