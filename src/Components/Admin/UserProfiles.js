import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import '../Reports/StudentReportPage.css';
import apiRequest from '../../utils/apiRequest';

const UserProfilesTable = () => {
  const [users, setUsers] = useState([]);

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

  const fetchAllUsers = async () => {
    const res = await apiRequest({
      endpoint: 'users/getallusers.php', // your actual PHP file
      method: 'POST',
      data:{}
    });
    if (res.status === 'success') {
      console.log("res : ",res.data)
      const transformedUsers = res.data.map(user => ({
        id: user.id,
        name: user.full_name,
        password: '********', // placeholder since password is not in the API
        role: user.role,
        createdBy: 'Admin', // hardcoded or derive if available
        std: user.grade,
        schoolName: user.school_name,
        registrationDate: user.date_of_joining || 'N/A'
      }));
      setUsers(transformedUsers);
      // setHolidays(res.data);
    } else {
      console.error(res.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  const handleEditClick = async () => {
    for (const index of selectedRows) {
      const user = users[index];
      const res = await apiRequest({
        endpoint: 'users/updateuser.php',
        method: 'POST',
        data: {
          id: user.id,
          full_name: user.name,
          role: user.role,
          grade: user.std,
          date_of_joining: user.registrationDate === 'N/A' ? null : user.registrationDate
        }
      });
      if (res.status !== 'success') {
        console.error(`Failed to update user ${user.name}: ${res.message}`);
      }
    }
    setEditMode(false);
    await fetchAllUsers();
  };
  const handleEdit = ()=>{
    setEditMode(true);

  }
  

  // const handleDeleteClick = () => {
  //   const newUsers = users.filter((_, index) => !selectedRows.includes(index));
  //   setUsers(newUsers);
  //   setSelectedRows([]);
  //   setEditMode(false);
  // };
  const handleDeleteClick = async () => {
    for (const index of selectedRows) {
      const user = users[index];
      const res = await apiRequest({
        endpoint: 'users/deleteuser.php',
        method: 'POST',
        data: { id: user.id }
      });
      if (res.status !== 'success') {
        console.error(`Failed to delete user ${user.name}: ${res.message}`);
      }
    }
    setSelectedRows([]);
    setEditMode(false);
    await fetchAllUsers();
  };
  const roleOptions = ['student', 'teacher', 'admin'];
  const stdOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{width:'100%'}} >
    <div className="header-container">
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
        {/* <tbody>
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
        </tbody> */}
         <tbody>
            {filteredUsers.map((user, index) => {
              const isSelected = selectedRows.includes(index);
              const isEditable = isSelected && editMode;
              return (
                <tr key={index}>
                  <td style={{ padding: '12px' }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>

                  {/* Name (editable) */}
                  <td style={{ padding: '12px' }}>
                    {isEditable ? (
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    ) : (
                      user.name
                    )}
                  </td>

                  {/* Password (non-editable) */}
                  <td style={{ padding: '12px' }}>{user.password}</td>

                  {/* Role (editable dropdown) */}
                  <td style={{ padding: '12px' }}>
                    {isEditable ? (
                      <select
                        value={user.role}
                        onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                        style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
                      >
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>

                  {/* Created By (non-editable) */}
                  <td style={{ padding: '12px' }}>{user.createdBy}</td>

                  {/* Std (editable dropdown) */}
                  <td style={{ padding: '12px' }}>
                    {isEditable ? (
                      <select
                        value={user.std}
                        onChange={(e) => handleInputChange(index, 'std', e.target.value)}
                        style={{ padding: '6px', border: '1px solid #ccc', borderRadius: '4px' }}
                      >
                        {stdOptions.map((std) => (
                          <option key={std} value={std}>{std}</option>
                        ))}
                      </select>
                    ) : (
                      user.std
                    )}
                  </td>

                  {/* School Name (non-editable) */}
                  <td style={{ padding: '12px' }}>{user.schoolName}</td>

                  {/* Registration Date (non-editable) */}
                  <td style={{ padding: '12px' }}>{user.registrationDate}</td>
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
          Save
        </button>
        <button
          onClick={handleEdit}
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
