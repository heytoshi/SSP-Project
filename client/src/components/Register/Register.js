import React, { useRef, useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const registerData = { username, password };

    try {
      const response = await axios.post(
        "http://localhost:4000/user/signup",
        registerData
      );
      if (response.data.success) navigate("/");
    } catch (error) {
      if (!error.response.data.success) setErrorMessage(error.response.data.data);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign up</h2>
      <form id="signup-form" onSubmit={handleSubmit}>
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
        <input className="submit-button" type="submit" value="Sign up" />
      </form>
      {errorMessage && (
        <div id="error-message" className="error-message">
          {errorMessage}
        </div>
      )}
      <p>
        Already have an account?
        <Link to="/" className="auth-link">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
