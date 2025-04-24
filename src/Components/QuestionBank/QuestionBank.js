// import React, { useState } from 'react';
// import Navbar from '../Navbar/Navbar';

// const CreateQuestionBank = ({ setRole }) => {
//   const [theoryQuestion, setTheoryQuestion] = useState('');
//   const [practicalQuestion, setPracticalQuestion] = useState('');
//   const [options, setOptions] = useState(['', '', '', '']);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [qType, setQType] = useState('MCQ');

//   const handleOptionChange = (index, value) => {
//     const updated = [...options];
//     updated[index] = value;
//     setOptions(updated);
//   };

//   const handleRadioChange = (index) => {
//     setSelectedOption(index);
//   };
//   const handleQuestionTypeChange = (e) => {
//     console.log("object",e.target.value)
//     setQType(e.target.value);
//   };

//   return (
//     <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
//               <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>

// <Navbar/>

//     </div>
//     <div style={{ paddingTop: '30px', fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: 'space-between' }}>

//       <div style={{ width: '60%' }}>
//         <h2 style={{ color: '#F75F00', marginRight: '20px' }}>Create Question Bank</h2>

//         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//           <div>
//             <label style={{ marginRight: '10px' , fontSize:16,fontWeight:'500'}}>Question Type</label>
//             <select value={qType}
//               onChange={handleQuestionTypeChange} style={{ marginRight: '10px', padding: '8px', fontSize: '14px', backgroundColor: 'white', borderRadius: 15, width: 150 , border: '1px solid #ccc'}}>
//               <option>Select Type</option>
//               <option  >MCQ</option>
//               <option >Theory</option>
//             </select>
//           </div>
//           <div>
//             <label style={{ marginRight: '10px' , fontSize:16,fontWeight:'500'}}>Subject</label>
//             <select style={{ marginRight: '10px', padding: '8px', fontSize: '14px', backgroundColor: 'white', borderRadius: 15, width: 150 , border: '1px solid #ccc'}}>
//               <option>Subject</option>
//               <option>Math</option>
//               <option>Science</option>
//             </select>
//           </div>
//           <div>
//             <label style={{ marginRight: '10px', fontSize:16,fontWeight:'500' }}>Standard</label>
//             <select style={{ padding: '8px', fontSize: '14px', borderRadius: 15, backgroundColor: 'white', width: 150, border: '1px solid #ccc' }}>
//               {/* <option>Select Std</option> */}
//               <option>Class 1</option>
//               <option>Class 2</option>
//             </select>
//           </div>
//         </div>
//         {
//   qType=== 'MCQ'&& <>
//            <div style={{ marginBottom: '10px' }}>
//         <label>Enter Theroy Question</label><br />
//         <input
//           type="text"
//           value={practicalQuestion}
//           onChange={(e) => setPracticalQuestion(e.target.value)}
//           style={{ width: '200px', padding: '10px', borderRadius: '15px', border: '1px solid #ccc', width: '100%',marginTop: '5px' }}
//         />
//       </div>

//         <div style={{ marginBottom: '0px' }}>
//           <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//             {options.map((opt, index) => (
//               <div key={index} style={{ width: '45%', margin: '8px 2.5%' }}>
//                 <label >Option {index + 1}</label>
//                 <input
//                   type="text"
//                   // placeholder={`Option ${index + 1}`}
//                   value={opt}
//                   onChange={(e) => handleOptionChange(index, e.target.value)}
//                   style={{ padding: '8px', width: '80%', borderRadius: 15, border: '1px solid #ccc' }}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//         </>
// }
// {
//   qType === 'Theory'&& 
//         // <div style={{ marginBottom: '20px' }}>
//         //   <label style={{ marginBottom: '5px', display: 'block' , fontSize:16,fontWeight:'700' }}>Practical Question</label>
//         //   <input
//         //     type="text"
//         //     // placeholder="Enter Practical Question"
//             // value={practicalQuestion}
//             // onChange={(e) => setPracticalQuestion(e.target.value)}
//         //     style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '20px', fontSize: '16px', borderRadius: 15 }}
//         //   />
//         // </div>
//         <div style={{ marginBottom: '20px' }}>
//         <label>Practical Question</label><br />
//         <input
//           type="text"
//           value={practicalQuestion}
//           onChange={(e) => setPracticalQuestion(e.target.value)}
//           style={{ width: '200px', padding: '10px', borderRadius: '15px', border: '1px solid #ccc', width: '100%',marginTop: '5px' }}
//         />
//       </div>
//       }

