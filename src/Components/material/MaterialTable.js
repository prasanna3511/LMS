import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import apiRequest from '../../utils/apiRequest';

const initialData = [
  {
    id: 1,
    purDate: '2025-04-20',
    particular: 'Wooden Desk',
    type: 'Furniture',
    quantity: 5,
    rate: 1500,
    billAmount: 7500,
    orderBy: 'Mr. Sharma',
    schoolName: 'Green Valley High School',
  },
  {
    id: 2,
    purDate: '2025-04-18',
    particular: 'Whiteboard Marker',
    type: 'Stationery',
    quantity: 20,
    rate: 30,
    billAmount: 600,
    orderBy: 'Mrs. Kapoor',
    schoolName: 'Sunshine Public School',
  },
];

const MaterialsTable = () => {
  const [data, setData] = useState(initialData);
  const [selectedId, setSelectedId] = useState(null);
  const [editData, setEditData] = useState(null);

  const handleRowClick = (id) => {
    setSelectedId(id);
  };

  const handleDelete = async () => {
    if (selectedId === null) return;
  
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;
  
    try {
      const result = await apiRequest({
        endpoint: "materials/deletemateial.php", // Adjust path if needed
        method: "POST",
        data: { id: selectedId },
      });
  
      if (result.status === "success") {
        setData(data.filter(item => item.id !== selectedId));
        setSelectedId(null);
        setEditData(null);
        alert("Deleted successfully!");
      } else {
        alert(result.message || "Delete failed.");
      }
    } catch (err) {
      alert(err.message || "Something went wrong during deletion.");
    }
  };
  

  const handleEdit = () => {
    const selectedItem = data.find(item => item.id === selectedId);
    if (selectedItem) {
      setEditData({ ...selectedItem });
    }
  };

  const handleChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  // const handleSave = () => {
  //   setData(data.map(item => (item.id === editData.id ? editData : item)));
  //   setSelectedId(null);
  //   setEditData(null);
  // };
  const handleSave = async () => {
    try {
      const payload = {
        id: editData.id,
        purchase_date: editData.purDate,
        particular: editData.particular,
        type: editData.type,
        quantities: editData.quantity,
        rate: editData.rate,
        bill_amount: editData.billAmount,
        order_by: editData.orderBy,
        school_name: editData.schoolName,
      };
  
      const result = await apiRequest({
        endpoint: "materials/updatematerial.php", // Adjust path if needed
        method: "POST",
        data: payload,
      });
  
      if (result.status === "success") {
        const updatedData = data.map(item =>
          item.id === editData.id ? editData : item
        );
        setData(updatedData);
        setSelectedId(null);
        setEditData(null);
        alert("Updated successfully!");
      } else {
        alert(result.message || "Update failed.");
      }
    } catch (err) {
      alert(err.message || "Something went wrong during update.");
    }
  };
  

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const result = await apiRequest({
          endpoint: "materials/getallschoolmaterial.php",
          method: "GET",
          data: {},
        });

        if (result.status === "success") {
          // alert("Session creation completed");
          const transformedData = result.data.map((item) => ({
            id: parseInt(item.id),
            purDate: item.purchase_date === "0000-00-00" ? "" : item.purchase_date,
            particular: item.particular,
            type: item.type,
            quantity: parseInt(item.quantities),
            rate: parseFloat(item.rate),
            billAmount: parseFloat(item.bill_amount),
            orderBy: item.order_by,
            schoolName: item.school_name,
          }));
          setData(transformedData);
          console.log("result", result);
          // navigate("/dashboard");
        } else {
          alert(result.message || "Session creation failed");
        }
      } catch (err) {
        alert(err.message || "Something went wrong");
      }
    };
    fetchSchoolData();
  }, []);

  return (
    <>
      <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>

<Navbar/>
</div>
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' ,marginTop:20}}>

      <h2 style={{ color: '#F75F00', marginBottom: '20px' }}>Materials and Furnitures</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5', color: '#333', textAlign: 'left' }}>
            <th style={thStyle}>Pur. Date</th>
            <th style={thStyle}>Particular</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Quantity</th>
            <th style={thStyle}>Rate</th>
            <th style={thStyle}>Bill Amount</th>
            <th style={thStyle}>Order By</th>
            <th style={thStyle}>School Name</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>No data available</td>
            </tr>
          ) : (
            data.map(item => {
              const isEditing = item.id === editData?.id;

              return (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(item.id)}
                  style={{
                    backgroundColor: item.id === selectedId ? '#e6f0ff' : '',
                    cursor: 'pointer'
                  }}
                >
                  {isEditing ? (
                    <>
                      <td style={tdStyle}><input type="date" value={editData.purDate} onChange={(e) => handleChange(e, 'purDate')} style={inputStyle} /></td>
                      <td style={tdStyle}><input value={editData.particular} onChange={(e) => handleChange(e, 'particular')} style={inputStyle} /></td>
                      <td style={tdStyle}><input value={editData.type} onChange={(e) => handleChange(e, 'type')} style={inputStyle} /></td>
                      <td style={tdStyle}><input type="number" value={editData.quantity} onChange={(e) => handleChange(e, 'quantity')} style={inputStyle} /></td>
                      <td style={tdStyle}><input type="number" value={editData.rate} onChange={(e) => handleChange(e, 'rate')} style={inputStyle} /></td>
                      <td style={tdStyle}><input type="number" value={editData.billAmount} onChange={(e) => handleChange(e, 'billAmount')} style={inputStyle} /></td>
                      <td style={tdStyle}><input value={editData.orderBy} onChange={(e) => handleChange(e, 'orderBy')} style={inputStyle} /></td>
                      <td style={tdStyle}><input value={editData.schoolName} onChange={(e) => handleChange(e, 'schoolName')} style={inputStyle} /></td>
                    </>
                  ) : (
                    <>
                      <td style={tdStyle}>{item.purDate}</td>
                      <td style={tdStyle}>{item.particular}</td>
                      <td style={tdStyle}>{item.type}</td>
                      <td style={tdStyle}>{item.quantity}</td>
                      <td style={tdStyle}>{item.rate}</td>
                      <td style={tdStyle}>{item.billAmount}</td>
                      <td style={tdStyle}>{item.orderBy}</td>
                      <td style={tdStyle}>{item.schoolName}</td>
                    </>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
        {editData ? (
          <button onClick={handleSave} style={btnStyle('#0f5132')}> Save</button>
        ) : (
          <button onClick={handleEdit} disabled={selectedId === null} style={btnStyle(selectedId ? '#2e2260' : '#ccc')}>Edit</button>
        )}
        <button onClick={handleDelete} disabled={selectedId === null} style={btnStyle(selectedId ? '#2e2260' : '#ccc')}>Delete</button>
      </div>
    </div>
    </>

  );
};

const thStyle = {
  padding: '12px',
  borderBottom: '2px solid #ddd',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #eee',
};

const inputStyle = {
  width: '100%',
  padding: '6px 10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
};

const btnStyle = (bgColor) => ({
  padding: '10px 24px',
  backgroundColor: bgColor,
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: bgColor === '#ccc' ? 'not-allowed' : 'pointer',
  fontWeight: 'bold',
  fontSize: '14px',
});

export default MaterialsTable;
