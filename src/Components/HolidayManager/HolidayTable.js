import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import '../Reports/StudentReportPage.css';

const HolidayTablePage = () => {
  const [holidays, setHolidays] = useState([
    {
      date: "15 August 2025",
      type: "Event",
      description: "Independence day",
      school: "Eduonix School",
    },
    {
      date: "27 August 2025",
      type: "Holiday",
      description: "Ganesh Chaturthi",
      school: "Eduonix School",
    },
  ]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleRowClick = (index) => {
    setSelectedRow(index);
    setEditData({ ...holidays[index] });
  };

  const handleEditClick = () => {
    if (selectedRow !== null) {
      setIsEditing(true);
    }
  };

  const handleSaveClick = () => {
    const updatedHolidays = [...holidays];
    updatedHolidays[selectedRow] = editData;
    setHolidays(updatedHolidays);
    setIsEditing(false);
    setSelectedRow(null);
  };

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteClick = () => {
    if (selectedRow !== null) {
      const updatedHolidays = holidays.filter(
        (_, index) => index !== selectedRow
      );
      setHolidays(updatedHolidays);
      setSelectedRow(null);
    }
  };

  const filteredHolidays = holidays.filter(
    (holiday) =>
      holiday.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      holiday.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      holiday.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      holiday.school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ width: "100%" }}>
      <div
       className="header-container"
      >
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
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
          paddingTop: "20px",
          backgroundColor: "#fefeff",
          minHeight: "100vh",
        }}
      >
        {/* Table Section */}
        <h2 style={{ color: "orangered", marginBottom: "20px" }}>
          School Holidays
        </h2>
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.05)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
                <th style={{ padding: "10px 5px" }}>Date</th>
                <th style={{ padding: "10px 5px" }}>Type</th>
                <th style={{ padding: "10px 5px" }}>Description</th>
                <th style={{ padding: "10px 5px" }}>School Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredHolidays.map((holiday, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(index)}
                  style={{
                    backgroundColor:
                      selectedRow === index ? "#e0e0ff" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <td
                    style={{
                      padding: "10px 5px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {isEditing && selectedRow === index ? (
                      <input
                        type="text"
                        value={editData.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                        style={{ width: "90%" }}
                      />
                    ) : (
                      holiday.date
                    )}
                  </td>
                  <td
                    style={{
                      padding: "10px 5px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {isEditing && selectedRow === index ? (
                      <input
                        type="text"
                        value={editData.type}
                        onChange={(e) => handleChange("type", e.target.value)}
                        style={{ width: "90%" }}
                      />
                    ) : (
                      holiday.type
                    )}
                  </td>
                  <td
                    style={{
                      padding: "10px 5px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {isEditing && selectedRow === index ? (
                      <input
                        type="text"
                        value={editData.description}
                        onChange={(e) =>
                          handleChange("description", e.target.value)
                        }
                        style={{ width: "90%" }}
                      />
                    ) : (
                      holiday.description
                    )}
                  </td>
                  <td
                    style={{
                      padding: "10px 5px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {isEditing && selectedRow === index ? (
                      <input
                        type="text"
                        value={editData.school}
                        onChange={(e) => handleChange("school", e.target.value)}
                        style={{ width: "90%" }}
                      />
                    ) : (
                      holiday.school
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {isEditing ? (
              <button
                onClick={handleSaveClick}
                style={{
                  padding: "10px 40px",
                  borderRadius: "17px",
                  border: "none",
                  backgroundColor: "#2e2eaa",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                style={{
                  padding: "10px 40px",
                  borderRadius: "17px",
                  border: "none",
                  backgroundColor: "#2e2eaa",
                  color: "white",
                  fontWeight: "bold",
                }}
                disabled={selectedRow === null}
              >
                Edit
              </button>
            )}
            <button
              onClick={handleDeleteClick}
              style={{
                padding: "10px 40px",
                borderRadius: "17px",
                border: "none",
                backgroundColor: "#2e2eaa",
                color: "white",
                fontWeight: "bold",
              }}
              disabled={selectedRow === null}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayTablePage;
