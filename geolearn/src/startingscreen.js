import React from 'react';
import { useNavigate } from 'react-router-dom';
import './startingscreen.css';
import backgroundImage from './images/background.jpg'; 

const StartingScreen = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/welcome');
  };

  return (
    <div className="starting-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay">
        <div className="title-container">
          <h1 className="titlestart">
            <span className="geo">Geo</span>
            <span className="learnstart">Learn</span>
          </h1>
        </div>
        <div className="get-started-container">
          <button className="get-started" onClick={handleGetStarted}>Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default StartingScreen;
