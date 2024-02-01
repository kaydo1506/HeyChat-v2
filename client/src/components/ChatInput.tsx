import React, { useState } from 'react';
import { ChatInputProps } from '../utilities/types';
import { SendIcon } from '../utilities/icons';

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSend}>
      <div className='flex gap-2  p-2 m-2'>
        <input
          type='text'
          value={input}
          className=' flex-grow p-2 h-12 text-gray-800 focus:outline-none focus:shadow-outline shadow rounded'
          onChange={(e) => setInput(e.target.value)}
        />
        <div className='self-center'>
          <button type='submit'>
            <SendIcon />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
