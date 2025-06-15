import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./CreateQuestionBank.css";
import apiRequest from "../../utils/apiRequest";

const CreateQuestionBank = ({ setRole }) => {
  const [theoryQuestion, setTheoryQuestion] = useState("");
  const [practicalQuestion, setPracticalQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [qType, setQType] = useState("MCQ");
  const [subject, setSubject] = useState("Math");
  const [questions, setQuestions] = useState([]);
  const [standard, setStandard] = useState("Class 1");
  const role = JSON.parse(localStorage.getItem("userData"));
  const [editingQuestionId, setEditingQuestionId] = useState(null);
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

  const handleEdit = (question) => {
    setEditingQuestionId(question.id);
    setQType(question.type);
    setSubject(question.subject);
    setStandard(question.standard);
    setTheoryQuestion(question.question);
    setPracticalQuestion(question.question);
    setOptions([
      question.option1,
      question.option2,
      question.option3,
      question.option4,
    ]);
    const correctIndex = [
      question.option1,
      question.option2,
      question.option3,
      question.option4,
    ].indexOf(question.correct_answer);
    setSelectedOption(correctIndex !== -1 ? correctIndex : 0);
  };
  const userData = JSON.parse(localStorage.getItem("userData"));

  const fetchAllQuestions = async () => {
    try {
      const result = await apiRequest({
        endpoint: "questionbank/getallquestion.php",
        method: "POST",
        data:
          role.role === "admin"
            ? { role: role.role }
            : { school_id: userData.school_id, role: userData.role },
      });

      if (result.status === "success") {
        // alert("Session creation completed");
        setQuestions(result.data);
      } else {
        alert(result.message || "Session creation failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };
  useEffect(() => {
    fetchAllQuestions();
  }, []);
  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleRadioChange = (index) => {
    setSelectedOption(index);
  };
  const resetForm = () => {
    setTheoryQuestion("");
    setPracticalQuestion("");
    setOptions(["", "", "", ""]);
    setSelectedOption(null);
    setQType("MCQ");
    setSubject("Math");
    setStandard("Class 1");
    setEditingQuestionId(null);
  };

  const handleQuestionTypeChange = (e) => {
    setQType(e.target.value);
  };
  const handleSave = async () => {
    const createdDate = new Date().toISOString().split("T")[0];

    const apidata = {
      id: editingQuestionId,
      question: practicalQuestion,
      option1: qType === "MCQ" ? options[0] : "1",
      option2: qType === "MCQ" ? options[1] : "1",
      option3: qType === "MCQ" ? options[2] : "1",
      option4: qType === "MCQ" ? options[3] : "1",
      correct_answer: qType === "MCQ" ? options[selectedOption] || "1" : "1",
      type: qType,
      status: "active",
      created_date: createdDate,
      created_by: userData.id,
      subject,
      standard,
      school_id: userData.school_id,
    };

    try {
      const endpoint = editingQuestionId
        ? "questionbank/updatequestion.php"
        : "questionbank/addquestion.php";
      const result = await apiRequest({
        endpoint: endpoint, // change to your correct endpoint
        method: "POST",
        data: apidata,
      });

      if (result.status === "success") {
        alert("Question added successfully!");
        // setRole('questionBankTable');
        fetchAllQuestions();
        resetForm();
      } else {
        alert(result.message || "Failed to add question");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;

    try {
      const result = await apiRequest({
        endpoint: "questionbank/deletequestion.php",
        method: "POST",
        data: { id },
      });

      if (result.status === "success") {
        alert("Question deleted successfully");
        setQuestions(questions.filter((q) => q.id !== id));
      } else {
        alert(result.message || "Failed to delete question");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Navbar />
      </div>

      <h2 style={{ color: "#F75F00", marginRight: "20px" }}>
        Create Question Bank
      </h2>

      <div className="responsiveContainer">
        <div className="leftSection">
          <div
            style={{
              display: "flex",
              alignItems: "space-between",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{ marginRight: "10px", fontSize: 16, fontWeight: "500" }}
              >
                Question Type
              </label>
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{ marginRight: "10px", fontSize: 16, fontWeight: "500" }}
              >
                Subject
              </label>
              {/* <select
                className="selectDropdown"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option>Subject</option>
                <option>Math</option>
                <option>Science</option>
              </select> */}
                <select
                className="selectDropdown"
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
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{ marginRight: "10px", fontSize: 16, fontWeight: "500" }}
              >
                Standard
              </label>
              <select
                style={{
                  padding: "8px",
                  fontSize: "14px",
                  borderRadius: 15,
                  backgroundColor: "white",
                  width: 120,
                  border: "1px solid #ccc",
                }}
                value={standard}
                onChange={(e) => setStandard(e.target.value)}
              >
                {[1,2,3,4,5,6,7,8,9,10].map((number)=>{ return<option value={`${number}`}>{number}</option>})}
              </select>
            </div>
          </div>

          {qType === "MCQ" && (
            <>
              <div style={{ marginBottom: "10px" }}>
                <label>Enter Theory Question</label>
                <br />
                <input
                  type="text"
                  value={practicalQuestion}
                  onChange={(e) => setPracticalQuestion(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "15px",
                    border: "1px solid #ccc",
                    width: "100%",
                    marginTop: "5px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "0px" }}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
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
                    <div
                      key={index}
                      style={{ width: "45%", margin: "8px 2.5%" }}
                    >
                      <label>Option {index + 1}</label>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        style={{
                          padding: "8px",
                          width: "80%",
                          borderRadius: 15,
                          border: "1px solid #ccc",
                          marginBottom: "5px",
                        }}
                      />
                      <div>
                        <input
                          type="radio"
                          name="correctOption"
                          checked={selectedOption === index}
                          onChange={() => handleRadioChange(index)}
                        />
                        <label style={{ marginLeft: "5px" }}>Correct</label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {qType === "Theory" && (
            <div style={{ marginBottom: "20px" }}>
              <label>Practical Question</label>
              <br />
              <input
                type="text"
                value={practicalQuestion}
                onChange={(e) => setPracticalQuestion(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "15px",
                  border: "1px solid #ccc",
                  width: "100%",
                  marginTop: "5px",
                }}
              />
            </div>
          )}

          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#3A2D7D",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={handleSave}
          >
            Save
          </button>
        </div>

        {/* <div className="rightSection">
          <h3 style={{ marginBottom: "10px", fontSize: 16, fontWeight: "700" }}>
            Previously Created Questions
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "8px",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  Edit
                </th>
                <th style={{ padding: "8px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px", fontSize: 12 }}>
                    {question.question}
                  </td>
                  <td style={{ padding: "8px", fontSize: 12 }}>
                    <button onClick={() => handleEdit(question)}>✏️</button>
                  </td>
                  <td style={{ padding: "8px", fontSize: 12 }}>
                    <button onClick={() => handleDelete(question.id)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        <div className="rightSection">
  <h3 style={{ marginBottom: "10px", fontSize: 16, fontWeight: "700" }}>
    Previously Created Questions
  </h3>

  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th
            style={{
              textAlign: "left",
              padding: "8px",
              fontSize: 14,
              fontWeight: "600",
              background: "#f0f0f0",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            Name
          </th>
          <th
            style={{
              textAlign: "left",
              padding: "8px",
              fontSize: 14,
              fontWeight: "600",
              background: "#f0f0f0",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            Edit
          </th>
          <th
            style={{
              padding: "8px",
              background: "#f0f0f0",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {questions.map((question, index) => (
          <tr key={index}>
            <td style={{ padding: "8px", fontSize: 12 }}>
              {question.question}
            </td>
            <td style={{ padding: "8px", fontSize: 12 }}>
              <button style={{backgroundColor: "#1d0e6f",color:"white" ,padding: "5px 10px",
    borderRadius: "4px",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginRight: "5px"}} onClick={() => handleEdit(question)}>Edit</button>
            </td>
            <td style={{ padding: "8px", fontSize: 12 }}>
              <button style={{backgroundColor: "red",color:"white" ,padding: "5px 10px",
    borderRadius: "4px",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginRight: "5px"}} onClick={() => handleDelete(question.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      </div>
    </div>
  );
};

export default CreateQuestionBank;
