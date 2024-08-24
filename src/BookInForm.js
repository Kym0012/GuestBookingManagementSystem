import React, { useState } from 'react';

const BookInForm = ({ onBookIn }) => {
  const [idNumber, setIdNumber] = useState('');
  const [name, setName] = useState('');
  const [officerServiceNumber, setOfficerServiceNumber] = useState('');
  const [rank, setRank] = useState('');
  const [hostPhoneNumber, setHostPhoneNumber] = useState('');
  const [bookingTime] = useState(new Date().toLocaleTimeString());
  const [bookingDate] = useState(new Date().toLocaleDateString());
  const [isBooked, setIsBooked] = useState(false);

  const handleBookIn = (e) => {
    e.preventDefault();
    const bookingData = {
      idNumber,
      name,
      officerServiceNumber,
      rank,
      hostPhoneNumber,
      bookingTime,
      bookingDate
    };
    onBookIn(bookingData);
    setIsBooked(true);
  };

  return (
    <div>
      <h3>Book In Form</h3>
      {!isBooked ? (
        <form onSubmit={handleBookIn}>
          <label>
            ID Number:
            <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} required />
          </label>
          <br />
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <br />
          <label>
            Officer's Service Number:
            <input type="text" value={officerServiceNumber} onChange={(e) => setOfficerServiceNumber(e.target.value)} required />
          </label>
          <br />
          <label>
            Rank:
            <input type="text" value={rank} onChange={(e) => setRank(e.target.value)} required />
          </label>
          <br />
          <label>
            Host's Phone Number:
            <input type="text" value={hostPhoneNumber} onChange={(e) => setHostPhoneNumber(e.target.value)} required />
          </label>
          <br />
          <label>
            Booking Time:
            <input type="text" value={bookingTime} readOnly />
          </label>
          <br />
          <label>
            Booking Date:
            <input type="text" value={bookingDate} readOnly />
          </label>
          <br />
          <button type="submit">Book In</button>
        </form>
      ) : (
        <p>Booked Successfully!</p>
      )}
    </div>
  );
};

export default BookInForm;
