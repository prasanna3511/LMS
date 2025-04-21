import React, { useState } from "react";

const sidebarStyle = {
  width: "166px",
  height: "722px",
  backgroundColor: "#241f63",
  borderRadius: "18.05px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
};

const menuHeaderStyle = {
  color: "white",
  fontSize: "11.3px",
  fontWeight: 500,
  marginBottom: "8px",
};

const menuItemStyle = {
  color: "white",
  fontSize: "9px",
  marginBottom: "4px",
  cursor: "pointer",
};

const mainContentStyle = {
  flex: 1,
  padding: "24px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "48px",
};

const searchInputStyle = {
  width: "521px",
  height: "29px",
  borderRadius: "13.4px",
  border: "0.75px solid #3e3399",
  padding: "0 20px",
  fontSize: "7.5px",
  color: "#95969c",
};

const questionStyle = {
  marginBottom: "32px",
};

const optionStyle = {
  width: "132px",
  height: "23px",
  borderRadius: "9.85px",
  border: "0.4px solid black",
  display: "flex",
  alignItems: "center",
  padding: "0 8px",
  marginRight: "12px",
  marginBottom: "12px",
};

const buttonStyle = {
  width: "167px",
  height: "42px",
  backgroundColor: "#241f63",
  borderRadius: "17.65px",
  color: "white",
  fontSize: "17.6px",
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  marginRight: "16px",
};

export const CreateTest = () => {
  const [questions] = useState([
    {
      id: 1,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      selectedOption: 0,
    },
    {
      id: 2,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      selectedOption: null,
    },
  ]);
  return (
    <div style={{ display: "flex",backgroundColor: "white", minHeight: "100vh" }}>
      <div style={{ width: "100%", maxWidth: "540px", display: "flex" }}>

        {/* Main Content */}
        <main style={mainContentStyle}>
          <h1 style={{ color: "#f75e00", fontSize: "32px", fontWeight: 600, marginBottom: "24px" }}>
            Create Test
          </h1>

          {/* Questions Section */}
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>Questions</h3>
            
            {questions.map((question, index) => (
              <div key={question.id} style={questionStyle}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <span style={{ fontSize: "18px", fontWeight: 600, width: "27px" }}>
                    {question.id}.
                  </span>
                  
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      placeholder="Enter question"
                      style={{
                        width: "100%",
                        height: "40px",
                        borderRadius: "30px",
                        border: "1px solid black",
                        padding: "0 20px",
                      }}
                    />
                    
                    <div style={{ display: "flex", flexWrap: "wrap", marginTop: "16px" }}>
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} style={optionStyle}>
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            id={`q${question.id}-opt${optIndex}`}
                            defaultChecked={question.selectedOption === optIndex}
                            style={{ marginRight: "8px" }}
                          />
                          <label
                            htmlFor={`q${question.id}-opt${optIndex}`}
                            style={{ fontSize: "8.1px", fontWeight: 600 }}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "32px" }}>
            <button style={buttonStyle}>Download</button>
            <button style={buttonStyle}>Save</button>
          </div>
        </main>
      </div>
    </div>
  );
};

/////
// import React, { useState } from 'react';

// const QuestionBank = () => {
//   const [questions, setQuestions] = useState([
//     { text: '', options: ['', '', '', ''] },
//     { text: '', options: ['', '', '', ''] },
//   ]);

//   const handleQuestionChange = (index, value) => {
//     const updated = [...questions];
//     updated[index].text = value;
//     setQuestions(updated);
//   };

//   const handleOptionChange = (qIndex, oIndex, value) => {
//     const updated = [...questions];
//     updated[qIndex].options[oIndex] = value;
//     setQuestions(updated);
//   };

//   const addQuestion = () => {
//     setQuestions([...questions, { text: '', options: ['', '', '', ''] }]);
//   };

//   const removeQuestion = (index) => {
//     const updated = questions.filter((_, i) => i !== index);
//     setQuestions(updated);
//   };

//   return (
//     <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
//         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//         <h1 style={{ color: 'orange', marginRight: '20px' }}>Create Test</h1>
//         <select style={{ marginRight: '10px', padding: '8px', fontSize: '14px' ,borderRadius:20,marginLeft:10 }}>
//           <option>Select Subject</option>
//           <option>Math</option>
//           <option>Science</option>
//           <option>History</option>
//         </select>
//         <select style={{ padding: '8px', fontSize: '14px',borderRadius:20,marginLeft:10 }}>
//           <option>Select Class</option>
//           <option>Class 1</option>
//           <option>Class 2</option>
//           <option>Class 3</option>
//         </select>
//       </div>

//       <input 
//         type="text" 
//         placeholder="Enter Test Name"
//         style={{ display: 'block', margin: '20px 0', padding: '10px', width: '300px', fontSize: '16px',borderRadius:20 }} 
//       />

//       {questions.map((q, index) => (
//         <div key={index} style={{ marginBottom: '30px' }}>
//           <label style={{ fontWeight: 'bold' }}>Question {index + 1}.</label>
//           <input
//             type="text"
//             value={q.text}
//             onChange={(e) => handleQuestionChange(index, e.target.value)}
//             style={{ display: 'block', width: '80%', padding: '10px', margin: '10px 0' ,borderRadius:20 }}
//           />
//           {q.options.map((opt, oIdx) => (
//             <input
//               key={oIdx}
//               type="text"
//               placeholder={`Option ${oIdx + 1}`}
//               value={opt}
//               onChange={(e) => handleOptionChange(index, oIdx, e.target.value)}
//               style={{ marginRight: '10px', padding: '8px', width: '150px',borderRadius:20  }}
//             />
//           ))}
//           <div style={{ marginTop: '10px' }}>
//             <button onClick={addQuestion} style={{ marginRight: '10px',borderRadius:20  }}>➕</button>
//             {questions.length > 1 && (
//               <button onClick={() => removeQuestion(index)}>🗑️</button>
//             )}
//           </div>
//         </div>
//       ))}

//       <button style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#3A2D7D', color: '#fff', border: 'none', borderRadius: '5px' }}>
//         Download
//       </button>
//       <button style={{ padding: '10px 20px', backgroundColor: '#3A2D7D', color: '#fff', border: 'none', borderRadius: '5px' }}>
//         Save
//       </button>
//     </div>
//   );
// };

// export default QuestionBank;
