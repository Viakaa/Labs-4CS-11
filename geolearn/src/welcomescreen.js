import React from 'react';
import './welcomescreen.css';

const WelcomeScreen = () => {

  return (
    <div className="welcome-screen">
      <div className="welcome-container">
        <h1><span className='text'>Welcome to </span><span className="geo">Geo</span><span className="learn">Learn</span></h1>
        <p className='text'>Lets start your learning journey!</p>
        <p className="sign-up"><a href="/signup" className="signup-link">Sign up</a></p>
        <p className="login-text">already have an account? <a href="/login" className="login-link">log in</a></p>
      </div>
    </div>
  );
}

export default WelcomeScreen;
