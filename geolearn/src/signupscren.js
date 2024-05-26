import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signupscreen.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');  

    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const message = await response.text();
        setError(`Error: ${message}`);
        console.error(`Error: ${response.status} ${response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log('User created:', data);
      navigate('/home');
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="signup-form">
        <div className="title">
          <span className="geo">Geo</span>
          <span className="learn">Learn</span>
        </div>
        <h2>Signup</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <div className="button-container">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
