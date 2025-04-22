import React, { useState } from 'react';

const MaterialAndFurnituresForm = ({setRole}) => {
  const [formData, setFormData] = useState({
    purchaseDate: '',
    particular: '',
    type: '',
    quantities: '',
    rate: '',
    orderBy: '',
    totalBillAmount: '',
    schoolName: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setRole('materialtable')
    console.log('Form Data:', formData);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', position: 'relative' }}>
        {/* Top-right profile */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{
            background: '#e2e4fb',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>🔔</span>
          <div>
            <strong>Bhavin</strong><br />
            <span style={{ fontSize: '12px', color: '#888' }}>Admin</span>
          </div>
        </div>

        {/* Form Title */}
        <h2 style={{ color: '#ff7e1d' }}>Material and Furnitures</h2>

        {/* Form */}
        <form
          onSubmit={handleSave}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            maxWidth: '900px',
            marginTop: '30px'
          }}
        >
          <div>
            <label>Purchase Date</label><br />
            <input
              type="text"
              value={formData.purchaseDate}
              onChange={e => handleChange('purchaseDate', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label>Particular</label><br />
            <input
              type="text"
              value={formData.particular}
              onChange={e => handleChange('particular', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label>Type</label><br />
            <input
              type="text"
              value={formData.type}
              onChange={e => handleChange('type', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label>Quantities</label><br />
            <input
              type="text"
              value={formData.quantities}
              onChange={e => handleChange('quantities', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label>Rate</label><br />
            <input
              type="text"
              value={formData.rate}
              onChange={e => handleChange('rate', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label>Order By</label><br />
            <input
              type="text"
              value={formData.orderBy}
              onChange={e => handleChange('orderBy', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label>Total Bill Amount</label><br />
            <input
              type="text"
              value={formData.totalBillAmount}
              onChange={e => handleChange('totalBillAmount', e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label>School Name</label><br />
            <input
              type="text"
              value={formData.schoolName}
              onChange={e => handleChange('schoolName', e.target.value)}
              style={inputStyle}
            />
          </div>
        </form>

        {/* Save Button */}
        <div style={{ marginTop: '40px' ,width:'100%',display:'flex', justifyContent:'center'}}>
          <button
            onClick={handleSave}
            style={{
              backgroundColor: '#1a1a56',
              color: '#fff',
              border: 'none',
              borderRadius: '20px',
              padding: '10px 0',
              fontSize: '16px',
              cursor: 'pointer',
              width:150
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '90%',
  padding: '10px 15px',
  borderRadius: '20px',
  border: '1px solid #ccc',
  marginTop: '5px'
};

export default MaterialAndFurnituresForm;
