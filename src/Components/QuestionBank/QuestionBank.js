import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './CreateQuestionBank.css'; 
import apiRequest from '../../utils/apiRequest';

const CreateQuestionBank = ({ setRole }) => {
  const [theoryQuestion, setTheoryQuestion] = useState('');
  const [practicalQuestion, setPracticalQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [selectedOption, setSelectedOption] = useState(null);
  const [qType, setQType] = useState('MCQ');
  const [subject, setSubject] = useState('Math');
const [standard, setStandard] = useState('Class 1');


  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleRadioChange = (index) => {
    setSelectedOption(index);
  };

  const handleQuestionTypeChange = (e) => {
    setQType(e.target.value);
  };
  const handleSave = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const createdDate = new Date().toISOString().split('T')[0];
  
    const apidata = {
      question: practicalQuestion,
      option1: qType === 'MCQ' ? options[0] : "1",
      option2: qType === 'MCQ' ? options[1] : '1',
      option3: qType === 'MCQ' ? options[2] : '1',
      option4: qType === 'MCQ' ? options[3] : '1',
      correct_answer: qType === 'MCQ' ? (options[selectedOption] || '1') : '1',
      type: qType,
      status: 'active',
      created_date: createdDate,
      created_by: userData.id,
      subject,
      standard,
      school_id: userData.school_id,
    };
  
    try {
      const result = await apiRequest({
        endpoint: "questionbank/addquestion.php", // change to your correct endpoint
        method: "POST",
        data: apidata,
      });
  
      if (result.status === "success") {
        alert("Question added successfully!");
        setRole('questionBankTable');
      } else {
        alert(result.message || "Failed to add question");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };
  
  

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Navbar />
      </div>

      <h2 style={{ color: '#F75F00', marginRight: '20px' }}>Create Question Bank</h2>

      <div className="responsiveContainer">
        <div className="leftSection">

          <div style={{ display: 'flex', alignItems: 'space-between', marginBottom: '20px' }}>
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ marginRight: '10px', fontSize: 16, fontWeight: '500' }}>Question Type</label>
              <select
                value={qType}
                onChange={handleQuestionTypeChange}
              className="selectDropdown"
              >
                <option>Select Type</option>
                <option>MCQ</option>
                <option>Theory</option>
              </select>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ marginRight: '10px', fontSize: 16, fontWeight: '500' }}>Subject</label>
              <select
              className="selectDropdown"
              value={subject} onChange={(e) => setSubject(e.target.value)}
              >
                <option>Subject</option>
                <option>Math</option>
                <option>Science</option>
              </select>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ marginRight: '10px', fontSize: 16, fontWeight: '500' }}>Standard</label>
              <select
                style={{
                  padding: '8px',
                  fontSize: '14px',
                  borderRadius: 15,
                  backgroundColor: 'white',
                  width: 120,
                  border: '1px solid #ccc',
                }}
                value={standard}
                onChange={(e) => setStandard(e.target.value)}
              >
                <option>Class 1</option>
                <option>Class 2</option>
              </select>
            </div>
          </div>

          {qType === 'MCQ' && (
            <>
              <div style={{ marginBottom: '10px' }}>
                <label>Enter Theory Question</label><br />
                <input
                  type="text"
                  value={practicalQuestion}
                  onChange={(e) => setPracticalQuestion(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '15px',
                    border: '1px solid #ccc',
                    width: '100%',
                    marginTop: '5px',
                  }}
                />
              </div>

              <div style={{ marginBottom: '0px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {/* {options.map((opt, index) => (
                    <div key={index} style={{ width: '45%', margin: '8px 2.5%' }}>
                      <label>Option {index + 1}</label>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        style={{
                          padding: '8px',
                          width: '80%',
                          borderRadius: 15,
                          border: '1px solid #ccc',
                        }}
                      />
                    </div>
                  ))} */}
                {options.map((opt, index) => (
  <div key={index} style={{ width: '45%', margin: '8px 2.5%' }}>
    <label>Option {index + 1}</label>
    <input
      type="text"
      value={opt}
      onChange={(e) => handleOptionChange(index, e.target.value)}
      style={{
        padding: '8px',
        width: '80%',
        borderRadius: 15,
        border: '1px solid #ccc',
        marginBottom: '5px',
      }}
    />
    <div>
      <input
        type="radio"
        name="correctOption"
        checked={selectedOption === index}
        onChange={() => handleRadioChange(index)}
      />
      <label style={{ marginLeft: '5px' }}>Correct</label>
    </div>
  </div>
))}

                </div>
              </div>
            </>
          )}

          {qType === 'Theory' && (
            <div style={{ marginBottom: '20px' }}>
              <label>Practical Question</label><br />
              <input
                type="text"
                value={practicalQuestion}
                onChange={(e) => setPracticalQuestion(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '15px',
                  border: '1px solid #ccc',
                  width: '100%',
                  marginTop: '5px',
                }}
              />
            </div>
          )}

          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#3A2D7D',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
            }}
            onClick={handleSave}
          >
            Save
          </button>
        </div>

        <div className="rightSection">
          <h3 style={{ marginBottom: '10px', fontSize: 16, fontWeight: '700' }}>Previously Created Questions</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px', fontSize: 14, fontWeight: '600' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '8px', fontSize: 14, fontWeight: '600' }}>Edit</th>
                <th style={{ padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px', fontSize: 12 }}>Sample Theory</td>
                <td style={{ padding: '8px', fontSize: 12 }}>✏️</td>
                <td style={{ display: 'flex', justifyContent: 'center' }}>🗑️</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestionBank;
