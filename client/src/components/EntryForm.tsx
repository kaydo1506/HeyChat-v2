import React, { useState } from 'react';

const EntryForm: React.FC<{ onUsernameSubmit: (username: string) => void }> = ({
  onUsernameSubmit,
}) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      onUsernameSubmit(username);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen  bg-gray-900 text-white'>
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
