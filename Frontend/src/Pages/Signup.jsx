import React, { useState } from "react";
import "./Sign.css";
import { Link, useNavigate } from "react-router-dom";
import { handleError,Success } from "../utils";
import { ToastContainer } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [submitting, setSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, email, password };

    if (!name || !email || !password) {
      return handleError("Name, Email, and Password are required.");
    }

    try {
      setSubmitting(true);
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      const {sucesss,message} = result;
      if(sucesss){
        Success(message);
        setTimeout(()=>{
          navigate("/login")
        }, 1000)
      }else if(message){
        const servererror = result?.message?.details?.[0]?.message || "Signup failed";
        handleError(servererror);

      }
      console.log("Signup result:", result);
      
    } catch (error) {
      handleError(error.message || "Something went wrong");
    }
    finally{
      setSubmitting(false);
    }
  };

  return (
    <div className="main-container">
      <div className="sub-container">
        <h2 className="signup-form">Signup-Form</h2>
        <div>
          <form className="form-container" onSubmit={handleSubmit}>
            <label htmlFor="name" className="name-label">
              Enter your Name
            </label>
            <input
              className="name-input"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="Email" className="email-label">
              Enter your email
            </label>
            <input
              className="email-input"
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="password" className="password-label">
              Enter your Password
            </label>
            <input
              className="pass-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button className="btn" type="submit">
              {submitting ? "submitting" : "Signup"}
            </button>
            <ToastContainer/>
            <p>
              Already have account?{" "}
              <span className="dispath">
                <Link to="/login" style={{ color: "white" }}>
                  Login
                </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
