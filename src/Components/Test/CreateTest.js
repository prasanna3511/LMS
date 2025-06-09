
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import apiRequest from "../../utils/apiRequest";
import jsPDF from "jspdf";
// import "jspdf-autotable";
import autoTable from "jspdf-autotable";

const mainContentStyle = {
  flex: 1,
  paddingTop: "24px",
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

const dropdownStyle = {
  width: "140px",
  height: "30px",
  borderRadius: "17px",
  padding: "0 15px",
  fontSize: "12px",
  backgroundColor: "white",
  margin: "0 4px",
};

export const CreateTest = () => {
  const [allSubjects, setAllSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [subject, setSubject] = useState("");
  const [standard, setStandard] = useState("");

  useEffect(() => {
    const fetchAllSubjects = async () => {
      try {
        const result = await apiRequest({
          endpoint: "subject/getallsubject.php",
          method: "GET",
          data: {},
        });

        if (result.status === "success") {
          const subjectNames = result.data.map((sub) => sub.subject_name);
          setAllSubjects(subjectNames);
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

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(), // Use timestamp for unique ID
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correct_answer: "1",
      type: "MCQ"
    };
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === id ? { ...question, [field]: value } : question
      )
    );
  };
  const handleSaveQuestions = async () => {
    if (!subject || !standard) {
      alert("Please select both subject and standard.");
      return;
    }
  
  
    for (let q of questions) {
      // Validation (optional, but recommended)
      if (!q.question || !q.option1 || !q.option2 || !q.option3 || !q.option4) {
        alert("Please fill all fields for each question.");
        return;
      }
  
      const payload = {
        question: q.question,
        option1: q.option1,
        option2: q.option2,
        option3: q.option3,
        option4: q.option4,
        correct_answer: q.correct_answer,
        type: q.type,
        standard: standard,
        subject: subject,
        test_id: 2, // Replace with actual test_id if needed
      };
  
      try {
        const result = await apiRequest({
          endpoint: "createTest/create_test.php",
          method: "POST",
          data: payload,
        });
  
        if (result.status !== "success") {
          alert("Failed to save a question: " + result.message);
          return;
        }
      } catch (err) {
        alert("Save failed: " + err.message);
        return;
      }
    }
  
    alert("All questions saved successfully!");
  };
  
  

  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.option1.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.option2.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.option3.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.option4.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userData = JSON.parse(localStorage.getItem('userData'));

  const handleGetQuestions = async () => {
    if (!subject) {
      alert("Please select a subject.");
      return;
    }

    if (!standard) {
      alert("Please select a standard.");
      return;
    }

    try {
      const payload = { subject: subject, standard: standard, school_id: Number(userData.school_id) , };

      const result = await apiRequest({
        endpoint: userData.role === 'admin'? "questionbank/getallquestion.php":"questionbank/getSchoolsubjectteacherSpecificQuestions.php",
        method: "POST",
        data: userData.role === 'admin'?{role:"admin"}:payload,
      });

      if (result.status === "success") {
        // Transform the API data to match your component structure
        const transformedQuestions = result.data.map((item, index) => ({
          id: item.id,
          question: item.question,
          option1: item.option1,
          option2: item.option2,
          option3: item.option3,
          option4: item.option4,
          correct_answer: item.correct_answer,
          type: item.type
        }));
        setQuestions(transformedQuestions);
      } else {
        console.error("Failed to fetch questions:", result.message);
        alert("Failed to fetch questions: " + result.message);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Error fetching questions: " + error.message);
    }
  };
  const sanitize = (text) =>
  text ? text.normalize("NFKD").replace(/[^\x00-\x7F]/g, "") : "";

  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;
  
    doc.setFont("helvetica");
    doc.setFontSize(16);
    // doc.text("MCQ Test", 14, y);
    doc.text("MCQ Test", doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
    y += 10;
  
    questions.forEach((q, index) => {
      // Add the question
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${sanitize(q.question)}`, 14, y);
      y += 7;
  
      // Add options
      const options = [
        `A. ${sanitize(q.option1)}`,
        `B. ${sanitize(q.option2)}`,
        `C. ${sanitize(q.option3)}`,
        `D. ${sanitize(q.option4)}`
      ];
  
      options.forEach((opt, i) => {
        const isCorrect = q.correct_answer === String(i + 1);
        doc.text(`${opt}${isCorrect ? "  ✔️" : ""}`, 20, y);
        y += 6;
      });
  
      y += 8;
  
      // Page break if nearing bottom
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
  
    doc.save("mcq_test.pdf");
  };
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "white",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Navbar />
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <main style={mainContentStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minWidth: 500,
            }}
          >
            <h2
              style={{
                color: "#f75e00",
                fontWeight: 600,
                marginBottom: "24px",
              }}
            >
              Create Test
            </h2>
            <div style={{ minWidth: 500, display: "flex", flexWrap: "wrap" }}>
              <select
                style={dropdownStyle}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {allSubjects.map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
              <select
                style={dropdownStyle}
                value={standard}
                onChange={(e) => setStandard(e.target.value)}
              >
                <option value="">Select Standard</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
                  return <option key={number} value={`${number}`}>{number}</option>
                })}
              </select>
              <button 
                style={{
                  backgroundColor: '#3F349A',
                  height: "30px",
                  display: 'flex',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0 15px'
                }} 
                onClick={() => handleGetQuestions()}
              >
                <p style={{ color: 'white', margin: 0 }}>Get Question Bank</p>
              </button>
            </div>
          </div>

          {/* Questions Section */}
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              Questions ({questions.length})
            </h3>

            {filteredQuestions.map((question, index) => (
              <div key={question.id} style={questionStyle}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <span
                    style={{ fontSize: "18px", fontWeight: 600, width: "27px" }}
                  >
                    {index + 1}.
                  </span>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <input
                        type="text"
                        placeholder="Enter question"
                        value={question.question}
                        onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
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
                          backgroundColor: "#ff4444",
                          marginLeft: "10px"
                        }}
                      >
                        🗑️
                      </button>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginTop: "16px",
                        gap: "8px"
                      }}
                    >
                      {[1, 2, 3, 4].map((optionNum) => (
                        <div key={optionNum} style={{
                          ...optionStyle,
                          width: "45%",
                          minWidth: "200px"
                        }}>
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            id={`q${question.id}-opt${optionNum}`}
                            checked={question.correct_answer === optionNum.toString()}
                            onChange={() => updateQuestion(question.id, 'correct_answer', optionNum.toString())}
                            style={{ marginRight: "8px" }}
                          />
                          <input
                            type="text"
                            placeholder={`Option ${optionNum}`}
                            value={question[`option${optionNum}`]}
                            onChange={(e) => updateQuestion(question.id, `option${optionNum}`, e.target.value)}
                            style={{
                              border: "none",
                              outline: "none",
                              fontSize: "8.1px",
                              fontWeight: 600,
                              backgroundColor: "transparent",
                              width: "100%"
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {questions.length === 0 && (
              <div style={{ textAlign: "center", color: "#666", padding: "20px" }}>
                No questions available. Click "Get Question Bank" to load questions or "+" to add new ones.
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "32px",
            }}
          >
            <button
              style={{
                ...buttonStyle,
              }}
              onClick={addQuestion}
            >
              +
            </button>
            <button style={buttonStyle} onClick={downloadPDF}>Download</button>
            <button style={buttonStyle} on onClick={handleSaveQuestions}>Save</button>
          </div>
        </main>
      </div>
    </div>
  );
};