import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './MaterialAndFurnituresForm.css';


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
    <div style={{ display: 'flex', height: '100vh' ,flexDirection:'column'}}>
      {/* Main Content */}
        <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>

       <Navbar/>
      </div>
      <div style={{ flex: 1, paddingTop: '40px', position: 'relative' }}>
        {/* Top-right profile */}

        {/* Form Title */}
        <h2 style={{ color: '#F75F00' }}>Material and Furnitures</h2>

        {/* Form */}
        <form
          onSubmit={handleSave}
          className="material-form"
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
