import React, { useState } from 'react';

const CreateQuestionBank = ({ setRole }) => {
  const [theoryQuestion, setTheoryQuestion] = useState('');
  const [practicalQuestion, setPracticalQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [selectedOption, setSelectedOption] = useState(null);
  const [qType, setQType] = useState('MCQ');

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleRadioChange = (index) => {
    setSelectedOption(index);
  };
  const handleQuestionTypeChange = (e) => {
    console.log("object",e.target.value)
    setQType(e.target.value);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '60%' }}>
        <h1 style={{ color: '#F75F00', marginRight: '20px' }}>Create Question Bank</h1>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <label style={{ marginRight: '10px' , fontSize:16,fontWeight:'500'}}>Question Type</label>
            <select value={qType}
              onChange={handleQuestionTypeChange} style={{ marginRight: '10px', padding: '8px', fontSize: '14px', backgroundColor: 'white', borderRadius: 15, width: 150 }}>
              <option>Select Type</option>
              <option  >MCQ</option>
              <option >Theory</option>
            </select>
          </div>
          <div>
            <label style={{ marginRight: '10px' , fontSize:16,fontWeight:'500'}}>Subject</label>
            <select style={{ marginRight: '10px', padding: '8px', fontSize: '14px', backgroundColor: 'white', borderRadius: 15, width: 150 }}>
              <option>Subject</option>
              <option>Math</option>
              <option>Science</option>
            </select>
          </div>
          <div>
            <label style={{ marginRight: '10px', fontSize:16,fontWeight:'500' }}>Standard</label>
            <select style={{ padding: '8px', fontSize: '14px', borderRadius: 15, backgroundColor: 'white', width: 150 }}>
              {/* <option>Select Std</option> */}
              <option>Class 1</option>
              <option>Class 2</option>
            </select>
          </div>
        </div>
        {
  qType=== 'MCQ'&& <>
        <div style={{ marginBottom: '0px' }}>
          <label style={{ marginBottom: '5px', display: 'block', fontSize:16,fontWeight:'700' }}>Enter Theory Question</label>
          <input
            type="text"
            // placeholder="Enter Theory Question"
            value={theoryQuestion}
            onChange={(e) => setTheoryQuestion(e.target.value)}
            style={{ display: 'block', width: '100%', padding: '10px', fontSize: '16px', borderRadius: 15 }}
          />
        </div>

        <div style={{ marginBottom: '0px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {options.map((opt, index) => (
              <div key={index} style={{ width: '45%', margin: '8px 2.5%' }}>
                <label style={{ display: 'block', fontSize:12,fontWeight:'bold'}}>Option {index + 1}</label>
                <input
                  type="text"
                  // placeholder={`Option ${index + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  style={{ padding: '8px', width: '80%', borderRadius: 15 }}
                />
              </div>
            ))}
          </div>
        </div>
        </>
}
{
  qType === 'Theory'&& 
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginBottom: '5px', display: 'block' , fontSize:16,fontWeight:'700' }}>Practical Question</label>
          <input
            type="text"
            // placeholder="Enter Practical Question"
            value={practicalQuestion}
            onChange={(e) => setPracticalQuestion(e.target.value)}
            style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '20px', fontSize: '16px', borderRadius: 15 }}
          />
        </div>
      }

        <button
          style={{ padding: '10px 20px', backgroundColor: '#3A2D7D', color: '#fff', border: 'none', borderRadius: '5px' }}
          onClick={() => { setRole('questionBankTable') }}
        >
          Save
        </button>
      </div>

      <div style={{ width: '30%', padding: '20px', backgroundColor: '#f6f6f6', borderRadius: '10px', marginTop: 50 }}>
        <h3 style={{ marginBottom: '10px' , fontSize:16,fontWeight:'700'}}>Previously Created Questions</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px', fontSize:14,fontWeight:'600' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '8px' , fontSize:14,fontWeight:'600'}}>Edit</th>
              <th style={{ padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px' , fontSize:12}}>Sample Theory</td>
              <td style={{ padding: '8px' , fontSize:12}}> ✏️</td>
              <td style={{ display:'flex',justifyContent:'center' }}>
                🗑️
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateQuestionBank;
