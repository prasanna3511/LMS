import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "../Reports/StudentReportPage.css";
import apiRequest from "../../utils/apiRequest";

const ViewTestPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTests, setFilteredTests] = useState([]);
  const [subject, setSubject] = useState("");
  const [allSubjects, setAllSubjects] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [standard, setStandard] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData"));
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
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = totalData.filter((test) =>
      test.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTests(filtered);
  };
  const handleDelete = async(indexToDelete ,test) => {
    const updatedTests = filteredTests.filter(
      (_, index) => index !== indexToDelete
    );
    try {
      const result = await apiRequest({
        endpoint: "createQuestionPapername/deleteQuestionPaper.php",
        method: "POST",
        data: {id:test.id},
      });
  
      if (result.status === "success") {
        alert('Test Deleted')
        getQuestionPaperName()
        // navigate("/dashboard");
      } else {
        // alert(result.message || "Session creation failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
    // setFilteredTests(updatedTests);
  };
  useEffect(() => {
    const filtered = totalData.filter((test) => {
      const nameMatch = test.name.toLowerCase().includes(searchTerm.toLowerCase());
  
      const subjectMatch = subject
        ? test.test_papers?.[0]?.subject === subject
        : true;
  
      const standardMatch = standard
        ? test.test_papers?.[0]?.standard?.toString() === standard.toString()
        : true;
  
      return nameMatch && subjectMatch && standardMatch;
    });
  
    setFilteredTests(filtered);
  }, [searchTerm, subject, standard, totalData]);
  
  useEffect(() => {
    getQuestionPaperName();
  }, []);
  const getQuestionPaperName = async () => {
    const payload = {
      // name:enterTestName,
      school_id: Number(userData.school_id),
    };

    try {
      const result = await apiRequest({
        endpoint: "createQuestionPapername/getquestionpaperName.php",
        method: "POST",
        data: userData.role === "admin" ? {} : payload,
      });

      if (result.status !== "success") {
        alert("Failed to save a question: " + result.message);
        return;
      }
      console.log("result data : ", result.data);
      // return result.data.id
      setFilteredTests(result.data);
      setTotalData(result.data);
    } catch (err) {
      alert("Save failed: " + err.message);
      return;
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="header-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "17px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />

        <Navbar />
      </div>
      <div style={{ paddingTop: "30px", fontFamily: "sans-serif" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <h2 style={{ color: "#F75F00", marginRight: "30px" }}>View Test</h2>
          <div style={{ display: "flex", gap: "20px" }}>
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

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#f8f8f8",
            borderRadius: "10px",
          }}
        >
          <thead
            style={{
              backgroundColor: "#e6e6e6",
              textAlign: "left",
              borderRadius: 20,
            }}
          >
            <tr
              style={{
                textAlign: "left",
                backgroundColor: "#f5f5f5",
                borderRadius: 20,
              }}
            >
              <th style={{ padding: "12px" }}>Test Name</th>
              <th style={{ padding: "12px" }}>Date</th>
              <th style={{ padding: "12px" }}>Subject</th>
              <th style={{ padding: "12px" }}>Standard</th>
              <th style={{ padding: "12px" }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredTests.length > 0 &&
              filteredTests.map((test, index) => (
                <tr key={index}>
                  <td style={{ padding: "12px" }}>{test.name}</td>
                  <td style={{ padding: "12px" }}>{test.date}</td>
                  {test.test_papers && (
                    <td style={{ padding: "12px" }}>
                      {test?.test_papers[0]?.subject}
                    </td>
                  )}
                  {test.test_papers && (
                    <td style={{ padding: "12px" }}>
                      {test?.test_papers[0]?.standard}
                    </td>
                  )}
                  <td style={{ padding: "12px" }}>
                    {/* <button style={buttonStyle}>Edit</button> */}
                    <button
                      onClick={() => handleDelete(index , test)}
                      style={buttonStyle}
                    >
                      Delete
                    </button>
                    <button style={buttonStyle}>Download</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#241F63",
  color: "white",
  padding: "8px 16px",
  marginRight: "10px",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  width: 100,
};

// ✅ Dummy Test Data
const testData = [
  {
    name: "Midterm 1",
    date: "2024-05-12",
    subject: "Math",
    standard: "8th",
  },
  {
    name: "Final Exam",
    date: "2024-12-01",
    subject: "Science",
    standard: "9th",
  },
];

export default ViewTestPage;
