import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatContainer from './containers/ChatContainer';
import ChartContainer from './containers/ChartContainer';
import EntryForm from './components/EntryForm';
import ErrorMessage from './components/ErrorMessage';
import { Navigate } from 'react-router-dom';
import { Message } from './utilities/types';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  console.log(messages);

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

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onopen = () => {
      console.log('Connected to the WebSocket server');
    };

    ws.current.onmessage = (event) => {
      // Message is received in Blob data so use a file reader to read result as string
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const message = JSON.parse(reader.result as string);
            setMessages((prevMessages) => {
              // Check if the message is already in the array by looking for its unique id
              const isDuplicate = prevMessages.some(
                (msg) => msg.id === message.id
              );

              if (!isDuplicate) {
                // If it's not a duplicate, add it to the messages array
                return [...prevMessages, message];
              } else {
                // If it's a duplicate, just return the existing messages without adding it
                return prevMessages;
              }
            });
          } catch (error) {
            console.error('Error parsing message', error);
          }
        };
        reader.readAsText(event.data);
      }
    };

    ws.current.onclose = () => {
      console.log('Disconnected from the WebSocket server');
    };
  }, []);

  const handleUsernameSubmit = (enteredUsername: string) => {
    if (enteredUsername.trim().length > 1) {
      setUsername(enteredUsername);
      const joinMessage = {
        text: `${enteredUsername} has joined the chat.`,
        sender: 'System',
        time: formatTime(), // Add this line
        id: Date.now().toString(),
      };
      ws.current && ws.current.send(JSON.stringify(joinMessage));
      setError(null);
    } else {
      setError('Your username should be more than 1 character');
    }
  };

  const handleLeave = () => {
    const leaveMessage = {
      text: `${username} has left the chat.`,
      sender: 'System',
      time: formatTime(), // Add this line
      id: Date.now().toString(),
    };
    ws.current && ws.current.send(JSON.stringify(leaveMessage));
    setUsername(null);
  };

  const handleSendMessage = (newMessageText: string) => {
    const newMessage = {
      text: newMessageText,
      sender: username,
      time: formatTime(), // Add this line
      id: Date.now().toString(),
    };
    ws.current && ws.current.send(JSON.stringify(newMessage));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            !username ? (
              <div>
                {error && (
                  <ErrorMessage message={error} clearError={clearError} />
                )}
                <EntryForm onUsernameSubmit={handleUsernameSubmit} />
              </div>
            ) : (
              <Navigate to='/chat' />
            )
          }
        />
        <Route
          path='/chat'
          element={
            <ChatContainer
              handleLeave={handleLeave}
              messages={messages}
              username={username}
              handleSendMessage={handleSendMessage}
            />
          }
        />
        <Route path='/home' element={<ChartContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
