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
  // Check if the incoming message is a Blob
  if (event.data instanceof Blob) {
    // Create a FileReader to read the Blob
    const reader = new FileReader();

    // Define what happens once the Blob has been read
    reader.onload = () => {
      // The result attribute contains the contents of the Blob as text
      const message = JSON.parse(reader.result);

      // Now that we have the message as an object, you can use it as before
      console.log(message);
      setMessages((prevMessages) => {
        // Check if the message is already in the array by looking for its unique id
        const isDuplicate = prevMessages.some((msg) => msg.id === message.id);
        if (!isDuplicate) {
          // If it's not a duplicate, add it to the messages array
          return [...prevMessages, message];
        } else {
          // If it's a duplicate, just return the existing messages without adding it
          return prevMessages;
        }
      });
    };

    // Start reading the Blob as text
    reader.readAsText(event.data);
  } else {
    // Handle non-Blob data (assuming it's a JSON string)
    const message = JSON.parse(event.data);
    setMessages((prevMessages) => {
      const isDuplicate = prevMessages.some((msg) => msg.id === message.id);
      if (!isDuplicate) {
        return [...prevMessages, message];
      } else {
        return prevMessages;
      }
    });
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