//         <button
//           style={{ padding: '10px 20px', backgroundColor: '#3A2D7D', color: '#fff', border: 'none', borderRadius: '5px' }}
//           onClick={() => { setRole('questionBankTable') }}
//         >
//           Save
//         </button>
//       </div>

//       <div style={{ width: '30%', padding: '20px', backgroundColor: '#f6f6f6', borderRadius: '10px', marginTop: 50 }}>
//         <h3 style={{ marginBottom: '10px' , fontSize:16,fontWeight:'700'}}>Previously Created Questions</h3>
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               <th style={{ textAlign: 'left', padding: '8px', fontSize:14,fontWeight:'600' }}>Name</th>
//               <th style={{ textAlign: 'left', padding: '8px' , fontSize:14,fontWeight:'600'}}>Edit</th>
//               <th style={{ padding: '8px' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td style={{ padding: '8px' , fontSize:12}}>Sample Theory</td>
//               <td style={{ padding: '8px' , fontSize:12}}> ✏️</td>
//               <td style={{ display:'flex',justifyContent:'center' }}>
//                 🗑️
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default CreateQuestionBank;
import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './CreateQuestionBank.css'; // Import the CSS file

const CreateQuestionBank = ({ setRole }) => {
  const [theoryQuestion, setTheoryQuestion] = useState('');
  const [practicalQuestion, setPracticalQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [selectedOption, setSelectedOption] = useState(null);
  const [qType, setQType] = useState('MCQ');

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleRadioChange = (index) => {
    setSelectedOption(index);
  };

  const handleQuestionTypeChange = (e) => {
    setQType(e.target.value);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Navbar />
      </div>

      <h2 style={{ color: '#F75F00', marginRight: '20px' }}>Create Question Bank</h2>

      <div className="responsiveContainer">
        <div className="leftSection">

          <div style={{ display: 'flex', alignItems: 'space-between', marginBottom: '20px' }}>
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ marginRight: '10px', fontSize: 16, fontWeight: '500' }}>Question Type</label>
              <select
                value={qType}
                onChange={handleQuestionTypeChange}
              className="selectDropdown"
              >
                <option>Select Type</option>
                <option>MCQ</option>
                <option>Theory</option>
              </select>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ marginRight: '10px', fontSize: 16, fontWeight: '500' }}>Subject</label>
              <select
              className="selectDropdown"
              >
                <option>Subject</option>
                <option>Math</option>
                <option>Science</option>
              </select>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
              <label style={{ marginRight: '10px', fontSize: 16, fontWeight: '500' }}>Standard</label>
              <select
                style={{
                  padding: '8px',
                  fontSize: '14px',
                  borderRadius: 15,
                  backgroundColor: 'white',
                  width: 120,
                  border: '1px solid #ccc',
                }}
              >
                <option>Class 1</option>
                <option>Class 2</option>
              </select>
            </div>
          </div>

          {qType === 'MCQ' && (
            <>
              <div style={{ marginBottom: '10px' }}>
                <label>Enter Theory Question</label><br />
                <input
                  type="text"
                  value={practicalQuestion}
                  onChange={(e) => setPracticalQuestion(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '15px',
                    border: '1px solid #ccc',
                    width: '100%',
                    marginTop: '5px',
                  }}
                />
              </div>

              <div style={{ marginBottom: '0px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {options.map((opt, index) => (
                    <div key={index} style={{ width: '45%', margin: '8px 2.5%' }}>
                      <label>Option {index + 1}</label>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        style={{
                          padding: '8px',
                          width: '80%',
                          borderRadius: 15,
                          border: '1px solid #ccc',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {qType === 'Theory' && (
            <div style={{ marginBottom: '20px' }}>
              <label>Practical Question</label><br />
              <input
                type="text"
                value={practicalQuestion}
                onChange={(e) => setPracticalQuestion(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '15px',
                  border: '1px solid #ccc',
                  width: '100%',
                  marginTop: '5px',
                }}
              />
            </div>
          )}

          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#3A2D7D',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
            }}
            onClick={() => setRole('questionBankTable')}
          >
            Save
          </button>
        </div>

        <div className="rightSection">
          <h3 style={{ marginBottom: '10px', fontSize: 16, fontWeight: '700' }}>Previously Created Questions</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px', fontSize: 14, fontWeight: '600' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '8px', fontSize: 14, fontWeight: '600' }}>Edit</th>
                <th style={{ padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px', fontSize: 12 }}>Sample Theory</td>
                <td style={{ padding: '8px', fontSize: 12 }}>✏️</td>
                <td style={{ display: 'flex', justifyContent: 'center' }}>🗑️</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestionBank;
