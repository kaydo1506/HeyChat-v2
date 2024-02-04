import React, { useState, useEffect } from 'react';
import { useChat } from '../utilities/context/ChatContext';
import { useNavigate } from 'react-router-dom';

const EntryForm = () => {
  const { handleUsernameSubmit, username } = useChat();
  const [localUsername, setLocalUsername] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If a username is already set, redirect to /chat
    if (username) {
      navigate('/chat');
    }
  }, [username, navigate]);

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

  return (
    <div className='flex items-center justify-center h-screen bg-gray-900 text-white'>
      <form
        onSubmit={handleSubmit}
        className='border border-blue-600 shadow-md rounded px-8 pt-6 pb-8 mb-4'
      >
        <div className='mb-4'>
          <label
            className='block text-white text-sm font-bold mb-2'
            htmlFor='username'
          >
            Username
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='username'
            type='text'
            placeholder='Enter your username'
            value={localUsername}
            onChange={(e) => {
              setLocalUsername(e.target.value);
              setFormError('');
            }}
          />
          {formError && (
            <span
              className='block bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-1'
              role='alert'
            >
              {formError}
            </span>
          )}{' '}
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
