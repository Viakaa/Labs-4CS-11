import React, { useState } from 'react';
import './flagrace.css';
import flag from './images/flag.png';
import accountIcon from './images/account.png';
import AccountPopup from './account.popup'; 

const flags = [

];

const questions = [

];

const variants = [
 
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0); 
  const [selectedVariant, setSelectedVariant] = useState(null);

  const handleVariantSelect = (variantId) => {
    setSelectedVariant(variantId);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleGeolearnClick = () => {
    const userConfirmed = window.confirm('Are you sure you want to end the race and go to the home page?');
    if (userConfirmed) {
      window.location.href = '/home'; 
    }
  };
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleAccountClick = () => {
    setPopupVisible(!isPopupVisible);
  };


  return (
    <div className="App">
      <div className="header">
        <div className="geolearn" onClick={handleGeolearnClick}>Geolearn</div>
        <div className="flagrace">
          <img src={flag} alt="Flag" className="header-flag-icon" />
          <span className="flagrace-text">FlagRace</span>
        </div>
        <div className="account">
          <img src={accountIcon} alt="Account" onClick={handleAccountClick} />
        </div>
      </div>
     
      <div className="flag-race">
        <div className="flag-box">
          {questions[currentQuestion] && (
            <div className="question-text">
              <p>Question {currentQuestion + 1}/10 </p>
              {flags[currentQuestion] && (
                <img src={flags[currentQuestion].image} alt="Flag" className="flag-image" style={{ width: 128, height: 128 }} />
              )}
              <p>{questions[currentQuestion].text}</p>
            </div>
          )}
        </div>

        <div className="variants">
          {variants.map((variant) => (
            <div
              key={variant.id}
              className={`variant ${selectedVariant === variant.id ? 'selected' : ''}`}
              onClick={() => handleVariantSelect(variant.id)}
            >
              {variant.text}
            </div>
          ))}
           {isPopupVisible && <AccountPopup onClose={() => setPopupVisible(false)} />}
        </div>
      </div>
    </div>
  );
}

export default App;
