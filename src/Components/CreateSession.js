import React from 'react'
import Slider from './Slider'

export default function CreateSession() {
        const styles = {
          container: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '40px',
            fontFamily: 'Arial, sans-serif',
            width: "100%"
          },
          leftPanel: {
            flex: 2,
            marginRight: '30px',
            width: "50%"
          },
          rightPanel: {
            flex: 1,
            backgroundColor: '#f5f5f5',
            borderRadius: '10px',
            padding: '20px',
          },
          heading: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'orange',
            marginBottom: '30px',
          },
          sectionTitle: {
            display: "flex",
            fontWeight: 'bold',
            color: '#2d2d8b',
            marginBottom: '10px',
            marginTop: '20px',
            justifyContent:"space-between"
          },
          textArea: {
            width: '100%',
            height: '80px',
            marginBottom: '20px',
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            resize: 'none',
          },
          input: {
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '10px',
            border: '1px solid #ccc',
          },
          saveButton: {
            padding: '10px 30px',
            backgroundColor: '#1c115f',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            display: 'block',
            margin: '20px auto 0 auto',
          },
          dropdownContainer: {
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
          },
          dropdown: {
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #ccc',
          },
          prevSessions: {
            fontWeight: 'bold',
            marginBottom: '15px',
          },
          sessionItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 0',
            borderBottom: '1px solid #ccc',
          },
          trashIcon: {
            cursor: 'pointer',
          },
        };
  return (
    <>
    <div>
    <div style={{display:"flex",padding:"20px"}}>
        <div>
            <Slider />
        </div>
        <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.heading}>Create Session</div>

        <div style={styles.sectionTitle}>Session : 1 Name of the session
        <div style={styles.dropdownContainer}>
          <select style={styles.dropdown}>
            <option>Select Subject</option>
          </select>
          <select style={styles.dropdown}>
            <option>Select Unit</option>
          </select>
        </div>
        </div>
        <textarea placeholder="Description of the Topic :" style={styles.textArea} />

        <div style={styles.sectionTitle}>Practical : Name of Practical</div>
        <textarea placeholder="Description of the Practical :" style={styles.textArea} />

        <div style={styles.sectionTitle}>Demo Link</div>
        <input type="text" placeholder="Link of video" style={styles.input} />
        <textarea placeholder="Description of the Demo :" style={styles.textArea} />

        <button style={styles.saveButton}>Save</button>
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.prevSessions}>Previous Sessions</div>
        <div style={styles.sessionItem}>
          <span>Thrash Items</span>
          <span style={styles.trashIcon}>🗑️</span>
        </div>
      </div>
    </div>
    </div>
    </div>

    </>
  )
}
