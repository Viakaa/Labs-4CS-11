import React from 'react';
import './account.popup.css';

function AccountPopup({ onClose }) {
  const handleLogout = () => {
    
    window.location.href = '/'; 
  };

  return (
    <div className="account-popup">
      <div className="account-details">
        <p>Pookie</p>
        <p>Level: 5</p>
        <div className="exp-bar">
          <div className="exp-bar-fill" style={{ width: '20%' }}>2/10</div>
        </div>
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default AccountPopup;
