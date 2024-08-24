import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const BookOutPage = ({ bookings, setBookings }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSearch = () => {
    const results = bookings.filter(
      (booking) =>
        booking.idNumber.includes(searchQuery) ||
        booking.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleBookOut = (idNumber) => {
    const bookOutTime = new Date().toLocaleTimeString();
    const updatedBookings = bookings.map((booking) =>
      booking.idNumber === idNumber ? { ...booking, bookedOut: true, bookOutTime } : booking
    );
    setBookings(updatedBookings);
    setSearchResults(searchResults.filter((booking) => booking.idNumber !== idNumber));
    setSuccessMessage('Booked out successfully!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000); // Clear success message after 3 seconds
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundImage: 'url(/path/to/your/background/image.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: '#fff', // Ensure text is readable on the background
      }}
    >
      <h3 style={{ textAlign: 'center', color: '#fff' }}>Book Out Page</h3>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by ID Number or Name"
          style={{
            padding: '10px',
            width: '300px',
            marginRight: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <button
          className="search-button"
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          <FaSearch />
        </button>
      </div>
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
      <ol style={{ padding: '0 20px' }}>
        {(searchQuery ? searchResults : bookings).map(
          (booking, index) =>
            !booking.bookedOut && (
              <li
                key={index}
                style={{
                  marginBottom: '20px',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for readability
                }}
              >
                <div>
                  <p>ID Number: {booking.idNumber}</p>
                  <p>Name: {booking.name}</p>
                  <p>Officer's Service Number: {booking.officerServiceNumber}</p>
                  <p>Rank: {booking.rank}</p>
                  <p>Booking Time: {booking.bookingTime}</p>
                  <button
                    onClick={() => handleBookOut(booking.idNumber)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: '#28a745',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    Book Out
                  </button>
                </div>
              </li>
            )
        )}
      </ol>
    </div>
  );
};

export default BookOutPage;
