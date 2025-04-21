import React from 'react';

const QuestionBankTable = () => {
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

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', justifyContent: 'space-between' }}>
        <h1 style={{ color: 'orange' }}>Question Bank</h1>
        <div>
          <select style={{ marginRight: '10px', padding: '8px', fontSize: '14px',borderRadius:20 }}>
            <option>Select Subject</option>
            <option>Math</option>
            <option>Science</option>
          </select>
          <select style={{ padding: '8px', fontSize: '14px' ,borderRadius:20}}>
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
          {questions.map((q, index) => (
            <tr key={index}>
              <td style={{ padding: '12px' }}><input type="checkbox" /></td>
              <td style={{ padding: '12px' }}>{q.question}</td>
              <td style={{ padding: '12px' }}>{q.answer}</td>
              <td style={{ padding: '12px' }}>{q.createdBy}</td>
              <td style={{ padding: '12px' }}>{q.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button style={{ padding: '12px 24px', backgroundColor: '#3A2D7D', color: '#fff', fontSize: '16px', border: 'none', borderRadius: '6px' }}>
          Create Test
        </button>
      </div>
    </div>
  );
};

export default QuestionBankTable;
