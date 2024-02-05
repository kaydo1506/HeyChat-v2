import React, { createContext, useContext, useState } from 'react';
import useWebSocket from '../hooks/useWebSocket';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const wsURL =
    process.env.NODE_ENV === 'development'
      ? 'ws://localhost:8080'
      : 'wss://https://heychat-v2.onrender.com/';
  const { messages, isConnected, sendMessage } = useWebSocket(wsURL);

  const clearError = () => setError(null);

  const formatTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? hours : 12; // The hour '0' should be '12'

    return (
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ' ' +
      ampm
    );
  };

  const processDataForLineChart = (messages) => {
    // Assume all messages are within a single hour for simplicity
    const countsPerMinute = Array(60).fill(0); // One slot for each minute

    messages.forEach((message) => {
      const time = message.time; // "07:36 PM"
      const minute = parseInt(time.split(':')[1].split(' ')[0], 10); // Extract minute
      countsPerMinute[minute]++;
    });

    return countsPerMinute;
  };

  const processDataForScatterChart = (messages) => {
    return messages.map((message, index) => ({
      x: index, 
      y: message.text.length, 
    }));
  };

  const handleUsernameSubmit = (enteredUsername) => {
    if (enteredUsername.trim().length > 1) {
      setUsername(enteredUsername);
      const joinMessage = {
        text: `${enteredUsername} has joined the chat.`,
        sender: 'System',
        time: formatTime(),
        id: Date.now().toString(),
      };
      sendMessage(joinMessage);
      setError(null);
    } else {
      setError('Your username should be more than 1 character');
    }
  };

  const handleLeave = () => {
    const leaveMessage = {
      text: `${username} has left the chat.`,
      sender: 'System',
      time: formatTime(),
      id: Date.now().toString(),
    };
    sendMessage(leaveMessage);
    setUsername(null);
  };

  const handleSendMessage = (newMessageText) => {
    const newMessage = {
      text: newMessageText,
      sender: username,
      time: formatTime(),
      id: Date.now().toString(),
    };
    sendMessage(newMessage);
  };
  return (
    <ChatContext.Provider
      value={{
        username,
        setUsername,
        error,
        setError,
        clearError,
        messages,
        sendMessage,
        formatTime,
        isConnected,
        processDataForLineChart,
        processDataForScatterChart,
        handleUsernameSubmit,
        handleLeave,
        handleSendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
