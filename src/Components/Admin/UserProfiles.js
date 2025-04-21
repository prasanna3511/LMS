import React from 'react';

const UserProfilesTable = () => {
  const users = [
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
  ];

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif',width:'90%' }}>
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px',width:'100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width:'100%' }}>
          <input type="text" placeholder="Search by name" style={{ padding: '8px 12px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '20px', marginRight: '20px' }} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="https://via.placeholder.com/40" alt="Profile" style={{ borderRadius: '50%', marginRight: '10px' }} />
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 'bold' }}>Bhavin</div>
              <div style={{ fontSize: '12px', color: '#888' }}>Admin</div>
            </div>
          </div>
        </div>
      </div>
      <h1 style={{ color: 'orange' }}>User profiles</h1>

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
          {users.map((user, index) => (
            <tr key={index}>
              <td style={{ padding: '12px' }}><input type="checkbox" /></td>
              <td style={{ padding: '12px' }}>{user.name}</td>
              <td style={{ padding: '12px' }}>{user.password}</td>
              <td style={{ padding: '12px' }}>{user.role}</td>
              <td style={{ padding: '12px' }}>{user.createdBy}</td>
              <td style={{ padding: '12px' }}>{user.std}</td>
              <td style={{ padding: '12px' }}>{user.schoolName}</td>
              <td style={{ padding: '12px' }}>{user.registrationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button style={{ padding: '12px 24px', backgroundColor: '#3A2D7D', color: '#fff', fontSize: '16px', border: 'none', borderRadius: 20, marginRight: '20px' }}>
          Edit
        </button>
        <button style={{ padding: '12px 24px', backgroundColor: '#3A2D7D', color: '#fff', fontSize: '16px', border: 'none', borderRadius:20 }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserProfilesTable;