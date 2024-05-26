import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartingScreen from './startingscreen';
import WelcomeScreen from './welcomescreen';
import Signup from './signupscren';
import LogIn from './loginscreen';
import Home from './homePage';
import FlagRace from './flagrace'; 
import CapitalGuess from './capitalguess'; 
import LanguageQuiz from './languagequizz'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartingScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/flag-race" element={<FlagRace />} />
        <Route path="/capital-guess" element={<CapitalGuess />} /> 
        <Route path="/language-quizz" element={<LanguageQuiz />} /> 
      </Routes>
    </Router>
  );
}

export default App;

