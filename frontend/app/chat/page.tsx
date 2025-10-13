"use client";

import React, { useState, useEffect } from 'react';
import { socket } from '../../lib/socket';

interface Message {
  id: number;
  text: string;
  sender: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const message = { id: Date.now(), text: newMessage, sender: 'me' };
    socket.emit('sendMessage', message);
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
      <h1>Chat Interface</h1>
      <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px', overflowY: 'auto', marginBottom: '10px' }}>
        {messages.map((message: Message, index: number) => (
          <div key={index} style={{ textAlign: message.sender === 'me' ? 'right' : 'left', marginBottom: '10px' }}>
            <div style={{
              display: 'inline-block',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: message.sender === 'me' ? '#dcf8c6' : '#fff',
            }}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #ccc' }}
        />
        <button onClick={handleSendMessage} style={{ padding: '10px' }}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;