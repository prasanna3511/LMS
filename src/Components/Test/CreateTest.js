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
  const [questions, setQuestions] = useState([
    {
      id: 1,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      selectedOption: null,
    },
    {
      id: 2,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      selectedOption: null,
    },
  ]);

  // Function to add a new question
  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      selectedOption: null,
    };
    setQuestions([...questions, newQuestion]);
  };

  // Function to delete a question by its id
  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  };

  return (
    <div style={{ display: "flex", backgroundColor: "white", minHeight: "100vh" }}>
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
                    <div style={{display:'flex', flexDirection:'row'}}>
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
                    <button
                    onClick={() => deleteQuestion(question.id)}
                    style={{
                      color: "white",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    🗑️
                  </button>
                    </div>
                  
                    
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
                  {/* Delete Button */}
               
                </div>
              </div>
            ))}
          </div>

          

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "32px" }}>
          <button
              style={{
                ...buttonStyle,
              }}
              onClick={addQuestion}
            >
              +
            </button>
            <button style={buttonStyle}>Download</button>
            <button style={buttonStyle}>Save</button>
          </div>
        </main>
      </div>
    </div>
  );
};
