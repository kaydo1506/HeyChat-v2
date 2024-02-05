import React from 'react';

const ErrorMessage = ({ message }) => {


  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500`}
      style={{ animation: 'fadeInOut 3s ease-in-out' }}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
