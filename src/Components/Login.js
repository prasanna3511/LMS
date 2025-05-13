import React, { useState } from "react";
import Logo from "../../src/images/main.jpeg";
import Main from "../../src/images/logo.jpeg";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import apiRequest from "../utils/apiRequest";

export default function Login() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  // const handleLogin = async () => {
  //   const validationErrors = {};

  //   if (!username.trim()) {
  //     validationErrors.username = "Username is required";
  //   }

  //   if (!password.trim()) {
  //     validationErrors.password = "Password is required";
  //   }

  //   setErrors(validationErrors);
  //   if (Object.keys(validationErrors).length === 0) {
  //     try {
  //       const response = await axios.post("https://shatrunjaygroup.com/lms/api/users/login.php", {
  //         username,
  //         password,
  //       });
  
  //       if (response.data.status === "success") {
  //         // Handle successful login, maybe save token or user info
  //         // localStorage.setItem('token', response.data.token); // Example
  //         navigate("/dashboard");
  //       } else {
  //         // API responded but with error (e.g., wrong credentials)
  //         alert(response.data.message || "Login failed. Please try again.");
  //       }
  //     } catch (error) {
  //       // Network error or server down
  //       console.error("Login error:", error);
  //       alert("An error occurred during login. Please try again later.");
  //     }
  //   }
  // };
  const handleLogin = async () => {
    const validationErrors = {};
    if (!username.trim()) validationErrors.username = "Username is required";
    if (!password.trim()) validationErrors.password = "Password is required";
  
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
  
    try {
      const result = await apiRequest({
        endpoint: "users/login.php",
        method: "POST",
        data: { username, password },
      });
  
      if (result.status === "success") {
        // store user data or token if needed
        navigate("/dashboard");
      } else {
        alert(result.message || "Login failed");
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };
  return (
    <>
      <div className="header">
        <div className="header-left">
          <div className="heading-container"></div>
          <h3 className="heading">Welcome to</h3>
          <img className="heading-logo" src={Logo} alt="" />
        </div>
      </div>

      <div className="login-dashboard">
        <div className="form">
          <div className="emmail-wrapper">
            <label htmlFor="name" className="nameLabel">
              User Name
            </label>
            <br />
            <input
              required
              style={{padding: "6px"}}

              type="text"
              name="name"
              className="Inputname"
              placeholder="Enter your email id"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
             {errors.username && <p style={{color:'red'}}>{errors.username}</p>}
          </div>
          <div className="password-wrapper1" style={{marginTop:20}}>
            <label htmlFor="email" className="nameLabel">
              Passsword
            </label>
            <br />
            <input
              style={{padding: "6px"}}
              required
              type="text"
              name="email"
              className="Inputname"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p style={{color:'red'}}>{errors.password}</p>}
          </div>
          <div className="forgot-pass">
            <div>
              <input type="checkbox" name="Remember Me" />
              <label for="remember" className="remember">
                {" "}
                Remember Me
              </label>
            </div>
            <p className="forgot">Forgot Password?</p>
          </div>
          <div className="btn-class">
            <button  onClick={handleLogin}  className="login-btn">Login</button>
          </div>
          <p className="below-text">
            <span className="text-black">Not Registered yet?</span>
            <span className="text-orange">Contact Shatrunjay Robotics Team</span>
          </p>
        </div>
        <div className="dashboard-right">
          <img className="right-img" src={Main} alt="" />
        </div>
      </div>
    </>
  );
}
