import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import apiRequest from "../../utils/apiRequest"; // Adjust path as needed
import "./HolidayInput.css";

const App = () => {
  const [date, setDate] = useState(null);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [holidays, setHolidays] = useState([]);
  const [errors, setErrors] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSchools, setSelectedSchools] = useState([]);

  const school_id = JSON.parse(localStorage.getItem("userData")); // replace with dynamic ID if needed
  const status = "active"; // or whatever value your backend expects
  const validateForm = () => {
    const newErrors = {};

    if (!date) newErrors.date = "Date is required";
    if (!type.trim()) newErrors.type = "Type is required";
    if (!description.trim()) newErrors.description = "Description is required";
    else if (description.length < 5)
      newErrors.description = "Description should be at least 5 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const fetchHolidays = async () => {
    const res = await apiRequest({
      endpoint: "holidays/getholidaybyschoolid.php", // your actual PHP file
      method: "POST",
      data:
        school_id.role === "admin"
          ? {}
          : {
              school_id: school_id.school_id,
            },
    });
    if (res.status === "success") {
      console.log("res : ", res.data);
      setHolidays(res.data);
    } else {
      console.error(res.message);
    }
  };
  const [getAllSchool , setGetAllSchool]=useState([])
  const fetchSchoolData = async()=>{
    try {
      const result = await apiRequest({
        endpoint: "school/getallschool.php",
        method: "GET",
        data: {},
      });
  
      if (result.status === "success") {
        // alert("Session creation completed");
        setGetAllSchool(result.data)
        console.log("result",result)
        // navigate("/dashboard");
      } else {
        alert(result.message || "Session creation failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  }
  useEffect(() => {
    fetchHolidays();
    fetchSchoolData()
  }, []);

  // const handleSave = async () => {
  //   if (!validateForm()) return;
  //   console.log(date, type, description);
  //   if (date && type && description) {
  //     const res = await apiRequest({
  //       endpoint: "holidays/addholiday.php", // your actual PHP file
  //       method: "POST",
  //       data: {
  //         date,
  //         type,
  //         description,
  //         status: "active", // or whatever your default is
  //         school_id: school_id.school_id,
  //       },
  //     });
  //     if (res.status === "success") {
  //       setDate("");
  //       setType("");
  //       setDescription("");
  //       fetchHolidays(); // Refresh the list
  //     } else {
  //       alert("Failed to add holiday: " + res.message);
  //     }
  //   }
  // };
  const handleSave = async () => {
    if (!validateForm()) return;
  
    const payloadTemplate = {
      date,
      type,
      description,
      status: "active",
    };
  
    let targetSchoolIds = [];
  
    if (school_id.role === "admin") {
      if (selectedSchools.length === 0) {
        alert("Please select at least one school.");
        return;
      }
      targetSchoolIds = selectedSchools;
    } else {
      targetSchoolIds = [school_id.school_id];
    }
  
    try {
      for (const id of targetSchoolIds) {
        const res = await apiRequest({
          endpoint: "holidays/addholiday.php",
          method: "POST",
          data: {
            ...payloadTemplate,
            school_id: id,
          },
        });
  
        if (res.status !== "success") {
          alert(`Failed to add holiday for school ID ${id}: ${res.message}`);
        }
      }
  
      // Clear fields and refresh list after all calls
      setDate("");
      setType("");
      setDescription("");
      setSelectedSchools([]);
      fetchHolidays();
      alert("Holiday added successfully.");
    } catch (err) {
      alert("An error occurred: " + err.message);
    }
  };
  
  const filteredHolidays = holidays.filter((h) =>
    h.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ width: "100%" }}>
      <div className="top-bar">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          style={{
            padding: "8px 12px",
            borderRadius: "17px",
            border: "1px solid #ccc",
            width: "200px",
          }}
        />

        <Navbar />
      </div>

      <div
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#fefeff",
          minHeight: "96vh",
        }}
      >
        <div className="layout-container">
          <div style={{ width: "50%" }}>
            <h2 style={{ color: "orangered", marginBottom: "20px" }}>
              Create Holidays
            </h2>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ marginBottom: "20px" }}>
                <label>Date</label>
                <br />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: "200px",
                    padding: "10px",
                    borderRadius: "15px",
                    border: "1px solid #ccc",
                    marginTop: "5px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px", marginLeft: 30 }}>
                <label>Type</label>
                <br />
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  style={{
                    width: "200px",
                    padding: "10px",
                    borderRadius: "15px",
                    border: "1px solid #ccc",
                    marginTop: "5px",
                  }}
                />
                {errors.type && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {errors.type}
                  </div>
                )}
              </div>
              {school_id.role === 'admin' && <div style={{ marginBottom: "20px", marginLeft: 30 }}>
              <label> {selectedSchools.length === 0
                  ? "Select School(s)"
                  : `${selectedSchools.length} selected`}</label>
                <br />
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  width: "100px",
                  padding: "10px",
                  borderRadius: "15px",
                  border: "1px solid #ccc",
                  marginTop: "5px",
                  height:15
                }}
              >
                School's
              </div>
               {dropdownOpen && (
    <div style={{
      position: 'absolute',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '10px',
      marginTop: 5,
      maxHeight: 200,
      overflowY: 'auto',
      zIndex: 1000,
      width: '20%',
      padding: '10px'
    }}>
      {getAllSchool.map((school) => (
        <div key={school.id}>
          <label>
            <input
              type="checkbox"
              value={school.id}
              checked={selectedSchools.includes(school.id)}
              onChange={(e) => {
                const checked = e.target.checked;
                setSelectedSchools((prev) =>
                  checked ? [...prev, school.id] : prev.filter((id) => id !== school.id)
                );
              }}
            />
            {' '}
            {school.school_name}
          </label>
        </div>
      ))}
    </div>
  )}
              </div>}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label>Description</label>
              <br />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                style={{
                  width: "95%",
                  padding: "15px",
                  borderRadius: "15px",
                  border: "1px solid #ccc",
                  marginTop: "5px",
                }}
              ></textarea>
              {errors.description && (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {errors.description}
                </div>
              )}
            </div>
            <button
              onClick={handleSave}
              style={{
                padding: "10px 40px",
                backgroundColor: "#2e2eaa",
                color: "white",
                border: "none",
                borderRadius: "15px",
                fontWeight: "bold",
              }}
            >
              Save
            </button>
          </div>

          <div style={{ width: "35%" }}>
            <h3 style={{ color: "navy", marginBottom: "10px" }}>
              Previous Holidays
            </h3>
            <div
              style={{
                backgroundColor: "#f9f9f9",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                minHeight: 200,
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      textAlign: "left",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    <th style={{ padding: "10px 5px", fontSize: 13 }}>Date</th>
                    <th style={{ padding: "10px 5px", fontSize: 13 }}>Type</th>
                    <th style={{ padding: "10px 5px", fontSize: 13 }}>
                      Description
                    </th>
                    {school_id.role === "admin" && (
                      <th style={{ padding: "10px 5px", fontSize: 13 }}>
                        School Name
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredHolidays.map((holiday, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          padding: "10px 5px",
                          borderBottom: "1px solid #eee",
                          fontSize: 13,
                        }}
                      >
                        {holiday.date}
                      </td>
                      <td
                        style={{
                          padding: "10px 5px",
                          borderBottom: "1px solid #eee",
                          fontSize: 13,
                        }}
                      >
                        {holiday.type}
                      </td>
                      <td
                        style={{
                          padding: "10px 5px",
                          borderBottom: "1px solid #eee",
                          fontSize: 13,
                        }}
                      >
                        {holiday.description}
                      </td>
                      {school_id.role === "admin" && (
                        <td
                          style={{
                            padding: "10px 5px",
                            borderBottom: "1px solid #eee",
                            fontSize: 13,
                          }}
                        >
                          {holiday.school_name}
                        </td>
                      )}
                    </tr>
                  ))}
                  {filteredHolidays.length === 0 && (
                    <tr>
                      <td
                        colSpan="3"
                        style={{
                          padding: "10px",
                          textAlign: "center",
                          color: "gray",
                        }}
                      >
                        No holidays found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
