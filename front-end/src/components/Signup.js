import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:5000/signup";
    const jsonData = JSON.stringify(formData);
    console.log(jsonData)
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: jsonData,
      });
      const result = await response.json();
      if (result.exists) {
        setErrorMessage('Username already exists. Please choose a different one.');
      } else {

        navigate('/heart', { state: { username: formData.username } });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-body">
      <div className="login-header">
        <a className="login-logo">Heart Med</a>
      </div>
      <div className="login-container">
        <h2>Sign up</h2>
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
            type="text"
            name="email"
            placeholder="E-mail"
            value={formData.email}
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
          <button className="login-button" type="submit">Create account</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;