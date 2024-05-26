import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './homepage.css';
import AccountPopup from './account.popup'; 

function Home() {
  const navigate = useNavigate(); 
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleAccountClick = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">GeoLearn</div>
        <div className="account-icon" onClick={handleAccountClick}></div> 
      </header>
      <div className="content">
        <h2 className='contentText'>Choose the quiz that you are interested in</h2>
        <div className="quiz-options">
          <div className="quiz-box quiz-option-1" onClick={() => navigate('/flag-race')}>
            <span className="quiz-box-text">Flag Race</span>
          </div>
          <div className="quiz-box quiz-option-2" onClick={() => navigate('/capital-guess')}>
            <span className="quiz-box-text">Capital Guess</span>
          </div>
          <div className="quiz-box quiz-option-3" onClick={() => navigate('/language-quizz')}>
            <span className="quiz-box-text">Language Quiz</span>
          </div>
        </div>
      </div>
      {isPopupVisible && <AccountPopup onClose={() => setPopupVisible(false)} />}
    </div>
  );
}

export default Home;

