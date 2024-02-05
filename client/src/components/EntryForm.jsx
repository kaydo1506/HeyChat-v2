import React, { useState, useEffect } from 'react';
import { useChat } from '../utilities/context/ChatContext';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

const EntryForm = () => {
  const { handleUsernameSubmit, username } = useChat();
  const [localUsername, setLocalUsername] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();
  const { isConnected } = useChat();

  useEffect(() => {
    // If a username is already set and the connection is established, redirect to /chat
    console.log(isConnected);
    if (username && isConnected === true) {
      navigate('/chat');
    }
  }, [username, navigate, isConnected]);

  const validateUsername = (username) => {
    if (username.length < 2) {
      return 'Username must be at least 2 characters long.';
    }
    if (!/^[A-Za-z].*/.test(username)) {
      return 'Username must start with a letter.';
    }

    return ''; // No error
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateUsername(localUsername);
    if (error) {
      setFormError(error);
      return; // Prevent form submission if there's an error
    }

    handleUsernameSubmit(localUsername);
    // Navigation to /chat will be handled by the useEffect hook once the username is set
  };

  const noErrorClass =
    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
  const errorClass =
    'shadow appearance-none border-2 border-rose-500  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

  return (
    <div className='flex items-center justify-center h-screen bg-gray-900 text-white '>
      {isConnected === false && (
        <ErrorMessage message='The socket connection has closed, please refresh!' />
      )}
      <form
        onSubmit={handleSubmit}
        className='border border-blue-600 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80'
      >
        <div className='mb-4'>
          <label
            className='block text-white text-sm font-bold mb-2'
            htmlFor='username'
          >
            Username
          </label>
          <input
            className={`${formError ? errorClass : noErrorClass}`}
            id='username'
            type='text'
            placeholder='Enter your username'
            value={localUsername}
            onChange={(e) => {
              setLocalUsername(e.target.value);
              setFormError('');
            }}
          />
          <span
            className='block text-xs text-red-700   relative mt-1'
            role='alert'
          >
            {formError && formError}
          </span>

          {/* Render error message if any */}
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Join Chat
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;
