import React from "react";
import { useState } from "react";
import "./Login.css";
import { Link } from "react-router";
import { handleError, Success } from "../utils";
import { ToastContainer } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = { email, password };
  console.log(payload);

  if (!payload.email || !payload.password) {
    return handleError("Email and password are required.");
  }

  try {
    setSubmitting(true);
    const url = "http://localhost:8080/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log(result);

    if (response.ok && result.token) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("loggedIn", result.name);
      Success(result.message || "Login successful");
    } else {
      const serverError =
        result?.message?.details?.[0]?.message || result?.message || "Login failed";
      handleError(serverError);
    }
  } catch (error) {
    handleError(error.message || "Something went wrong");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="main-container-login">
      <div className="sub-container-login">
        <h2 className="signup-form">Login-Form</h2>
        <div>
          <form action="" className="form-container-login">
            <label htmlFor="Email" className="email-label">
              Enter your email
            </label>
            <input
              className="email-input"
              autoFocus
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
              autoFocus
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button
              className="btn"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Login..." : "Login"}
            </button>
            <p className="navigate">
              Dont't have account ?{" "}
              <span className="dispath">
                <Link to="/signup" style={{ color: "white" }}>
                  Signup
                  <ToastContainer />
                </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
