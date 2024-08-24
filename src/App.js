// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import BookInPage from './BookInPage';
import BookOutPage from './BookOutPage';
import HistoryPage from './HistoryPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [bookings, setBookings] = useState([]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setBookings([]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={loggedIn ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/dashboard" element={loggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/book-in" element={loggedIn ? <BookInPage bookings={bookings} setBookings={setBookings} /> : <Navigate to="/" />} />
        <Route path="/book-out" element={loggedIn ? <BookOutPage bookings={bookings} setBookings={setBookings} /> : <Navigate to="/" />} />
        <Route path="/history" element={loggedIn ? <HistoryPage bookings={bookings} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
