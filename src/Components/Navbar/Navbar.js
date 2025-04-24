import React from 'react'

export default function Navbar() {
  return (
    <div style={{
        // position: 'absolute',
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
        }}><img src={require('../../images/sampleimage.jpg')} style={{height: 40, width:40, borderRadius:20}} /></span>
        
        <div>
          <strong>Bhavin</strong><br />
          <span style={{ fontSize: '12px', color: '#888' }}>Admin</span>
        </div>
        <span style={{
          background: '#e2e4fb',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft:20
        }}>🔔</span>
      </div>
  )
}
