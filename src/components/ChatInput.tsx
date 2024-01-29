import React, {useState} from 'react';
import { ChatInputProps } from '../utilities/types';
import { SendIcon } from '../utilities/icons';

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
 const [input, setInput] = useState('');

 const handleSend = () => {
   onSendMessage(input);
   setInput(''); // Clear the input field after sending
 };

  return (
    <div className='flex gap-2'>
      <input
        type='text'
        value={input}
        className='border border-stone-400 flex-grow h-10'
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSend}>
        <SendIcon />
      </button>
    </div>
  );
};

export default ChatInput;


