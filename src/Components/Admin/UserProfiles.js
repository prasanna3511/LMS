import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';

const UserProfilesTable = () => {
  const [users, setUsers] = useState([
    {
      name: 'John Doe',
      password: '********',
      role: 'Teacher',
      createdBy: 'Admin',
      std: '10',
      schoolName: 'Sunrise School',
      registrationDate: '2024-04-15'
    },
    {
      name: 'Jane Smith',
      password: '********',
      role: 'Student',
      createdBy: 'Admin',
      std: '9',
      schoolName: 'Green Valley High',
      registrationDate: '2024-04-18'
    }
  ]);

  const [search, setSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const handleCheckboxChange = (index) => {
    const isSelected = selectedRows.includes(index);
    const updatedSelection = isSelected
      ? selectedRows.filter(i => i !== index)
      : [...selectedRows, index];
    setSelectedRows(updatedSelection);
  };

  const handleInputChange = (index, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[index][field] = value;
    setUsers(updatedUsers);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleDeleteClick = () => {
    const newUsers = users.filter((_, index) => !selectedRows.includes(index));
    setUsers(newUsers);
    setSelectedRows([]);
    setEditMode(false);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{width:'100%'}} >
    <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
    <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '8px 12px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '17px', marginRight: '20px', width: '250px' }}
          />
   
<Navbar/>
</div>
    <div style={{ paddingTop: '30px', fontFamily: 'Arial, sans-serif', width: '90%' }}>
      {/* Top bar */}

      <h2 style={{ color: '#F75F00' }}>User profiles</h2>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#f8f8f8', borderRadius: '8px', overflow: 'hidden' }}>
        <thead style={{ backgroundColor: '#e6e6e6', textAlign: 'left' }}>
          <tr>
            <th style={{ padding: '12px' }}>Select</th>
            <th style={{ padding: '12px' }}>Name</th>
            <th style={{ padding: '12px' }}>Password</th>
            <th style={{ padding: '12px' }}>Role</th>
            <th style={{ padding: '12px' }}>Created by</th>
            <th style={{ padding: '12px' }}>Std</th>
            <th style={{ padding: '12px' }}>School Name</th>
            <th style={{ padding: '12px' }}>Registration Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => {
            const isSelected = selectedRows.includes(index);
            const isEditable = isSelected && editMode;
            return (
              <tr key={index}>
                <td style={{ padding: '12px' }}>
                  <input type="checkbox" checked={isSelected} onChange={() => handleCheckboxChange(index)} />
                </td>
                {['name', 'password', 'role', 'createdBy', 'std', 'schoolName', 'registrationDate'].map((field) => (
                  <td key={field} style={{ padding: '12px' }}>
                    {isEditable ? (
                      <input
                        type="text"
                        value={user[field]}
                        onChange={(e) => handleInputChange(index, field, e.target.value)}
                        style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    ) : (
                      user[field]
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Buttons */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button
          onClick={handleEditClick}
          style={{
            padding: '10px 24px',
            backgroundColor: '#3A2D7D',
            color: '#fff',
            fontSize: '16px',
            border: 'none',
            borderRadius: 17,
            marginRight: '20px',
            width:100
          }}
        >
          Edit
        </button>
        <button
          onClick={handleDeleteClick}
          style={{
            padding: '10px 24px',
            backgroundColor: '#3A2D7D',
            color: '#fff',
            fontSize: '16px',
            border: 'none',
            borderRadius: 17,
            width:100

          }}
        >
          Delete
        </button>
      </div>
    </div>
    </div>
  );
};

export default UserProfilesTable;
