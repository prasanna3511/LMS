import React from 'react';
import Navbar from './Navbar/Navbar';

const CreateSession = () => {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Navbar />
      </div>
      
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h1 style={styles.header}>Create Session</h1>

          <div style={{ ...styles.formInnerContainer, width: '90%' }}>
            <div style={{ ...styles.section, width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, width: '100%', flexWrap: 'wrap' }}>
                <h2 style={styles.label}>Session : 1 Name of the session</h2>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginLeft:9 }}>
                  <select style={{ padding: '8px', borderRadius: '15px', border: '1px solid #ccc', flex: 1, width: 100 }}>
                    <option value="">Subject</option>
                    <option value="math">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="history">History</option>
                    {/* Add more subjects as needed */}
                  </select>
                  <select style={{ padding: '8px', borderRadius: '15px', border: '1px solid #ccc', flex: 1, width: 100 }}>
                    <option value="">div</option>
                    <option value="math">A</option>
                    <option value="science">B</option>
                    <option value="history">C</option>
                    {/* Add more subjects as needed */}
                  </select>

                  <select style={{ padding: '8px', borderRadius: '15px', border: '1px solid #ccc', flex: 1, width: 100 }}>
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
            <div style={{ width: '100%', display: "flex", justifyContent: 'center' }}>
              <button style={styles.button}>Save</button>
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
            <tbody>
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
};

export default CreateSession;