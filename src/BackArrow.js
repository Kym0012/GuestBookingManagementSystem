import React from 'react';

const BackArrow = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick}>&larr; Back</button>
    </div>
  );
};

export default BackArrow;
