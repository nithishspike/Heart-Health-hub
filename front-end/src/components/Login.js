import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Login_page.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:5000/check_user";
    const jsonData = JSON.stringify(formData);
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: jsonData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        if (response.exists) {
          navigate('/heart', { state: { username: formData.username } });
        } else {
          setErrorMessage('User does not exist or incorrect password');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="login-body">
      <div className="login-header">
        <a className="login-logo">Heart Med</a>
      </div>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errorMessage && <h2 style={{ fontSize: '20px', textAlign: 'left', color: 'red' }}>{errorMessage}</h2>}
          <button className="login-button" type="submit" onClick={handleSubmit}>Login</button>
        </form>
        <h3>
          Not a member?{' '}
          <a style={{ color: 'white', textDecoration: 'none' }} href="/Signup">
            Signup
          </a>
        </h3>
      </div>
    </div>
  );
};

export default LoginPage;
