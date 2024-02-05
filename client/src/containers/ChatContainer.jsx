import React from 'react';
import Messages from '../components/Messages';
import ChatInput from '../components/ChatInput';
import { useChat } from '../utilities/context/ChatContext';
import { Visualisation } from '../utilities/icons';
import { Link } from 'react-router-dom';
import { Back } from '../utilities/icons';

const ChatContainer = () => {
  const { handleLeave, messages, username, handleSendMessage } = useChat();
  // If the user is authenticated, show the chat room
  return (
    <div className=' bg-gray-900 '>
      <div className='md:w-4/5 md:mx-auto flex flex-col  h-screen bg-gray-900 text-white shadow-md '>
        <div className='flex justify-between pt-16 md:pt-4 mx-4 md:mx-0'>
          <button onClick={handleLeave}>
            <Link to='/'>
              <Back />
            </Link>
          </button>
          <Link to='/home'>
            <Visualisation />
          </Link>
        </div>

        <div className='overflow-auto flex-grow  flex flex-col-reverse'>
          <Messages messages={messages} currentUser={username} />
        </div>
        <div>
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
