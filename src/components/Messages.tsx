import React from 'react'
import { MessagesProps } from '../utilities/types'


const Messages: React.FC<MessagesProps> = ({ messages, currentUser }) => {
  return (
    <div className='pt-16'>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${
            message.sender === currentUser ? 'text-right' : 'text-left'
          } p-2`}
        >
          <span>{currentUser}: {message.text}</span>
        </div>
      ))}
    </div>
  );
};

export default Messages