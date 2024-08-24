import React from 'react';

const HistoryPage = ({ bookings }) => {
  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundImage: 'url(/path/to/your/background/image.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: '#fff',
      }}
    >
      <h3 style={{ textAlign: 'center', color: '#fff', marginBottom: '20px' }}>Booking History</h3>
      <ol style={{ padding: '0', listStyle: 'decimal' }}>
        {bookings.map((booking, index) => (
          <li
            key={index}
            style={{
              marginBottom: '20px',
              padding: '20px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
          >
            <p>ID Number: {booking.idNumber}</p>
            <p>Name: {booking.name}</p>
            <p>Officer's Service Number: {booking.officerServiceNumber}</p>
            <p>Rank: {booking.rank}</p>
            <p>Booking Time: {booking.bookingTime}</p>
            {booking.bookedOut && <p>Book Out Time: {booking.bookOutTime}</p>}
            <p>Booking Date: {booking.bookingDate}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default HistoryPage;
