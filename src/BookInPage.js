import React, { useState, useEffect } from 'react';
import './BookInPage.css';

const BookInPage = ({ bookings, setBookings }) => {
  const [idNumber, setIdNumber] = useState('');
  const [name, setName] = useState('');
  const [officerServiceNumber, setOfficerServiceNumber] = useState('');
  const [rank, setRank] = useState('');
  const [hostPhoneNumber, setHostPhoneNumber] = useState('');
  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const codes = data.map((country) => ({
          name: country.name.common,
          code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ''),
        }));
        setCountryCodes(codes);
      })
      .catch((error) => {
        console.error('Error fetching country codes:', error);
      });
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!idNumber.match(/^\d{8}$/)) {
      newErrors.idNumber = 'ID Number must be exactly 8 digits.';
    }

    if (!name.match(/^[A-Za-z\s]+$/)) {
      newErrors.name = 'Name must contain only letters and spaces.';
    }

    if (!officerServiceNumber.match(/^[1-9]\d{4}$/)) {
      newErrors.officerServiceNumber = "Officer's Service Number must be exactly 5 digits and cannot start with 0.";
    }

    if (!rank) {
      newErrors.rank = 'Rank is required.';
    }

    if (!hostPhoneNumber.match(/^\d{9}$/)) {
      newErrors.hostPhoneNumber = 'Host\'s Phone Number must be exactly 9 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookIn = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const bookingData = {
      idNumber,
      name,
      officerServiceNumber,
      rank,
      hostPhoneNumber: `+${selectedCountryCode} ${hostPhoneNumber}`,
      bookingTime: new Date().toLocaleTimeString(),
      bookingDate: new Date().toLocaleDateString(),
    };
    setBookings([...bookings, bookingData]);
    setIsBooked(true);
    // Reset form fields after booking
    setIdNumber('');
    setName('');
    setOfficerServiceNumber('');
    setRank('');
    setHostPhoneNumber('');
    setSelectedCountryCode('');
  };

  return (
    <div className="book-in-container">
      <h3>Book In Form</h3>
      {!isBooked ? (
        <form className="book-in-form" onSubmit={handleBookIn}>
          <label>
            ID Number:
            <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} maxLength={8} required />
            {errors.idNumber && <span className="error">{errors.idNumber}</span>}
          </label>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value.replace(/[^A-Za-z\s]/gi, ''))} required />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>
          <label>
            Officer's Service Number:
            <input type="text" value={officerServiceNumber} onChange={(e) => setOfficerServiceNumber(e.target.value)} maxLength={5} required />
            {errors.officerServiceNumber && <span className="error">{errors.officerServiceNumber}</span>}
          </label>
          <label>
            Rank:
            <input type="text" value={rank} onChange={(e) => setRank(e.target.value)} required />
            {errors.rank && <span className="error">{errors.rank}</span>}
          </label>
          <label>
            Country Code:
            <select value={selectedCountryCode} onChange={(e) => setSelectedCountryCode(e.target.value)} required>
              <option value="">Select Country Code</option>
              {countryCodes.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.name} (+{country.code})
                </option>
              ))}
            </select>
          </label>
          <label>
            Host's Phone Number:
            <input type="text" value={hostPhoneNumber} onChange={(e) => setHostPhoneNumber(e.target.value)} maxLength={9} required />
            {errors.hostPhoneNumber && <span className="error">{errors.hostPhoneNumber}</span>}
          </label>
          <label>
            Booking Time:
            <input type="text" value={new Date().toLocaleTimeString()} readOnly />
          </label>
          <label>
            Booking Date:
            <input type="text" value={new Date().toLocaleDateString()} readOnly />
          </label>
          <button type="submit">Book In</button>
        </form>
      ) : (
        <p className="booked-message">Booked Successfully!</p>
      )}
    </div>
  );
};

export default BookInPage;
          
