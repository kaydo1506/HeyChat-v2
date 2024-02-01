import React from 'react';
import { MessagesProps } from '../utilities/types';

const Messages: React.FC<MessagesProps> = ({ messages, currentUser }) => {
  return (
    <div className='p-6'>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${
            message.sender === currentUser
              ? 'text-right'
              : message.sender === 'System'
              ? 'text-center'
              : 'text-left'
          } p-2`}
        >
          {message.sender === currentUser ? (
            <span className=' p-2 rounded-lg bg-blue-100 border border-blue-400 text-blue-700 '>
              {message.text}
            </span>
          ) : message.sender === 'System' ? (
            <span className='italic text-sm text-slate-500'>
              {message.text}
            </span>
          ) : (
            <div className='flex flex-col bg-blue-950 w-fit rounded-lg '>
              <span className='text-xs text-orange-800 px-2 pt-1'>
                {message.sender}{' '}
              </span>
              <span className='p-2 rounded-lg   text-white w-fit'>
                {message.text}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Messages;
