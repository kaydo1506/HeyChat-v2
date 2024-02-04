import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatContainer from './containers/ChatContainer';
import ChartContainer from './containers/ChartContainer';
import EntryForm from './components/EntryForm';
import { ChatProvider } from './utilities/context/ChatContext';

function App() {
  return (
    <ChatProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EntryForm />} />
          <Route path='/chat' element={<ChatContainer />} />
          <Route path='/home' element={<ChartContainer />} />
        </Routes>
      </BrowserRouter>
    </ChatProvider>
  );
}

export default App;


