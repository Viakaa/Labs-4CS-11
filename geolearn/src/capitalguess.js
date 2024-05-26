import React, { useState, useEffect } from 'react';
import './capitalguess.css';
import AccountPopup from './account.popup'; 

import capital from './images/capital.png';
import accountIcon from './images/account.png';

function CapitalGuess() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [questionData, setQuestionData] = useState({ question: '', options: [], response: '' });
    const [isPopupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        fetchQuestion();
    }, []);

    const fetchQuestion = async () => {
        try {
            const response = await fetch('/quiz/question?quizType=capital');
            const data = await response.json();
            setQuestionData(data);
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    const handleVariantSelect = (variant) => {
        setSelectedVariant(variant);

        if (currentQuestion < 9) {
            setCurrentQuestion(currentQuestion + 1);
            fetchQuestion();
        }
    };

    const handleGeolearnClick = () => {
        const userConfirmed = window.confirm('Are you sure you want to end the guess and go to the home page?');
        if (userConfirmed) {
            window.location.href = '/home';
        }
    };

    const handleAccountClick = () => {
        setPopupVisible(!isPopupVisible);
    };

    return (
        <div className="App">
            <div className="header">
                <div className="geolearn" onClick={handleGeolearnClick}>Geolearn</div>
                <div className="capitalguess">
                    <img src={capital} alt="Capital" className="header-capital-icon" />
                    <span className="capitalguess-text">Cpital Guess</span>
                </div>
                <div className="account" onClick={handleAccountClick}>
                    <img src={accountIcon} alt="Account" />
                </div>
            </div>

            <div className="capital-guess">
                <div className="capital-box">
                    <div className="question-text">
                        <p>Question {currentQuestion + 1}/10</p>
                        <p>{questionData.question}</p>
                    </div>
                </div>

                <div className="variants">
                {questionData.options && questionData.options.map((variant, index) => (
                    <div
                    key={index}
                    className={`variant ${selectedVariant === variant ? 'selected' : ''}`}
                    onClick={() => handleVariantSelect(variant)}
                    >
                    {variant}
                    </div>
                ))}
                {isPopupVisible && <AccountPopup onClose={() => setPopupVisible(false)} />}
                </div>
            </div>
        </div>
    );
}

export default CapitalGuess;
