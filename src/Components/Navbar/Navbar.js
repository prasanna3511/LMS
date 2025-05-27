import React, { useEffect, useState } from 'react'
import apiRequest from '../../utils/apiRequest';

export default function Navbar() {
  const [getUser , setGetUser] = useState([])
  const userData = JSON.parse(localStorage.getItem('userData'))
  useEffect(()=>{
    const fetchSchoolData = async()=>{
      try {
        const result = await apiRequest({
          endpoint: "users/getallusers.php",
          method: "POST",
          data: {id:userData.id},
        });
    
        if (result.status === "success") {
          setGetUser(result.data);
          console.log("result in navbar : ",result.data)

        } else {
          alert(result.message || "Session creation failed");
        }
      } catch (err) {
        alert(err.message || "Something went wrong");
      }
    }
    fetchSchoolData()
      },[])
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
          <strong>{getUser[0]?.username}</strong><br />
          <span style={{ fontSize: '12px', color: '#888' }}>{getUser[0]?.role}</span>
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
