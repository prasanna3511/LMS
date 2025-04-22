import React from "react";
import Logo from "../../src/images/main.jpeg";
import Main from "../../src/images/logo.jpeg";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();
  const handleContact = () => {
    navigate("/dashboard");
  }

  return (
    <>
      <div className="header">
        <div className="header-left">
          <div className="heading-container"></div>
          <h3 className="heading">Welcome to</h3>
          <img className="heading-logo" src={Logo} alt="" />
        </div>
        <button onClick={handleContact} className="contact-btn">Contact Us</button>
      </div>

      <div className="login-dashboard">
        <div className="form">
          <div className="emmail-wrapper">
            <label htmlFor="name" className="nameLabel">
              Email
            </label>
            <br />
            <input
              required
              type="text"
              name="name"
              className="Inputname"
              placeholder="Enter your email id"
            />
          </div>
          <div className="password-wrapper1">
            <label htmlFor="email" className="nameLabel">
              Passsword
            </label>
            <br />
            <input
              style={{padding: "5px"}}
              required
              type="text"
              name="email"
              className="Inputname"
              placeholder="Enter your password"
            />
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
            <button onclick={()=>navigate("/dashboard")} className="login-btn">Login</button>
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
