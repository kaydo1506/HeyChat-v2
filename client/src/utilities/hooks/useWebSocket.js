// useWebSocket.js
import { useEffect, useRef, useState } from 'react';

function useWebSocket(url) {
  const ws = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.current.onmessage = (event) => {
      // Message is received in Blob data so use a file reader to read result as string
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const message = JSON.parse(reader.result);
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
       console.log('WebSocket connection disconnected');
    }
    return () => {
      ws.current.close();
    };
  }, [url]);

  const sendMessage = (message) => {
    ws.current && ws.current.send(JSON.stringify(message));
  };

  return { messages, sendMessage };
}

export default useWebSocket;
