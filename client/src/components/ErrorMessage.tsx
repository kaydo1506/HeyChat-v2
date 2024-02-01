import React, { useEffect, useState } from 'react';
import { ErrorMessageProps } from '../utilities/types';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, clearError }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Hide the error message after 3 seconds
    const timer = setTimeout(() => {
      setShow(false);
      clearError();
    }, 3000);

    return () => clearTimeout(timer);
  }, [clearError]);

  // Only render if 'show' is true
  if (!show) return null;

  return (
    <div
      className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
      role='alert'
    >
      <span className='block'>{message}</span>
    </div>
  );
};

export default ErrorMessage;
