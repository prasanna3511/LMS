import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';

const QuestionBankTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const questions = [
    {
      question: 'What is 2 + 2?',
      answer: '4',
      createdBy: 'Admin',
      date: '2024-04-20'
    },
    {
      question: 'What is the capital of France?',
      answer: 'Paris',
      createdBy: 'Admin',
      date: '2024-04-20'
    }
  ];

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{width:'100%'}} >
    <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
    <input
        type="text"
        placeholder="Search questions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: '20%',
          padding: '10px',
          borderRadius: '17px',
          border: '1px solid #ccc',
          marginBottom: '20px',
          fontSize: '14px'
        }}
      />
   
<Navbar/>
</div>
    <div style={{ paddingTop: '30px', fontFamily: 'Arial, sans-serif' }}>
       {/* Search Bar */}
      
      <div style={{ display: 'flex', alignItems: 'center',  justifyContent: 'space-between' }}>
        <h2 style={{ color: '#F75F00' }}>Question Bank</h2>
        <div>
          <select style={{ marginRight: '10px', padding: '8px', fontSize: '14px', borderRadius: 15 ,backgroundColor:'white'}}>
            <option>Select Subject</option>
            <option>Math</option>
            <option>Science</option>
          </select>
          <select style={{ padding: '8px', fontSize: '14px', borderRadius: 15,backgroundColor:'white' }}>
            <option>Std</option>
            <option>Class 1</option>
            <option>Class 2</option>
          </select>
        </div>
      </div>

     

      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#f8f8f8', borderRadius: '8px', overflow: 'hidden' }}>
        <thead style={{ backgroundColor: '#e6e6e6', textAlign: 'left' }}>
          <tr>
            <th style={{ padding: '12px' }}>Select</th>
            <th style={{ padding: '12px' }}>Question</th>
            <th style={{ padding: '12px' }}>Correct Answer</th>
            <th style={{ padding: '12px' }}>Created by</th>
            <th style={{ padding: '12px' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q, index) => (
            <tr key={index}>
              <td style={{ padding: '12px' }}><input type="checkbox" /></td>
              <td style={{ padding: '12px' }}>{q.question}</td>
              <td style={{ padding: '12px' }}>{q.answer}</td>
              <td style={{ padding: '12px' }}>{q.createdBy}</td>
              <td style={{ padding: '12px' }}>{q.date}</td>
            </tr>
          ))}
          {filteredQuestions.length === 0 && (
            <tr>
              <td colSpan="5" style={{ padding: '12px', textAlign: 'center', color: 'gray' }}>No questions found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button style={{ padding: '12px 24px', backgroundColor: '#3A2D7D', color: '#fff', fontSize: '16px', border: 'none', borderRadius: '6px' }}>
          Create Test
        </button>
      </div>
    </div>
    </div>
  );
};

export default QuestionBankTable;
