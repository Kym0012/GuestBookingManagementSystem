// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Booking Options</h2>
        <div className="button-rows">
          <div className="button-row">
            <button className="dashboard-button" onClick={() => handleNavigation('/book-in')}>Book In</button>
          </div>
          <div className="button-row">
            <button className="dashboard-button" onClick={() => handleNavigation('/book-out')}>Book Out</button>
          </div>
          <div className="button-row">
            <button className="dashboard-button" onClick={() => handleNavigation('/history')}>Booking History</button>
          </div>
          <div className="button-row">
            <button className="dashboard-button" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
