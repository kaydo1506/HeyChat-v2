import React, { useState } from 'react';
import Messages from '../components/Messages';
import ChatInput from '../components/ChatInput';
import EntryForm from '../components/EntryForm';
import ErrorMessage from '../components/ErrorMessage';
import { Message } from '../utilities/types';

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUsernameSubmit = (enteredUsername: string) => {
    if (enteredUsername.trim().length > 1) {
      setUsername(enteredUsername);
      setError(null);
    } else {
      setError('Your username should be more than 1 character');
    }
  };
  console.log(error);
  const handleSendMessage = (newMessageText: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: newMessageText,
      sender: username,
    };
    setMessages([...messages, newMessage]);
  };
  const clearError = () => setError(null);
  // If the user is not authenticated, show the entry form
  if (!username) {
    return (
      <div>
        {error && <ErrorMessage message={error} clearError={clearError} />}
        <EntryForm onUsernameSubmit={handleUsernameSubmit} />
      </div>
    );
  }



  // If the user is authenticated, show the chat room
  return (
    <div className='bg-gray-100'>
      <div className='w-4/5 mx-auto flex flex-col  h-screen bg-white shadow-md '>
        <div className='overflow-auto flex-grow border'>
          <Messages messages={messages} currentUser={username}/>
        </div>
        <div>
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
