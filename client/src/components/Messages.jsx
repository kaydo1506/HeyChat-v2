import React from 'react';

const Messages = ({ messages, currentUser }) => {
  const renderMessageByType = (message) => {
    if (message.sender === currentUser) {
      return renderCurrentUserMessage(message);
    } else if (message.sender === 'System') {
      return renderSystemMessage(message);
    } else {
      return renderOtherUserMessage(message);
    }
  };

  const renderCurrentUserMessage = (message) => (
    <div className='flex'>
      <div className='ml-auto flex justify-end items-end p-2 rounded-lg bg-blue-100 border border-blue-400 text-blue-700 '>
        <span>{message.text}</span>
        <span className='italic text-xs text-slate-500 pl-2'>
          {message.time}
        </span>
      </div>
    </div>
  );

  const renderSystemMessage = (message) => (
    <span className='flex justify-center italic text-xs text-slate-500'>
      {message.text}
    </span>
  );

  const renderOtherUserMessage = (message) => (
    <div className='flex flex-col bg-blue-950 w-fit rounded-lg'>
      <span className='text-xs text-orange-800 px-2 pt-1'>
        {message.sender}{' '}
      </span>
      <div className='flex justify-between items-end p-2'>
        <span className='rounded-lg text-white w-fit'>{message.text}</span>
        <span className='italic text-xs text-slate-500 pl-2'>
          {message.time}
        </span>
      </div>
    </div>
  );

  return (
    <div className='p-6'>
      {messages.map((message) => (
        <div key={message.id} className='p-2'>
          {renderMessageByType(message)}
        </div>
      ))}
    </div>
  );
};

export default Messages;
