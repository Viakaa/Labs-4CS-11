import React, { useState } from 'react';
import './languagequizz.css';
import AccountPopup from './account.popup'; 


import accountIcon from './images/account.png';
import language from './images/language.png'


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
      const userConfirmed = window.confirm('Are you sure you want to end the quizz and go to the home page?');
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
          <img src={language} alt="Language" className="header-language-icon" />
          <span className="languagequizz-text">LanguageQuizz</span>
        </div>
        <div className="account">
          <img src={accountIcon} alt="Account" onClick={handleAccountClick}/>
        </div>
        </div>
        <div className="languguage-quizz">
          <div className="language-box">
            {questions[currentQuestion] && (
              <div className="question-text">
                
                <p>Question {currentQuestion + 1}/10 </p>
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