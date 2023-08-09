import React, { useRef, useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const loginData = { username, password };
    try {
      const response = await axios.post(
        "http://localhost:4000/user/signin",
        loginData
      );
      if (response.data.success) {
        sessionStorage.setItem("username", response.data.data.username);
        sessionStorage.setItem("token", response.data.data.token);
        navigate("/home");
      }
    } catch (error) {
      if(!error.response.data.success) setErrorMessage("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign in</h2>
      <form id="signin-form" onSubmit={handleSubmit}>
        <input
          ref={usernameRef}
          id="username"
          className="input-auth"
          type="text"
          name="username"
          placeholder="Username"
          required
        />
        <input
          ref={passwordRef}
          id="password"
          className="input-auth"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input className="submit-button" type="submit" value="Sign in" />
      </form>
      {errorMessage && (
        <div id="error-message" className="error-message">
          {errorMessage}
        </div>
      )}
      <p>
        Don't have an account?
        <Link to="/signup" className="auth-link">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
