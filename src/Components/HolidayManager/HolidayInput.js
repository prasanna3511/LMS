import React, { useState } from 'react';

const App = () => {
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [holidays, setHolidays] = useState([
    { date: '15 August 2025', type: 'Event', description: 'Independence day' },
    { date: '27 August 2025', type: 'Holiday', description: 'Ganesh Chaturthi' },
  ]);

  const handleSave = () => {
    if (date && type && description) {
      const newHoliday = { date, type, description };
      setHolidays([...holidays, newHoliday]);
      setDate('');
      setType('');
      setDescription('');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#fefeff', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Eduonix™ Dashboard</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            style={{ padding: '8px 12px', borderRadius: '20px', border: '1px solid #ccc', width: '200px' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="https://via.placeholder.com/40" alt="Profile" style={{ borderRadius: '50%' }} />
            <div>
              <div>Bhavin</div>
              <div style={{ fontSize: '12px', color: 'gray' }}>Admin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Form Section */}
        <div style={{ width: '50%' }}>
          <h2 style={{ color: 'orangered', marginBottom: '20px' }}>Create Holidays</h2>
          <div style={{ marginBottom: '20px' }}>
            <label>Date</label><br />
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: '300px', padding: '10px', borderRadius: '15px', border: '1px solid #ccc', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Type</label><br />
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ width: '300px', padding: '10px', borderRadius: '15px', border: '1px solid #ccc', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Description</label><br />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              style={{ width: '95%', padding: '15px', borderRadius: '15px', border: '1px solid #ccc', marginTop: '5px' }}
            ></textarea>
          </div>
          <button
            onClick={handleSave}
            style={{ padding: '10px 40px', backgroundColor: '#2e2eaa', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold' }}
          >
            Save
          </button>
        </div>

        {/* Table Section */}
        <div style={{ width: '45%' }}>
          <h3 style={{ color: 'navy', marginBottom: '10px' }}>Previous Holidays</h3>
          <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>
                  <th style={{ padding: '10px 5px' }}>Date</th>
                  <th style={{ padding: '10px 5px' }}>Type</th>
                  <th style={{ padding: '10px 5px' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {holidays.map((holiday, index) => (
                  <tr key={index}>
                    <td style={{ padding: '10px 5px', borderBottom: '1px solid #eee' }}>{holiday.date}</td>
                    <td style={{ padding: '10px 5px', borderBottom: '1px solid #eee' }}>{holiday.type}</td>
                    <td style={{ padding: '10px 5px', borderBottom: '1px solid #eee' }}>{holiday.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
              <button style={{ padding: '10px 30px', borderRadius: '15px', border: 'none', backgroundColor: '#2e2eaa', color: 'white', fontWeight: 'bold' }}>Edit</button>
              <button style={{ padding: '10px 30px', borderRadius: '15px', border: 'none', backgroundColor: '#2e2eaa', color: 'white', fontWeight: 'bold' }}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;