import React from 'react';

const SpecialProjectReport = () => {
  const sampleData = [
    {
      projectName: 'Solar Energy Model',
      studentName: 'Anaya Sharma',
      subject: 'Science',
      standard: '8th',
      schoolName: 'Sunrise Public School',
      guidance: 'Mrs. Verma',
      creationDate: '2025-03-10',
      submissionDate: '2025-03-25',
    },
    {
      projectName: 'Smart Waste Bin',
      studentName: 'Rohan Mehta',
      subject: 'Environmental Studies',
      standard: '9th',
      schoolName: 'Green Valley School',
      guidance: 'Mr. Singh',
      creationDate: '2025-03-15',
      submissionDate: '2025-03-30',
    },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f5f5f5', height: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex',  alignItems: 'center' }}>
        <div style={{width:'45%'}}>

        <h2 style={{ color: 'orange', margin: 0 ,alignSelf:'flex-start'}}>Special Project Report</h2>
        </div>
          <p style={{ margin: 0, fontWeight: 'bold' }}>School Name</p>
          <p style={{ marginLeft: 20, fontWeight: 'bold' }}>Standard</p>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', marginTop: '30px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr>
              {['Project Name', 'Student Name', 'Subject', 'Standard', 'School Name', 'Guidance', 'Creation Date', 'Submission Date'].map((header) => (
                <th key={header} style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: '600' }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sampleData.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>{item.projectName}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>{item.studentName}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>{item.subject}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>{item.standard}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>{item.schoolName}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>{item.guidance}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>{item.creationDate}</td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>{item.submissionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save Button */}
      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
        <button
          style={{
            backgroundColor: '#1c125b',
            color: 'white',
            padding: '10px 24px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SpecialProjectReport;
