
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Navbar from '../Navbar/Navbar';
import '../Reports/StudentReportPage.css';
import apiRequest from '../../utils/apiRequest';

const QuestionBankTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [subject, setSubject] = useState("");
  const [allSubjects, setAllSubjects] = useState([]);
  const [standard, setStandard] = useState("");

  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const result = await apiRequest({
          endpoint: 'questionbank/getallquestion.php',
          method: 'POST',
          data: userData.role === 'admin'
            ? { role: userData.role }
            : { school_id: userData.school_id },
        });

        if (result.status === 'success') {
          setQuestions(result.data);
        } else {
          alert(result.message || 'Failed to fetch questions');
        }
      } catch (err) {
        alert(err.message || 'Something went wrong while fetching questions');
      }
    };

    fetchQuestions();
  }, []);

  const handleSaveQuestions = async () => {

  
  
    for (let q of selectedQuestions) {
      // Validation (optional, but recommended)
      console.log("selectedQuestions : ",selectedQuestions)
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
        standard: q.standard,
        subject: q.subject,
        test_id: 8, // Replace with actual test_id if needed
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
  

  const sanitize = (text) =>
  text ? text.normalize("NFKD").replace(/[^\x00-\x7F]/g, "") : "";

const downloadPDF = (selectedQuestions) => {
  if (!selectedQuestions || selectedQuestions.length === 0) {
    alert("Please select at least one question to download.");
    return;
  }

  const doc = new jsPDF();
  let y = 20;

  doc.setFont("helvetica");
  doc.setFontSize(16);
  doc.text("MCQ Test", doc.internal.pageSize.getWidth() / 2, y, { align: "center" });

  y += 10;

  selectedQuestions?.forEach((q, index) => {
    doc.setFontSize(12);
    doc.text(`${index + 1}. ${sanitize(q.question)}`, 14, y);
    y += 7;

    const options = [
      { label: "A", text: sanitize(q.option1) },
      { label: "B", text: sanitize(q.option2) },
      { label: "C", text: sanitize(q.option3) },
      { label: "D", text: sanitize(q.option4) },
    ];

    options.forEach((opt, i) => {
      const isCorrect = q.correct_answer === `${i + 1}`; // assuming answers are "1", "2", etc.
      doc.text(`${opt.label}. ${opt.text}${isCorrect ? "  ✔️" : ""}`, 20, y);
      y += 6;
    });

    y += 8;

    // Add page break if nearing bottom of page
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("mcq_test.pdf");
  handleSaveQuestions()
};

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

  // const filteredQuestions = questions.filter(q =>
  //   q.question.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  const filteredQuestions = questions.filter((q) => {
    const matchesQuery = q.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subject ? q.subject === subject : true;
    const matchesStandard = standard ? q.standard === standard : true;
    return matchesQuery && matchesSubject && matchesStandard;
  });
  

  return (
    <div style={{ width: '100%' }}>
      <div className="header-container">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '300px',
            padding: '10px',
            borderRadius: '17px',
            border: '1px solid #ccc',
            fontSize: '14px',
          }}
        />
        <Navbar />
      </div>

      <div style={{ paddingTop: '30px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ color: '#F75F00' }}>Question Bank</h2>
        <div>
     <select
              style={{
                padding: "10px",
                borderRadius: 20,
                border: "1px solid #ccc",
                backgroundColor: "white",
              }}
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
              style={{
                padding: "10px",
                borderRadius: 20,
                border: "1px solid #ccc",
                backgroundColor: "white",
              }}
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
            >
              <option>Select Class</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
                return (
                  <option key={number} value={`${number}`}>
                    {number}
                  </option>
                );
              })}
            </select>
            </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#f8f8f8' }}>
          <thead style={{ backgroundColor: '#e6e6e6', textAlign: 'left' }}>
            <tr>
              <th style={{ padding: '12px' }}>Select</th>
              <th style={{ padding: '12px' }}>Question</th>
              <th style={{ padding: '12px' }}>Correct Answer</th>
              <th style={{ padding: '12px' }}>Created by</th>
              <th style={{ padding: '12px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((q, index) => (
              <tr key={index}>
                <td style={{ padding: '12px' }}>
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(q)}
                    // onChange={() => handleCheckboxChange(q)}
                    onChange={(e) => {
                      setSelectedQuestions(prev => 
                        e.target.checked
                          ? [...prev, q]
                          : prev.filter(item => item !== q)
                      );
                    }}
                  />
                </td>
                <td style={{ padding: '12px' }}>{q.question}</td>
                <td style={{ padding: '12px' }}>{q.correct_answer}</td>
                <td style={{ padding: '12px' }}>{q.created_by}</td>
                <td style={{ padding: '12px' }}>{q.created_date}</td>
              </tr>
            ))}
            {filteredQuestions.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '12px', textAlign: 'center', color: 'gray' }}>
                  No questions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button
            onClick={()=>downloadPDF(selectedQuestions)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3A2D7D',
              color: '#fff',
              fontSize: '16px',
              border: 'none',
              borderRadius: '6px',
            }}
          >
            Download Selected Questions PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionBankTable;
